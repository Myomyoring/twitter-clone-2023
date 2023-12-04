import { Link } from 'react-router-dom';
import { Title, Wrapper } from '../components/Auth-Components';
import GithubButton from '../components/Github-Btn';
import styled from 'styled-components';
import { CommonButton, CommonLightButton } from '../components/common/Common-Btn';

const MainTitle = styled.h1`
	font-size: 70px;
	font-weight: 600;
	padding: 50px 0px;
`;

const Buttons = styled.div`
	margin-top: 30px;
	width: 60%;
	display: flex;
	flex-direction: column;
`;
const LineWrap = styled.div`
	margin: 10px 0px;
	display: flex;
	justify-content: center;
	align-items: center;
`;
const Line = styled.div`
	display: flex;
	align-self: stretch;
	width: 130px;
	height: 1px;
	margin: auto;
	border: 1px solid gray;
`;
const Text = styled.div`
	padding: 0px 5px;
	width: 50px;
	text-align: center;
`;
const SubTitle = styled.h2`
	margin-top: 20px;
	font-size: 20px;
	font-weight: 600;
`;
export default function AuthLoginIndex() {
	return (
		<Wrapper>
			<MainTitle>지금 일어나고 있는 일</MainTitle>
			<Title>지금 가입하세요.</Title>
			<Buttons>
				<GithubButton />
				<GithubButton />
				<LineWrap>
					<Line></Line>
					<Text>또는</Text>
					<Line></Line>
				</LineWrap>
				<CommonButton>
					<Link to="/create-account">계정 만들기</Link>
				</CommonButton>
				<SubTitle>이미 트위터에 가입하셨나요?</SubTitle>
				<CommonLightButton>
					<Link to="/login">로그인</Link>
				</CommonLightButton>
			</Buttons>
		</Wrapper>
	);
}
