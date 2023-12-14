import styled from 'styled-components';

export const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;
export const TextArea = styled.textarea`
	border: 0.6px solid white;
	padding: 20px;
	border-radius: 20px;
	font-size: 16px;
	color: black;
	background-color: transparent;
	width: 100%;
	resize: none;
	font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
		'Helvetica Neue', sans-serif;
	&::placeholder {
		font-size: 16px;
	}
	&:focus {
		outline: none;
		border-color: #8cc152;
	}
`;
export const AttachFileButton = styled.label`
	padding: 10px 10px;
	color: #8cc152;
	text-align: center;
	border-radius: 20px;
	cursor: pointer;
	svg {
		fill: #8cc152;
	}
`;
export const AttachFileInput = styled.input`
	display: none;
`;
export const SubmitBtn = styled.input`
	background-color: #8cc152;
	color: white;
	border: none;
	padding: 7px 14px;
	border-radius: 20px;
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	&:hover,
	&:active {
		opacity: 0.9;
	}
`;

export const Nav = styled.nav`
	width: 100%;
	padding: 10px 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 14px;
	border-top: 0.6px solid lightgray;
	border-bottom: 0.6px solid lightgray;
`;
