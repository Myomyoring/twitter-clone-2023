import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase';
import { MenuList } from './Menu-List';
import Logo from './common/Logo';
import MiniProfile from './Mini-Profile';
import { preparing } from './common/preparing';

const Menu = styled.div`
	width: 100%;
	height: 100%;
	border-right: 0.6px solid lightgray;
`;

const MenuItem = styled.div`
	cursor: pointer;
	width: 100%;
	height: 50px;
	svg {
		width: 30px;
		fill: black;
	}
	a {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		color: black;
		text-decoration: none;
	}
	a:hover {
		background-color: lightgray;
		border-radius: 50px;
	}
	button {
		cursor: pointer;
		display: flex;
		align-items: center;
		gap: 10px;
		background: none;
		border: 0;
		padding: 0;
		font-size: 16px;
	}
	button:hover {
		background-color: lightgray;
		border-radius: 50px;
	}
	span {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		color: black;
		text-decoration: none;
	}
	span:hover {
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

const MenuIcon = styled.span``;

export default function MenuLeft() {
	const navigate = useNavigate();
	// const user = auth.currentUser;
	const onLogOut = async () => {
		const ok = confirm('정말 로그아웃 하시겠습니까?');
		if (ok) {
			await auth.signOut();
			navigate('/login-index');
		}
	};
	return (
		<Menu>
			<MenuItem>
				<Logo width={'30px'} height={'30px'} />
			</MenuItem>
			{MenuList.map((menu) => (
				<MenuItem key={menu.id}>
					{menu.link ? (
						<Link to={menu.link}>
							<MenuIcon>{menu.svg}</MenuIcon>
							<MenuName>{menu.name}</MenuName>
						</Link>
					) : (
						<button onClick={preparing}>
							<MenuIcon>{menu.svg}</MenuIcon>
							<MenuName>{menu.name}</MenuName>
						</button>
					)}
				</MenuItem>
			))}
			<MenuItem onClick={onLogOut}>
				<span>
					<MenuIcon>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
							<path d="M20 14a2 2 0 1 1-.001-3.999A2 2 0 0 1 20 14ZM6 12a2 2 0 1 1-3.999.001A2 2 0 0 1 6 12Zm8 0a2 2 0 1 1-3.999.001A2 2 0 0 1 14 12Z"></path>
						</svg>
					</MenuIcon>
					<MenuName>로그아웃</MenuName>
				</span>
			</MenuItem>
			<MiniProfile mode={'user'} />
		</Menu>
	);
}
