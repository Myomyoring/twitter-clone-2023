import styled from 'styled-components';
import PostTweetForm from '../components/Post-Tweet-Form';
import Timeline from '../components/Timeline';

const Wrapper = styled.div`
	display: grid;
	/* gap: 10px; */
	overflow-y: scroll;
	grid-template-rows: 1fr 5fr;
`;

export default function Home() {
	return (
		<Wrapper>
			<PostTweetForm />
			<Timeline />
		</Wrapper>
	);
}
