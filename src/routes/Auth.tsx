import styled from 'styled-components';
import { Div } from '../components/Auth-Components';
import Logo from '../components/common/Logo';

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	padding: 50px 0px;
`;

export default function Auth({ children }: { children: React.ReactNode }) {
	return (
		<Wrapper>
			<Div>
				<Logo />
			</Div>
			<Div>{children}</Div>
		</Wrapper>
	);
}
