import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import walletReducer from './features/wallet/walletSlice';
import panelReducer from './features/panel/panelSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    wallet: walletReducer,
    panel: panelReducer,
  },
});
