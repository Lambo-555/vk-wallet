import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader } from '@vkontakte/vkui';

function History(props) {
  return (
    <Panel id={props.id}>
      <PanelHeader>
        {props.id}
      </PanelHeader>
    </Panel>
  );
}

History.propTypes = {
  id: PropTypes.string.isRequired,
};

export default History;
