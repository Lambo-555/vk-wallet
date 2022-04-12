import React from 'react';
import PropTypes from 'prop-types';
import {
	Panel,
	PanelHeader,
	PanelHeaderBack,
	Group,
	FormItem,
	NativeSelect,
} from '@vkontakte/vkui';
import { useSelector, useDispatch } from 'react-redux';
import { setPanel } from '../features/panel/panelSlice';
import {
	selectNetwork,
	selectProvider,
} from '../features/wallet/walletSlice';

const Settings = (props) => {
	const menuList = useSelector((state) => state.panel.panels);
	const providers = useSelector((state) => state.wallet.providers);
	const networks = useSelector((state) => state.wallet.networks);
	// const walletData = useSelector((state) => state.wallet);
	const dispatch = useDispatch();

	return (
		<Panel id={props.id}>
			<PanelHeader left={<PanelHeaderBack onClick={() => dispatch(setPanel(menuList.menu))} />}>
				Settings
			</PanelHeader>
			<Group>
				<FormItem top="Select provider">
					<NativeSelect onInput={(e) => dispatch(selectProvider(e.target.value))}>
						{Object.keys(providers)
							.map((item) => <option key={item} value={item}>{item}</option>)}
					</NativeSelect>
				</FormItem>
				<FormItem top="Select network">
					<NativeSelect onInput={(e) => dispatch(selectNetwork(e.target.value))}>
						{Object.keys(networks)
							.map((item) => <option key={item} value={item}>{item}</option>)}
					</NativeSelect>
				</FormItem>
			</Group>
			{/* <div>{walletData.connectionString}</div> */}
		</Panel>
	);
};

Settings.propTypes = {
	id: PropTypes.string.isRequired,
	// go: PropTypes.func.isRequired,
};

export default Settings;