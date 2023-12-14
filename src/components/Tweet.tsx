import styled from 'styled-components';
import { ITweet } from './Timeline';
import { auth, db, storage } from '../firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { AttachFileButton, AttachFileInput, Form, Nav, SubmitBtn, TextArea } from './Tweet-Form-Components';
import { useState } from 'react';

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 3fr 1fr;
	padding: 16px;
	border-bottom: 0.6px solid lightgray;
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
	font-weight: 700;
	font-size: 13px;
`;

const Payload = styled.p`
	margin: 10px 0px;
	font-size: 14px;
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

const Title = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	gap: 3px;
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
			window.location.reload();
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
						<Title>
							<Username>{username}</Username>
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
						</Title>
						<Payload>{tweet}</Payload>
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
					<Nav>
						<AttachFileButton htmlFor="updateFile">
							{file ? (
								<>✅ 🖼</>
							) : (
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
									<path d="M16 13.25A1.75 1.75 0 0 1 14.25 15H1.75A1.75 1.75 0 0 1 0 13.25V2.75C0 1.784.784 1 1.75 1h12.5c.966 0 1.75.784 1.75 1.75ZM1.75 2.5a.25.25 0 0 0-.25.25v10.5c0 .138.112.25.25.25h.94l.03-.03 6.077-6.078a1.75 1.75 0 0 1 2.412-.06L14.5 10.31V2.75a.25.25 0 0 0-.25-.25Zm12.5 11a.25.25 0 0 0 .25-.25v-.917l-4.298-3.889a.25.25 0 0 0-.344.009L4.81 13.5ZM7 6a2 2 0 1 1-3.999.001A2 2 0 0 1 7 6ZM5.5 6a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0Z"></path>
								</svg>
							)}
						</AttachFileButton>
						<AttachFileInput onChange={onFileChange} type="file" id="updateFile" accept="image/*" />
						<SubmitBtn type="submit" value={isLoading ? '게시 중...' : '수정하기'} />
					</Nav>
				</Form>
			)}
		</>
	);
}
