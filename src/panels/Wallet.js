import React, { useState } from 'react';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';

import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Placeholder,
	Button,
	Group,
	List,
	Cell,
	CellButton,
	Avatar,
	Snackbar,
	MiniInfoCell,
} from '@vkontakte/vkui';
import {
	Icon28CopyOutline,
	Icon56WifiOutline,
	Icon28ReplayOutline,
	Icon28UserOutline,
	Icon28PrivacyOutline,
	Icon28WalletOutline,
	Icon16Done,
	Icon28MoneyWadOutline,
	Icon12Chain,
	Icon28RefreshOutline,
} from '@vkontakte/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setPanel } from '../features/panel/panelSlice';
import { createWallet, connect, fetchBalance } from '../features/wallet/walletSlice';

function Wallet(props) {
	const dispatch = useDispatch();
	const [snackbar, setSnackbar] = useState();
	const menuList = useSelector((state) => state.panel.panels);
	const web3IsOn = useSelector((state) => state.wallet.web3IsOn);
	const wallet = useSelector((state) => state.wallet.wallet);
	const balance = useSelector((state) => state.wallet.balance);

	return (
		<Panel id={props.id}>
			<PanelHeader left={<PanelHeaderBack onClick={() => dispatch(setPanel(menuList.menu))} />}>
				Wallet
			</PanelHeader>
			{!web3IsOn && (
				<Placeholder
					action={
						<Button
							size="l"
							before={<Icon28ReplayOutline />}
							appearance="accent"
							stretched
							onClick={() => dispatch(connect())}
						>
							Connect
						</Button>
					}
					icon={<Icon56WifiOutline />}
					stretched
				>
					Blockchain network
				</Placeholder>
			)}
			{web3IsOn && (
				<Group>
					<List>
						{!wallet && (
							<CellButton
								before={
									<Avatar shadow={false} size={72} mode="image">
										<Icon28WalletOutline />
									</Avatar>
								}
								onClick={() => dispatch(createWallet())}
							>
								Create wallet
							</CellButton>
						)}
						{wallet && (
							<Cell
								before={<Icon28UserOutline />}
								after={<Icon28CopyOutline />}
								expandable
								onClick={() => {
									if (wallet && bridge) {
										bridge.send('VKWebAppCopyText', { text: wallet.address });
									}
									setSnackbar(true);
								}}
							>
								Public address
							</Cell>
						)}
						{wallet && (
							<MiniInfoCell before={<Icon12Chain />} textWrap="full" textLevel="secondary">
								{wallet.address}
							</MiniInfoCell>
						)}
						{wallet && (
							<Cell
								expandable
								before={<Icon28MoneyWadOutline />}
								after={<Icon28RefreshOutline />}
								onClick={() => {
									dispatch(fetchBalance(wallet.address));
								}}
							>
								Balance
							</Cell>
						)}
						{wallet &&
						balance && (
							<MiniInfoCell before={<Icon12Chain />} textWrap="full" textLevel="secondary">
								{balance}
							</MiniInfoCell>
						)}
						{wallet && (
							<Cell
								expandable
								before={<Icon28PrivacyOutline />}
								after={<Icon28CopyOutline />}
								onClick={() => {
									if (wallet && bridge) {
										bridge.send('VKWebAppCopyText', { text: wallet.privateKey });
									}
									setSnackbar(true);
								}}
							>
								Private Key
							</Cell>
						)}
						{wallet && (
							<MiniInfoCell before={<Icon12Chain />} textWrap="full" textLevel="secondary">
								{`${wallet.privateKey.slice(0, 10)}...`}
							</MiniInfoCell>
						)}
					</List>
				</Group>
			)}
			{snackbar && (
				<Snackbar
					onClose={() => setSnackbar(false)}
					before={
						<Avatar size={24}>
							<Icon16Done width={14} height={14} />
						</Avatar>
					}
				>
					Copied to clipboard
				</Snackbar>
			)}
		</Panel>
	);
}

Wallet.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Wallet;
