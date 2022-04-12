import React, { useState } from 'react';
import PropTypes from 'prop-types';

import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Snackbar,
	Avatar,
	Placeholder,
	Button,
} from '@vkontakte/vkui';
import {
	Icon16Done,
	Icon28ArrowRightCircleOutline,
	Icon56WalletOutline,
	Icon28BankOutline,
	Icon56GiftOutline,
} from '@vkontakte/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setPanel } from '../features/panel/panelSlice';
import { requestTokens } from '../features/wallet/walletSlice';

const Vault = (props) => {
	const dispatch = useDispatch();
	const [snackbar, setSnackbar] = useState();
	const menuList = useSelector((state) => state.panel.panels);
	const wallet = useSelector((state) => state.wallet.wallet);
	return (
		<Panel id={props.id}>
			<PanelHeader left={<PanelHeaderBack onClick={() => dispatch(setPanel(menuList.menu))} />}>
				Vault
			</PanelHeader>
			{!wallet && <Placeholder
				action={
					<Button
						size="l"
						before={<Icon28ArrowRightCircleOutline />}
						appearance="accent"
						stretched
						onClick={() => dispatch(setPanel(menuList.wallet))}
					>
						Go to wallet screen
					</Button>
				}
				icon={<Icon56WalletOutline />}
				stretched
			>
				Wallet not connected
			</Placeholder>}
			{wallet && <Placeholder
				action={
					<Button
						size="l"
						before={<Icon28BankOutline />}
						appearance="accent"
						stretched
						onClick={() => {
							setSnackbar(true);
							dispatch(requestTokens(wallet.address));
						}}
					>
						Request free tokens
					</Button>
				}
				icon={<Icon56GiftOutline />}
				stretched
			>
				Vault - bank of free tokens
			</Placeholder>}
			{snackbar && <Snackbar
				onClose={() => setSnackbar(false)}
				before={
					<Avatar size={24}>
						<Icon16Done width={14} height={14} />
					</Avatar>
				}
			>
				Tokens requested
			</Snackbar>}
		</Panel>
	);
};

Vault.propTypes = {
	id: PropTypes.string.isRequired,
	// go: PropTypes.func.isRequired,
};

export default Vault;
