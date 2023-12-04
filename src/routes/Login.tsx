import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Buttons, Error, Form, Input, MainTitle, Switcher, Title, Wrapper } from '../components/Auth-Components';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import GithubButton from '../components/Github-Btn';
import OrLine from '../components/common/OrLine';
import GoogleButton from '../components/Google-Btn';

export default function Login() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { name, value },
		} = e;
		if (name === 'email') {
			setEmail(value);
		} else if (name === 'password') {
			setPassword(value);
		}
	};
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (isLoading || email === '' || password === '') return;
		try {
			setIsLoading(true);
			await signInWithEmailAndPassword(auth, email, password);
			navigate('/');
		} catch (err) {
			if (err instanceof FirebaseError) setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Wrapper>
			<MainTitle>지금 일어나고 있는 일</MainTitle>
			<Title>가입하기</Title>
			<Buttons>
				<GoogleButton />
				<GithubButton />
				<OrLine />
				<Form onSubmit={onSubmit}>
					<Input onChange={onChange} name="email" value={email} placeholder="이메일 주소" type="email" required />
					<Input onChange={onChange} name="password" value={password} placeholder="비밀번호" type="password" required />
					<Input type="submit" value={isLoading ? 'Loading' : '로그인'} />
				</Form>
				{error !== '' ? <Error>{error}</Error> : null}
				<Switcher>
					계정이 없으신가요? <Link to="/create-account"> 가입하기</Link>
				</Switcher>
			</Buttons>
		</Wrapper>
	);
}
