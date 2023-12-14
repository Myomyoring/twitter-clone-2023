import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import MenuLeft from './Menu-Left';
import MenuRight from './Menu-Right';

const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 4fr 3fr;
	height: 100%;
	width: 100%;
	max-width: 1280px;
`;

export default function Layout() {
	return (
		<Wrapper>
			<MenuLeft />
			<Outlet />
			<MenuRight />
		</Wrapper>
	);
}
