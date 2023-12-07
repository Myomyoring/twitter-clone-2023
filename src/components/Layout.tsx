import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase';
import Logo from './common/Logo';
import { MenuList } from './Menu-List';

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 4fr 3fr;
	height: 100%;
	width: 100%;
	max-width: 1280px;
`;
const Menu = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
	border-right: 1px solid lightgray;
`;
const MenuItem = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	height: 50px;
	div {
		padding: 0px 20px;
	}
	svg {
		width: 30px;
		fill: black;
	}
	a {
		padding: 10px 20px;
		display: flex;
		align-items: center;
		gap: 10px;
		color: black;
		text-decoration: none;
	}
	a:hover {
		background-color: lightgray;
		border-radius: 50px;
	}
	&:last-child {
		:hover {
			background-color: lightgray;
			border-radius: 50px;
		}
	}
`;

const MenuName = styled.span`
	color: black;
`;

const MiniProfile = styled.div`
	display: grid;
	grid-template-columns: 1fr 5fr 1fr;
	width: 100%;
	align-items: center;
	cursor: pointer;
	img {
		width: 30px;
		height: 30px;
		border-radius: 100%;
	}
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	span {
		padding: 3px 0px;
		font-size: 13px;
	}
	span:first-child {
		font-weight: 600;
	}
	span:last-child {
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

const MenuIcon = styled.span``;

const RightMenu = styled.div`
	display: flex;
	height: 100%;
	flex-direction: column;
	gap: 10px;
	padding: 5px 10px;
	border-left: 1px solid lightgray;
	svg {
		width: 18px;
		position: absolute;
		margin: 6px 13px;
	}
`;

const SearchBar = styled.input`
	background-color: lightgray;
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
	background-color: lightgray;
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

export default function Layout() {
	const navigate = useNavigate();
	const user = auth.currentUser;
	const onLogOut = async () => {
		const ok = confirm('정말 로그아웃 하시겠습니까?');
		if (ok) {
			await auth.signOut();
			navigate('/login-index');
		}
	};
	return (
		<Wrapper>
			<Menu>
				<MenuItem>
					<Logo width={'30px'} height={'30px'} />
				</MenuItem>
				{MenuList.map((menu) => (
					<MenuItem key={menu.id}>
						<Link to={menu.link}>
							<MenuIcon>{menu.svg}</MenuIcon>
							<MenuName>{menu.name}</MenuName>
						</Link>
					</MenuItem>
				))}
				<MiniProfile>
					<img src="/logo.svg" />
					<div>
						<span>{user?.displayName}</span>
						<span>@{user?.displayName}</span>
					</div>
					<button onClick={onLogOut}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16">
							<path d="M8 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM1.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm13 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
						</svg>
					</button>
				</MiniProfile>
			</Menu>
			<Outlet />
			<RightMenu>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
					<path d="M10.25 2a8.25 8.25 0 0 1 6.34 13.53l5.69 5.69a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215l-5.69-5.69A8.25 8.25 0 1 1 10.25 2ZM3.5 10.25a6.75 6.75 0 1 0 13.5 0 6.75 6.75 0 0 0-13.5 0Z"></path>
				</svg>
				<SearchBar type="text" placeholder="검색" />
				<RightItem>
					<RightItemTitle>Premium 구독하기</RightItemTitle>
					<p>구독하여 새로운 기능을 이용해 보세요. 자격을 충족하는 경우 광고 수익 배분금도 받을 수 있습니다.</p>
				</RightItem>
				<RightItem>
					<RightItemTitle>나를 위한 트렌드</RightItemTitle>
				</RightItem>
				<RightItem>
					<RightItemTitle>팔로우 추천</RightItemTitle>
				</RightItem>
			</RightMenu>
		</Wrapper>
	);
}
