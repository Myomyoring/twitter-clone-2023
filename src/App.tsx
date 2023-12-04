import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Layout from './components/Layout';
import Home from './routes/Home';
import Login from './routes/Login';
import Profile from './routes/Profile';
import CreateAccount from './routes/Create-Account';
import { useEffect, useState } from 'react';
import LoadingScreen from './components/Loading-Screen';
import { auth } from './firebase';
import ProtectedRoute from './components/Protected-Route';
import Auth from './routes/Auth';
import LoginIndex from './routes/Login-index';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<Layout />
			</ProtectedRoute>
		),
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: 'profile',
				element: <Profile />,
			},
		],
	},
	{
		path: '/login-index',
		element: (
			<Auth>
				<LoginIndex />
			</Auth>
		),
	},
	{
		path: '/login',
		element: (
			<Auth>
				<Login />
			</Auth>
		),
	},
	{
		path: '/create-account',
		element: (
			<Auth>
				<CreateAccount />
			</Auth>
		),
	},
]);

const GlobalStyles = createGlobalStyle`
	${reset};
	* {
		box-sizing: border-box;
	}
	body {
		background-color: black;
		color: white;
		font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
	}
`;

const Wrapper = styled.div`
	width: 100vw;
	height: 100vh;
	display: flex;
	justify-content: center;
`;

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const init = async () => {
		await auth.authStateReady();
		setIsLoading(false);
	};
	useEffect(() => {
		init();
	}, []);
	return (
		<Wrapper>
			<GlobalStyles />
			{isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
		</Wrapper>
	);
}

export default App;
