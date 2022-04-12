import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

const Vault = (props) => (
	<Panel id={props.id}>
		<PanelHeader left={<PanelHeaderBack onClick={() => console.log('work')} />}>
			{props.id}
		</PanelHeader>
	</Panel>
);

Vault.propTypes = {
	id: PropTypes.string.isRequired,
	// go: PropTypes.func.isRequired,
};

export default Vault;
