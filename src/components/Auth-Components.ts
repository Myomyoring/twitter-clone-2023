import styled from 'styled-components';

export const Wrapper = styled.div`
	height: 100%;
	display: flex;
	flex-direction: column;
`;
export const Div = styled.div`
	width: 50%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
export const Title = styled.h1`
	font-size: 42px;
	font-weight: 600;
`;
export const Form = styled.form`
	margin-top: 50px;
	margin-bottom: 10px;
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
`;
export const Input = styled.input`
	padding: 10px 20px;
	border-radius: 50px;
	border: none;
	width: 100%;
	font-size: 16px;
	&[type='submit'] {
		cursor: pointer;
		background-color: #8cc152;
		color: white;
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
	}
`;
