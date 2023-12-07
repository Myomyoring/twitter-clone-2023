import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AttachFileButton, AttachFileInput, Form, SubmitBtn, TextArea } from './Tweet-Form-Components';

export default function PostTweetForm() {
	const [isLoading, setLoading] = useState(false);
	const [tweet, setTweet] = useState('');
	const [file, setFile] = useState<File | null>(null);
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTweet(e.target.value);
	};
	const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { files } = e.target;
		const maxSize = 1 * 1024 * 1024; // 1MB
		if (files && files.length === 1) {
			if (files[0].size > maxSize) {
				alert('이미지는 1MB 이하만 추가 가능합니다.');
				return;
			}
			setFile(files[0]);
		}
	};
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const user = auth.currentUser;
		if (!user || isLoading || tweet === '' || tweet.length > 180) return;
		try {
			setLoading(true);
			const doc = await addDoc(collection(db, 'tweets'), {
				tweet,
				createdAt: Date.now(),
				username: user.displayName || 'Anonymous',
				userId: user.uid,
			});
			if (file) {
				const locationRef = ref(storage, `tweets/${user.uid}/${doc.id}`);
				const result = await uploadBytes(locationRef, file);
				const url = await getDownloadURL(result.ref);
				await updateDoc(doc, {
					photo: url,
				});
			}
			setTweet('');
			setFile(null);
		} catch (e) {
			console.log(e);
		} finally {
			setLoading(false);
		}
	};
	return (
		<Form onSubmit={onSubmit}>
			<TextArea
				required
				rows={5}
				maxLength={180}
				onChange={onChange}
				value={tweet}
				placeholder="무슨 일이 일어나고 있나요?"
			/>
			<AttachFileButton htmlFor="file">{file ? '이미지 추가 완료 ✅' : '이미지 추가'}</AttachFileButton>
			<AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
			<SubmitBtn type="submit" value={isLoading ? '게시 중...' : '게시하기'} />
		</Form>
	);
}
