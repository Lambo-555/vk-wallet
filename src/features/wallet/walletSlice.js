import Web3 from 'web3';
import { createSlice } from '@reduxjs/toolkit';

export const walletSlice = createSlice({
    name: 'wallet',
    initialState: {
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
            // binance: { blockchain: 'Binance', logo: '' },
            // binanceTestnet: { blockchain: 'Binance', logo: '' },
        },
        history: [], // {transactionHash, from, to, value}
        balance: 0,
        connectionString: 'https://rinkeby.infura.io/v3/3c32cdd37b124fed85037dd52f7a70c5',
        web3: null,
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
        setBalance: (state, action) => {
            state.balance = +action.payload;
        },
        addToHistory: (state, action) => {
            const isExist = state.history
                .filter((event) => event.transactionHash === action.payload.transactionHash);
            if (!isExist) state.history.push(action.payload);
        },
        addWallet: (state, action) => {
            // publicKey: secretKey
            state.wallets[action.payload.publicKey] = action.payload.secretKey;
        },
        selectWallet: (state, action) => {
            state.wallet = state.wallets[action.payload.publicKey];
        },
        connect: (state) => {
            state.web3 = new Web3(state.connectionString);
        },
    },
});

export const {
    selectNetwork,
    setBalance,
    addToHistory,
    addWallet,
    selectWallet,
    selectProvider,
    connect,
} = walletSlice.actions;

export default walletSlice.reducer;
