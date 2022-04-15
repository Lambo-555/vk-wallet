import React from 'react';
import { useSelector } from 'react-redux';

import {
  View,
  ScreenSpinner,
  AdaptivityProvider,
  AppRoot,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Menu from './panels/Menu';
import Wallet from './panels/Wallet';
import Transaction from './panels/Transaction';
import History from './panels/History';
import Settings from './panels/Settings';
import Vault from './panels/Vault';

function App() {
  const activePanel = useSelector((state) => state.panel.panel);
  const isLoading = useSelector((state) => state.wallet.isLoading);

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
