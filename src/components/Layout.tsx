import { Link, Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { auth } from '../firebase';

const Wrapper = styled.div`
	display: grid;
	gap: 20px;
	grid-template-columns: 1fr 4fr;
	height: 100%;
	padding: 50px 0px;
	width: 100%;
	max-width: 860px;
`;
const Menu = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
`;
const MenuItem = styled.div`
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 2px solid white;
	height: 50px;
	width: 50px;
	border-radius: 50%;
	svg {
		width: 30px;
		fill: white;
	}
	&.log-out {
		border-color: tomato;
		svg {
			fill: tomato;
		}
	}
`;

export default function Layout() {
	const navigate = useNavigate();
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
					<Link to="/">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
							<path d="M11.03 2.59a1.501 1.501 0 0 1 1.94 0l7.5 6.363a1.5 1.5 0 0 1 .53 1.144V19.5a1.5 1.5 0 0 1-1.5 1.5h-5.75a.75.75 0 0 1-.75-.75V14h-2v6.25a.75.75 0 0 1-.75.75H4.5A1.5 1.5 0 0 1 3 19.5v-9.403c0-.44.194-.859.53-1.144ZM12 3.734l-7.5 6.363V19.5h5v-6.25a.75.75 0 0 1 .75-.75h3.5a.75.75 0 0 1 .75.75v6.25h5v-9.403Z"></path>
						</svg>
					</Link>
				</MenuItem>
				<MenuItem>
					<Link to="/profile">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
							<path d="M12 2.5a5.5 5.5 0 0 1 3.096 10.047 9.005 9.005 0 0 1 5.9 8.181.75.75 0 1 1-1.499.044 7.5 7.5 0 0 0-14.993 0 .75.75 0 0 1-1.5-.045 9.005 9.005 0 0 1 5.9-8.18A5.5 5.5 0 0 1 12 2.5ZM8 8a4 4 0 1 0 8 0 4 4 0 0 0-8 0Z"></path>
						</svg>
					</Link>
				</MenuItem>
				<MenuItem onClick={onLogOut} className="log-out">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
						<path d="M20 14a2 2 0 1 1-.001-3.999A2 2 0 0 1 20 14ZM6 12a2 2 0 1 1-3.999.001A2 2 0 0 1 6 12Zm8 0a2 2 0 1 1-3.999.001A2 2 0 0 1 14 12Z"></path>
					</svg>
				</MenuItem>
			</Menu>
			<Outlet />
		</Wrapper>
	);
}
