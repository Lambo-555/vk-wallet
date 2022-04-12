import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

const History = (props) => (
	<Panel id={props.id}>
		<PanelHeader left={<PanelHeaderBack onClick={() => console.log('work')} />}>
			{props.id}
		</PanelHeader>
	</Panel>
);

History.propTypes = {
	id: PropTypes.string.isRequired,
	// go: PropTypes.func.isRequired,
};

export default History;
