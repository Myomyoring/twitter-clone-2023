import styled from 'styled-components';

const Wrapper = styled.div`
	width: 300px;
	height: 100%;
	display: flex;
	align-items: center;
`;
const LogoImage = styled.img`
	height: 300px;
`;

export default function Logo() {
	return (
		<Wrapper>
			<LogoImage src="/logo.svg" />
		</Wrapper>
	);
}
