import styled from 'styled-components';

export const CommonButton = styled.span<{ width?: string }>`
	margin: 10px 0px;
	background-color: #8cc152;
	font-weight: 600;
	width: ${(props) => (props.width ? props.width : '100%')};
	color: black;
	padding: 15px 20px;
	border-radius: 50px;
	border: 0;
	display: flex;
	gap: 5px;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	a {
		color: white;
		text-decoration: none;
	}
`;

export const CommonLightButton = styled.span<{ width?: string }>`
	margin: 10px 0px;
	background-color: white;
	font-weight: 600;
	width: ${(props) => (props.width ? props.width : '100%')};
	color: black;
	padding: 15px 20px;
	border-radius: 50px;
	border: 1px solid lightgray;
	display: flex;
	gap: 5px;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	a {
		color: #8cc152;
		text-decoration: none;
	}
`;
