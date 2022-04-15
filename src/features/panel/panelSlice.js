import { createSlice } from '@reduxjs/toolkit';

export const panelSlice = createSlice({
  name: 'panel',
  initialState: {
    panel: 'menu',
    panels: {
      menu: 'menu',
      wallet: 'wallet',
      transaction: 'transaction',
      history: 'history',
      settings: 'settings',
      vault: 'vault',
    },
    history: [],
  },
  reducers: {
    setPanel: (state, action) => {
      state.panel = state.panels[action.payload];
      state.history.push(action.payload);
    },
  },
});

export const { setPanel } = panelSlice.actions;

export default panelSlice.reducer;
