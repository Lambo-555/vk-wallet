import React from 'react';
import PropTypes from 'prop-types';
import {
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Group,
  FormItem,
  Button,
  NativeSelect,
} from '@vkontakte/vkui';
import { useSelector, useDispatch } from 'react-redux';
import { Icon28ReplayOutline } from '@vkontakte/icons';
import { setPanel } from '../features/panel/panelSlice';
import { selectNetwork, selectProvider, connect } from '../features/wallet/walletSlice';

function Settings(props) {
	const menuList = useSelector((state) => state.panel.panels);
	const providers = useSelector((state) => state.wallet.providers);
	const networks = useSelector((state) => state.wallet.networks);
	const dispatch = useDispatch();

	return (
		<Panel id={props.id}>
			<PanelHeader left={<PanelHeaderBack onClick={() => dispatch(setPanel(menuList.menu))} />}>
				Settings
			</PanelHeader>
			<Group>
				<FormItem top="Select provider">
					<NativeSelect onInput={(e) => dispatch(selectProvider(e.target.value))}>
						{Object.keys(providers).map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</NativeSelect>
				</FormItem>
				<FormItem top="Select network">
					<NativeSelect onInput={(e) => dispatch(selectNetwork(e.target.value))}>
						{Object.keys(networks).map((item) => (
							<option key={item} value={item}>
								{item}
							</option>
						))}
					</NativeSelect>
				</FormItem>
				<FormItem top="Apply new settings">
					<Button
            size="l"
						before={<Icon28ReplayOutline />}
						appearance="positive"
						stretched
						onClick={() => dispatch(connect())}
					>
						Save & reconnect
					</Button>
				</FormItem>
			</Group>
		</Panel>
	);
}

Settings.propTypes = {
	id: PropTypes.string.isRequired,
};

export default Settings;
