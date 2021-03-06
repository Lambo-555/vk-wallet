import React from 'react';
import PropTypes from 'prop-types';

import { Panel, PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';

import persik from '../img/persik.png';

function Persik(props) {
  return (
    <Panel id={props.id}>
      <PanelHeader
        left={<PanelHeaderBack onClick={console.log('adawd')} data-to="home" />}
      >
        Persik
      </PanelHeader>
      <img className="Persik" src={persik} alt="Persik The Cat" />
    </Panel>
  );
}

Persik.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Persik;
