import styled from 'styled-components';

const LineWrap = styled.div`
	margin: 10px 0px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Line = styled.div`
	width: 130px;
	height: 1px;
	margin: auto;
	border: 1px solid lightgrey;
`;
const Text = styled.div`
	padding: 0px 5px;
	width: 50px;
	text-align: center;
`;

export default function OrLine() {
	return (
		<LineWrap>
			<Line></Line>
			<Text>또는</Text>
			<Line></Line>
		</LineWrap>
	);
}
