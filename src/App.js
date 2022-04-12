import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import bridge from '@vkontakte/vk-bridge';
import {
	View,
	ScreenSpinner,
	AdaptivityProvider,
	AppRoot,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';
import Persik from './panels/Persik';

import Menu from './panels/Menu';
import Wallet from './panels/Wallet';
import Transaction from './panels/Transaction';
import History from './panels/History';
import Settings from './panels/Settings';
import Vault from './panels/Vault';

const App = () => {
	const activePanel = useSelector((state) => state.panel.panel);
	const isLoading = useSelector((state) => state.wallet.isLoading);
	const [fetchedUser, setUser] = useState(null);

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data } }) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			// setPopout(null);
		}
		fetchData();
	}, []);

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel} popout={isLoading && <ScreenSpinner size="large" />}>
					<Home id="home" fetchedUser={fetchedUser} />
					<Persik id="persik" />
					<Menu id="menu" />
					<Wallet id="wallet" />
					<Transaction id="transaction" />
					<History id="history" />
					<Settings id="settings" />
					<Vault id="vault" />
				</View>
			</AppRoot>
		</AdaptivityProvider>
	);
};

export default App;

// const go = (e) => {
// 	setActivePanel(e.currentTarget.dataset.to);
// };
