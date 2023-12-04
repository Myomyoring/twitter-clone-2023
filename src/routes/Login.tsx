import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Error, Form, Input, Switcher, Title, Wrapper } from '../components/Auth-Components';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import GithubButton from '../components/Github-Btn';
import Logo from '../components/common/Logo';

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
			<Title>
				<Logo />
			</Title>
			<Form onSubmit={onSubmit}>
				<Input onChange={onChange} name="email" value={email} placeholder="Email" type="email" required />
				<Input onChange={onChange} name="password" value={password} placeholder="Password" type="password" required />
				<Input type="submit" value={isLoading ? 'Loading' : 'Log In'} />
			</Form>
			{error !== '' ? <Error>{error}</Error> : null}
			<Switcher>
				계정이 없으세요? <Link to="/create-account">회원가입 &rarr;</Link>
			</Switcher>
			<GithubButton />
		</Wrapper>
	);
}
