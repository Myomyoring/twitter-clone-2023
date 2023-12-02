import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
	apiKey: 'AIzaSyC6YRsbBRPG2PEH6b-Xvrm46Yd9dH4T-Ds',
	authDomain: 'nwitter-reloaded-b8a95.firebaseapp.com',
	projectId: 'nwitter-reloaded-b8a95',
	storageBucket: 'nwitter-reloaded-b8a95.appspot.com',
	messagingSenderId: '220780023991',
	appId: '1:220780023991:web:48c20d9ff6ab1ebbf5bd32',
	measurementId: 'G-3Q9FEJK8VZ',
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
