import { GithubAuthProvider, signInWithPopup } from 'firebase/auth';
import styled from 'styled-components';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const Button = styled.span`
	margin-top: 12px;
	background-color: white;
	font-weight: 500;
	width: 100%;
	color: black;
	padding: 10px 20px;
	border-radius: 50px;
	border: 1px solid lightgray;
	display: flex;
	gap: 5px;
	align-items: center;
	justify-content: center;
	cursor: pointer;
`;

const Logo = styled.img`
	height: 25px;
`;

export default function GithubButton() {
	const navigate = useNavigate();
	const onClick = async () => {
		try {
			const provider = new GithubAuthProvider();
			await signInWithPopup(auth, provider);
			navigate('/');
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<Button onClick={onClick}>
			<Logo src="/github-logo.svg" />
			깃허브에서 가입하기
		</Button>
	);
}
