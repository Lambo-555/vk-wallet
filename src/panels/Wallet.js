import React from 'react';
import PropTypes from 'prop-types';

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
	Header,
	SimpleCell,
	InfoRow,
} from '@vkontakte/vkui';
import {
	Icon28CopyOutline,
	Icon56WifiOutline,
	Icon28ReplayOutline,
	Icon28UserOutline,
	Icon28PrivacyOutline,
	Icon28WalletOutline,
} from '@vkontakte/icons';
import { useSelector, useDispatch } from 'react-redux';
import { setPanel } from '../features/panel/panelSlice';
import {
	connect,
	// setBalance,
	// addWallet,
	// selectWallet,
} from '../features/wallet/walletSlice';

const Wallet = (props) => {
	const dispatch = useDispatch();
	const menuList = useSelector((state) => state.panel.panels);
	const web3 = useSelector((state) => state.wallet.web3);
	const wallet = useSelector((state) => state.wallet.wallet);
	return (
		<Panel id={props.id}>
			<PanelHeader left={<PanelHeaderBack onClick={() => dispatch(setPanel(menuList.menu))} />}>
				Wallet
			</PanelHeader>
			{!web3 && <Placeholder
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
			</Placeholder>}
			{web3 && (
				<Group>
					<List>
						<CellButton
							before={
								<Avatar shadow={false} size={72} mode="image">
									<Icon28WalletOutline />
								</Avatar>
							}
						>
							Create wallet
						</CellButton>
						<Cell
							before={<Icon28UserOutline />}
							after={<Icon28CopyOutline />}
							expandable
							onClick={() => wallet && navigator.clipboard.writeText(wallet.publicKey)}
						>
							Public key
						</Cell>
						<Cell expandable before={<Icon28PrivacyOutline />}>
							Secret key
						</Cell>
					</List>
				</Group>
			)}
			<Group>
				<Header mode="secondary">Информация о пользователе</Header>
				<SimpleCell multiline>
					<InfoRow header="Дата рождения">30 января 1993</InfoRow>
				</SimpleCell>
				<SimpleCell>
					<InfoRow header="Родной город">Ереван</InfoRow>
				</SimpleCell>
				<SimpleCell>
					<InfoRow header="Место работы">Команда ВКонтакте</InfoRow>
				</SimpleCell>
			</Group>
		</Panel>
	);
};

Wallet.propTypes = {
	id: PropTypes.string.isRequired,
	// go: PropTypes.func.isRequired,
};

export default Wallet;
