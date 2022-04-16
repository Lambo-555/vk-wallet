import React from 'react';
import ReactDOM from 'react-dom';
import bridge from '@vkontakte/vk-bridge';
import { Provider } from 'react-redux';
import App from './App';
import store from './store';

bridge.send('VKWebAppInit');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

if (process.env.NODE_ENV === 'development') {
  import('./eruda').then(({ default: eruda }) => { console.log('erudaIsOn: ', !!eruda); }); // runtime download
}
