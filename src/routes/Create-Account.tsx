import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';
import { FirebaseError } from 'firebase/app';
import { Buttons, Error, Form, Input, MainTitle, Switcher, Title, Wrapper } from '../components/Auth-Components';
import GithubButton from '../components/Github-Btn';

export default function CreateAccount() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { name, value },
		} = e;
		if (name === 'name') {
			setName(value);
		} else if (name === 'email') {
			setEmail(value);
		} else if (name === 'password') {
			setPassword(value);
		}
	};
	const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError('');
		if (isLoading || name === '' || email === '' || password === '') return;
		try {
			setIsLoading(true);
			const credentials = await createUserWithEmailAndPassword(auth, email, password);
			console.log(credentials.user);
			await updateProfile(credentials.user, { displayName: name });
			navigate('/');
		} catch (err) {
			if (err instanceof FirebaseError) setError(err.message);
		} finally {
			setIsLoading(false);
		}
		console.log(name, email, password);
	};
	return (
		<Wrapper>
			<MainTitle>지금 일어나고 있는 일</MainTitle>
			<Title>계정을 생성하세요</Title>
			<Buttons>
				<Form onSubmit={onSubmit}>
					<Input onChange={onChange} name="name" value={name} placeholder="이름" type="text" required />
					<Input onChange={onChange} name="email" value={email} placeholder="이메일" type="email" required />
					<Input onChange={onChange} name="password" value={password} placeholder="비밀번호" type="password" required />
					<Input type="submit" value={isLoading ? 'Loading' : '가입하기'} />
				</Form>
				{error !== '' ? <Error>{error}</Error> : null}
				<Switcher>
					이미 계정이 있으신가요? <Link to="/login-index">로그인하러 가기</Link>
				</Switcher>
			</Buttons>
		</Wrapper>
	);
}
