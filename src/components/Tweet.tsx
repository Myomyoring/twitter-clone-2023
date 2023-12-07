import styled from 'styled-components';
import { ITweet } from './TimeLine';
import { auth, db, storage } from '../firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AttachFileButton, AttachFileInput, Form, SubmitBtn, TextArea } from './Tweet-Form-Components';
import { useState } from 'react';

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 3fr 1fr;
	padding: 20px;
	border: 1px solid rgba(255, 255, 255, 0.5);
	border-radius: 15px;
`;

const Column = styled.div`
	&:last-child {
		place-self: end;
	}
	.btn {
		margin-right: 4px;
	}
`;

const Photo = styled.img`
	width: 100px;
	height: 100px;
	border-radius: 15px;
`;

const Username = styled.span`
	font-weight: 600;
	font-size: 15px;
`;

const Payload = styled.p`
	margin: 10px 0px;
	font-size: 18px;
`;

const DeleteButton = styled.button`
	background-color: tomato;
	color: white;
	font-weight: 600;
	border: 0;
	font-size: 12px;
	padding: 5px 10px;
	text-transform: uppercase;
	border-radius: 5px;
	cursor: pointer;
`;

const UpdateButton = styled.button`
	background-color: transparent;
	color: #8cc152;
	font-weight: 600;
	border: 1px solid #8cc152;
	font-size: 12px;
	padding: 5px 10px;
	text-transform: uppercase;
	border-radius: 5px;
	cursor: pointer;
`;

export default function Tweet({ username, photo, tweet, userId, id }: ITweet) {
	const user = auth.currentUser;
	const onDelete = async () => {
		const ok = confirm('게시글을 삭제할까요?');
		if (!ok || user?.uid !== userId) return;
		try {
			await deleteDoc(doc(db, 'tweets', id));
			if (photo) {
				const photoRef = ref(storage, `tweets/${user.uid}/${id}`);
				await deleteObject(photoRef);
			}
		} catch (e) {
			console.log(e);
		} finally {
			//
		}
	};
	// update
	const [updateMode, setUpdateMode] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [updateTweet, setUpdateTweet] = useState(tweet);
	const [file, setFile] = useState<File | null>(null);
	const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setUpdateTweet(e.target.value);
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

	const onUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const user = auth.currentUser;
		if (!user || isLoading || tweet === '' || tweet.length > 180) return;
		try {
			setLoading(true);
			const locationDoc = doc(db, 'tweets', id);
			await updateDoc(locationDoc, {
				tweet: updateTweet,
			});
			if (file) {
				const locationRef = ref(storage, `tweets/${user.uid}/${id}`);
				const result = await uploadBytes(locationRef, file);
				const url = await getDownloadURL(result.ref);
				await updateDoc(locationDoc, {
					photo: url,
				});
			}
			setUpdateTweet('');
			setFile(null);
			setUpdateMode(false);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};
	return (
		<>
			{!updateMode ? (
				<Wrapper>
					<Column>
						<Username>{username}</Username>
						<Payload>{tweet}</Payload>
						{user?.uid === userId ? (
							<UpdateButton className="btn" onClick={() => setUpdateMode(true)}>
								수정하기
							</UpdateButton>
						) : null}
						{user?.uid === userId ? (
							<DeleteButton className="btn" onClick={onDelete}>
								삭제하기
							</DeleteButton>
						) : null}
					</Column>
					<Column>{photo ? <Photo src={photo} /> : null}</Column>
				</Wrapper>
			) : (
				<Form onSubmit={onUpdate}>
					<TextArea
						required
						rows={5}
						maxLength={180}
						onChange={onChange}
						value={updateTweet}
						placeholder="무슨 일이 일어나고 있나요?"
					/>
					<AttachFileButton htmlFor="updateFile">{file ? '이미지 교체 완료 ✅' : '이미지 교체'}</AttachFileButton>
					<AttachFileInput onChange={onFileChange} type="file" id="updateFile" accept="image/*" />
					<SubmitBtn type="submit" value={isLoading ? '게시 중...' : '수정하기'} />
				</Form>
			)}
		</>
	);
}
