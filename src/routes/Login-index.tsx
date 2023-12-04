import { Link } from 'react-router-dom';
import { Buttons, MainTitle, SubTitle, Title, Wrapper } from '../components/Auth-Components';
import GithubButton from '../components/Github-Btn';
import { CommonButton, CommonLightButton } from '../components/common/Common-Btn';
import OrLine from '../components/common/OrLine';
import GoogleButton from '../components/Google-Btn';

export default function LoginIndex() {
	return (
		<Wrapper>
			<MainTitle>지금 일어나고 있는 일</MainTitle>
			<Title>지금 가입하세요.</Title>
			<Buttons>
				<GoogleButton />
				<GithubButton />
				<OrLine />
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
