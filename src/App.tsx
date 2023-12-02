import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Layout from './components/Layout';
import Home from './router/Home';
import Login from './router/Login';
import Profile from './router/Profile';
import CreateAccount from './router/Create-Account';
import { useEffect, useState } from 'react';
import LoadingScreen from './components/Loading-Screen';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
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
		path: '/login',
		element: <Login />,
	},
	{
		path: '/create-account',
		element: <CreateAccount />,
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

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const init = async () => {
		setIsLoading(false);
	};
	useEffect(() => {
		init();
	}, []);
	return (
		<>
			<GlobalStyles />
			{isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
		</>
	);
}

export default App;
