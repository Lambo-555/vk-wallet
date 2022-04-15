import Web3 from 'web3';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

let web3 = null;
let userWallet = null;

export const requestTokens = createAsyncThunk(
  'wallet/addTokens',
  async (address) => {
    const balance = await web3.eth.getBalance(address);
    return balance;
  },
);
export const fetchBalance = createAsyncThunk(
  'wallet/fetchBalance',
  async (address) => {
    const balance = await web3.eth.getBalance(address);
    return balance;
  },
);
export const createWallet = createAsyncThunk(
  'wallet/createWallet',
  async () => {
    const newWallet = await web3.eth.accounts.create();
    userWallet = newWallet;
    return true;
  },
);

export const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    isLoading: false,
    error: null,
    wallet: null,
    wallets: {},
    provider: 'infura',
    providers: {
      infura: { projectId: '3c32cdd37b124fed85037dd52f7a70c5', connectionString: 'https://NETWORK.infura.io/v3/ID' },
      moralis: { projectId: '77b402448f33b6dbeee056e9', connectionString: 'https://speedy-nodes-nyc.moralis.io/ID/eth/NETWORK' },
    },
    network: 'rinkeby',
    networks: {
      rinkeby: { blockchain: 'Ethereum rinkeby', logo: '' },
      mainnet: { blockchain: 'Ethereum mainnet', logo: '' },
      ropsten: { blockchain: 'Ethereum ropsten', logo: '' },
      kovan: { blockchain: 'Ethereum kovan', logo: '' },
      goerli: { blockchain: 'Ethereum goerli', logo: '' },
    },
    history: [],
    balance: null,
    connectionString: 'https://rinkeby.infura.io/v3/3c32cdd37b124fed85037dd52f7a70c5',
    web3IsOn: false,
  },

  reducers: {
    selectNetwork: (state, action) => {
      state.network = action.payload;
      state.connectionString = state.providers[state.provider].connectionString
        .replace(/ID/gm, state.providers[state.provider].projectId)
        .replace(/NETWORK/gm, state.network);
    },
    selectProvider: (state, action) => {
      state.provider = action.payload;
      state.connectionString = state.providers[state.provider].connectionString
        .replace(/ID/gm, state.providers[state.provider].projectId)
        .replace(/NETWORK/gm, state.network);
    },
    addToHistory: (state, action) => {
      const isExist = state.history
        .filter((event) => event.transactionHash === action.payload.transactionHash);
      if (!isExist) state.history.push(action.payload);
    },
    connect: (state) => {
      web3 = new Web3(state.connectionString);
      if (web3) state.web3IsOn = true;
    },
  },
  extraReducers: {
    [fetchBalance.pending]: (state) => { state.isLoading = true; },
    [fetchBalance.fulfilled]: (state, action) => {
      state.balance = action.payload;
      state.isLoading = false;
    },
    [fetchBalance.rejected]: (state) => {
      state.error = true;
      state.isLoading = false;
    },
    [createWallet.pending]: (state) => { state.isLoading = true; },
    [createWallet.fulfilled]: (state) => {
      state.wallet = { address: userWallet.address, privateKey: userWallet.privateKey };
      state.isLoading = false;
    },
    [createWallet.rejected]: (state) => {
      state.isLoading = false;
      state.error = true;
    },
  },
});

export const {
  selectNetwork,
  setBalance,
  addToHistory,
  selectWallet,
  selectProvider,
  connect,
} = walletSlice.actions;

export default walletSlice.reducer;
