import React from 'react';
import {
	Panel,
	PanelHeader,
	Group,
	List,
	Cell,
} from '@vkontakte/vkui';
import {
	// Icon28MenuOutline,
	Icon28WalletOutline,
	Icon28MoneyTransferOutline,
	Icon28HistoryBackwardOutline,
	Icon28SettingsOutline,
	Icon28BankOutline,
	Icon28ChainCircleFillBlue,
} from '@vkontakte/icons';

import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setPanel } from '../features/panel/panelSlice';

const Menu = (props) => {
	const menuList = useSelector((state) => state.panel.panels);
	const dispatch = useDispatch();

	return (
		<Panel id={props.id}>
			<PanelHeader right={<Icon28ChainCircleFillBlue />}>
				VK Wallet
			</PanelHeader>
			<Group>
				<List>
					<Cell
						expandable
						onClick={() => dispatch(setPanel(menuList.wallet))}
						before={<Icon28WalletOutline />}
					>
						Wallet
					</Cell>
					<Cell
						expandable
						onClick={() => dispatch(setPanel(menuList.transaction))}
						before={<Icon28MoneyTransferOutline />}
					>
						Transaction
					</Cell>
					<Cell
						expandable
						onClick={() => dispatch(setPanel(menuList.history))}
						before={<Icon28HistoryBackwardOutline />}
					>
						History
					</Cell>
					<Cell
						expandable
						onClick={() => dispatch(setPanel(menuList.settings))}
						before={<Icon28SettingsOutline />}
					>
						Settings
					</Cell>
					<Cell
						expandable
						onClick={() => dispatch(setPanel(menuList.vault))}
						before={<Icon28BankOutline />}
					>
						Vault
					</Cell>
				</List>
			</Group>
		</Panel>
	);
};

Menu.propTypes = {
	id: PropTypes.string.isRequired,
	// go: PropTypes.func.isRequired,
};

export default Menu;
