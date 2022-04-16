import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import bridge from '@vkontakte/vk-bridge';

import { View, ScreenSpinner, AdaptivityProvider, AppRoot } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Menu from './panels/Menu';
import Wallet from './panels/Wallet';
import Transaction from './panels/Transaction';
import History from './panels/History';
import Settings from './panels/Settings';
import Vault from './panels/Vault';

import { createWallet } from './features/wallet/walletSlice';

function App() {
	const activePanel = useSelector((state) => state.panel.panel);
	const isLoading = useSelector((state) => state.wallet.isLoading);
	const dispatch = useDispatch();

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
			console.log('USER::::', user);
		}
		fetchData();

		async function checkWallet() {
			const privateData = await bridge.send('VKWebAppStorageGet', { keys: ['vkWalletPrivateData'] });
      if (privateData.keys[0].value) {
        dispatch(createWallet(privateData.keys[0].value));
        console.log('privateData::::', privateData);
      }
		}
		checkWallet();
	}, []);

	return (
		<AdaptivityProvider>
			<AppRoot>
				<View activePanel={activePanel} popout={isLoading && <ScreenSpinner size="large" />}>
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
}

export default App;
