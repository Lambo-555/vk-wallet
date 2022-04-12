import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

const Transaction = (props) => (
	<Panel id={props.id}>
		<PanelHeader left={<PanelHeaderBack onClick={() => console.log('work')} />}>
			{props.id}
		</PanelHeader>
	</Panel>
);

Transaction.propTypes = {
	id: PropTypes.string.isRequired,
	// go: PropTypes.func.isRequired,
};

export default Transaction;
