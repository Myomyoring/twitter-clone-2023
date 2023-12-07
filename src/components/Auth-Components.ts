import styled from 'styled-components';

export const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`;
export const HalfDiv = styled.div`
	width: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const Title = styled.h1`
	font-size: 27px;
	font-weight: 700;
`;
export const Form = styled.form`
	margin-top: 20px;
	margin-bottom: 10px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
`;
export const Input = styled.input`
	padding: 10px 20px;
	border-radius: 50px;
	border: 1px solid lightgray;
	width: 100%;
	font-size: 16px;
	&[type='submit'] {
		cursor: pointer;
		background-color: #8cc152;
		color: white;
		font-weight: 600;
		&:hover {
			opacity: 0.8;
		}
	}
`;
export const Error = styled.span`
	font-weight: 600;
	color: tomato;
`;

export const Switcher = styled.span`
	margin-top: 20px;
	a {
		color: #8cc152;
		text-decoration: none;
	}
`;

export const Buttons = styled.div`
	margin-top: 30px;
	width: 60%;
	display: flex;
	flex-direction: column;
`;

export const MainTitle = styled.h1`
	font-size: 70px;
	font-weight: 700;
	padding: 50px 0px;
`;

export const SubTitle = styled.h2`
	margin-top: 20px;
	font-size: 20px;
	font-weight: 600;
`;
