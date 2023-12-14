import styled from 'styled-components';
import { preparing } from './common/preparing';
import { useRef } from 'react';
import { CommonButton } from './common/Common-Btn';
import MiniProfile from './Mini-Profile';
import { DummyUserList } from './DummyUserList';

const RightMenu = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
	gap: 10px;
	padding: 5px 10px;
	border-left: 0.6px solid lightgray;
	svg {
		width: 18px;
		position: absolute;
		margin: 6px 13px;
	}
`;

const SearchBar = styled.input`
	background-color: #e9e9e9;
	border: 0;
	border-radius: 20px;
	padding: 10px 50px;
	&:focus {
		outline: #8cc152;
		background-color: white;
	}
`;

const RightItem = styled.div`
	width: 100%;
	background-color: #e9e9e9;
	border-radius: 20px;
	padding: 10px 10px;
	p {
		padding: 10px 0px;
		font-size: 14px;
	}
`;

const RightItemTitle = styled.h1`
	font-size: 17px;
	font-weight: 800;
`;

export default function MenuRight() {
	const inputRef = useRef<HTMLInputElement>(null);
	const onFocusOut = () => {
		preparing();
		inputRef.current?.blur();
	};
	return (
		<RightMenu>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
				<path d="M10.25 2a8.25 8.25 0 0 1 6.34 13.53l5.69 5.69a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215l-5.69-5.69A8.25 8.25 0 1 1 10.25 2ZM3.5 10.25a6.75 6.75 0 1 0 13.5 0 6.75 6.75 0 0 0-13.5 0Z"></path>
			</svg>
			<SearchBar type="text" placeholder="검색" ref={inputRef} onFocus={onFocusOut} />
			<RightItem>
				<RightItemTitle>Premium 구독하기</RightItemTitle>
				<p>구독하여 새로운 기능을 이용해 보세요. 자격을 충족하는 경우 광고 수익 배분금도 받을 수 있습니다.</p>
				<CommonButton width={'100px'} onClick={preparing}>
					구독하기
				</CommonButton>
			</RightItem>
			<RightItem>
				<RightItemTitle>나를 위한 트렌드</RightItemTitle>
			</RightItem>
			<RightItem>
				<RightItemTitle>팔로우 추천</RightItemTitle>
				{DummyUserList.map((user) => (
					<MiniProfile key={user.id} user={user} mode={'follow'} />
				))}
			</RightItem>
		</RightMenu>
	);
}
