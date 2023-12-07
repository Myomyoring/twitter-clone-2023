import styled from 'styled-components';
import Logo from './common/Logo';

const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 10px;
`;

const LoadingImage = styled.img``;

export default function LoadingScreen() {
	return (
		<Wrapper>
			<Logo />
			<LoadingImage src="/loading.gif" />
		</Wrapper>
	);
}
