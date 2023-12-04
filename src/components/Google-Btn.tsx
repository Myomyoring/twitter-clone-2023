import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import styled from 'styled-components';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Button = styled.span`
	margin-top: 12px;
	background-color: white;
	width: 100%;
	color: black;
	padding: 10px 20px;
	border-radius: 50px;
	border: 0;
	display: flex;
	gap: 5px;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;

const Logo = styled.img`
	height: 25px;
`;

export default function GoogleButton() {
	const navigate = useNavigate();
	const onClick = async () => {
		try {
			const provider = new GoogleAuthProvider();
			await signInWithPopup(auth, provider);
			navigate('/');
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<Button onClick={onClick}>
			<Logo src="/google-logo.svg" />
			Google 계정으로 가입하기
		</Button>
	);
}
