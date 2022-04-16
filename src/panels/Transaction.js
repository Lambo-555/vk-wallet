import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { setPanel } from '../features/panel/panelSlice';

function Transaction(props) {
	const dispatch = useDispatch();
	const menuList = useSelector((state) => state.panel.panels);

  return (
    <Panel id={props.id}>
      <PanelHeader left={<PanelHeaderBack onClick={() => dispatch(setPanel(menuList.menu))} />}>
        {props.id}
      </PanelHeader>
    </Panel>
  );
}

Transaction.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Transaction;
