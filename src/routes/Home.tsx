import styled from 'styled-components';
import PostTweetForm from '../components/Post-Tweet-Form';
import Timeline from '../components/TimeLine';

const Wrapper = styled.div``;

export default function Home() {
	return (
		<Wrapper>
			<PostTweetForm />
			<Timeline />
		</Wrapper>
	);
}
