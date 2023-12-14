import styled from 'styled-components';
import { CommonButton } from './common/Common-Btn';
import { auth } from '../firebase';

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 5fr 1fr;
	width: 100%;
	padding: 7px 3px;
	align-items: center;
	cursor: pointer;
	span {
		padding: 3px 0px;
		font-size: 13px;
	}
	span:first-child {
		font-weight: 600;
	}
	span:nth-child(2) {
		color: gray;
	}
	button {
		cursor: pointer;
		background: none;
		border: none;
	}
	&:hover {
		background-color: lightgray;
		border-radius: 50px;
	}
`;

const ProfileImage = styled.img`
	width: 30px;
	height: 30px;
	border-radius: 100%;
`;
const UserInfo = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

interface User {
	displayName: string;
	photoURL: string;
}

interface MiniProfileProps {
	user?: User | null;
	mode: 'user' | 'follow';
}

export default function MiniProfile({ user, mode }: MiniProfileProps) {
	// const defaultUser: User = { displayName: 'Anonymous', photoURL: '' };
	const currentUser = user || (auth.currentUser as User);

	return (
		<Wrapper>
			<ProfileImage src={currentUser.photoURL} />
			<UserInfo>
				<span>{currentUser.displayName}</span>
				<span>@{currentUser.displayName}</span>
			</UserInfo>
			{mode === 'user' ? (
				<button>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
						<path d="M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
					</svg>
				</button>
			) : (
				<CommonButton width={'80px'}>팔로우</CommonButton>
			)}
		</Wrapper>
	);
}
