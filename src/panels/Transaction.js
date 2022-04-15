import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

function Transaction(props) {
  return (
    <Panel id={props.id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => console.log('work')} />}>
        {props.id}
      </PanelHeader>
    </Panel>
  );
}

Transaction.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Transaction;
