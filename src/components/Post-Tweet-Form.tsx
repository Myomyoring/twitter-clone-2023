import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AttachFileButton, AttachFileInput, Form, Nav, SubmitBtn, TextArea } from './Tweet-Form-Components';

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
			<Nav>
				<AttachFileButton htmlFor="file">
					{file ? (
						<>✅🖼</>
					) : (
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
							<path d="M16 13.25A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25V2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75ZM1.75 2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h.94l.03-.03 6.077-6.078a1.75 1.75 0 0 1 2.412-.06L14.5 10.31V2.75a.25.25 0 0 0-.25-.25Zm12.5 11a.25.25 0 0 0 .25-.25v-.917l-4.298-3.889a.25.25 0 0 0-.344.009L4.81 13.5ZM7 6a2 2 0 1 1-3.999.001A2 2 0 0 1 7 6ZM5.5 6a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0Z"></path>
						</svg>
					)}
				</AttachFileButton>
				<AttachFileInput onChange={onFileChange} type="file" id="file" accept="image/*" />
				<SubmitBtn type="submit" value={isLoading ? '게시 중...' : '게시하기'} />
			</Nav>
		</Form>
	);
}
