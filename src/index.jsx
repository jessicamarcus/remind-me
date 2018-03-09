import 'babel-polyfill';
import 'focus-visible';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App'

import { appName, themeColor } from '../constants';

import './stylesheets/main.scss';

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('body').style.backgroundColor = themeColor;

    ReactDOM.render(
            <App title={appName} />
        , document.getElementById('appRoot')
    );
});
