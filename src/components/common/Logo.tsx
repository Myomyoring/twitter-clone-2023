import styled from 'styled-components';

const LogoImage = styled.img`
	width: 300px;
`;

export default function Logo() {
	return <LogoImage src="/logo.svg" />;
}
