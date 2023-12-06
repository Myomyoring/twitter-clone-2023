import styled from 'styled-components';

const Wrapper = styled.div`
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
`;

export default function LoadingScreen() {
	return (
		<Wrapper>
			<img src="/loading.gif" />
		</Wrapper>
	);
}
