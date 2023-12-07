import styled from 'styled-components';

const Wrapper = styled.div`
	width: 300px;
	height: 100%;
	display: flex;
	align-items: center;
`;
const LogoImage = styled.img<{ width?: string; height?: string }>`
	width: ${(props) => (props.width ? props.width : '300px')};
	height: ${(props) => (props.height ? props.height : '300px')};
`;

interface LogoProps {
	width?: string;
	height?: string;
}

const Logo: React.FC<LogoProps> = ({ width, height }) => {
	return (
		<Wrapper>
			<LogoImage src="/logo.svg" width={width} height={height} />
		</Wrapper>
	);
};

export default Logo;
