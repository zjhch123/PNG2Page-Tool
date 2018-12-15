import React from 'react';
import ReactDOM from 'react-dom';
import appConfig from './app.config.json';
import './lib/base.css';
import App from './App';

const locale = 'zh'
window.p2pAppConfig = appConfig[locale]
window.p2pAppEdit = appConfig['edit']

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept()
}