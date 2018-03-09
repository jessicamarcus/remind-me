import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Main from './Main';
import Footer from './Footer';

import { durations } from '../../constants';


/**
 * Root component for application. Maintains all state.
 */
class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mode: Notification.permission === 'granted' ? 'ready' : 'intro', // intro, unsupported, ready, denied
            reminderDelay: durations[0],
            reminderText: ''
        };

        this.askPermission = this.askPermission.bind(this);
        this.registerReminder = this.registerReminder.bind(this);
        this.updateReminderDelay = this.updateReminderDelay.bind(this);
        this.updateReminderText = this.updateReminderText.bind(this);
    };

    /**
     * Have browser request notifications permission from user, then update app mode
     * @returns {Promise<any>}
     */
    askPermission() {
        return new Promise((resolve, reject) => {
            Notification.requestPermission(result => resolve(result))
                .then(result => {
                    result === 'granted' ? this.setState({ mode: 'ready' }) : this.setState({ mode: 'denied' });
                })
                .catch(() => { console.error('Error while requesting permissions') });
        });
    }

    installServiceWorker() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log(`sw registered: ${registration}`);
            })
            .catch(error => {
                console.error(`sw registration failed: ${error}`);
            });
    }

    /**
     * Post a message containing the reminder text and delay to the service worker
     */
    registerReminder() {
        const delayInMs = this.state.reminderDelay * 60000;

        navigator.serviceWorker.controller.postMessage({ message: this.state.reminderText, delay: delayInMs });

        // todo: get confirmation from sw before clearing vals
        this.setState({ reminderDelay: durations[0], reminderText: '' });
    }

    updateReminderDelay(minutes) {
        this.setState({ reminderDelay: minutes });
    }

    updateReminderText(text) {
        this.setState({ reminderText: text });
    }

    componentWillMount() {
        if ('serviceWorker' in navigator && 'Notification' in window) {

            window.addEventListener('load', this.installServiceWorker);

        } else {
            this.setState({ mode: 'unsupported' });
        }
    }

    render() {
        return (
            <Fragment>
                <header><h1>{this.props.title}...</h1></header>

                <Main
                    mode={this.state.mode}
                    reminderDelay={this.state.reminderDelay}
                    reminderText={this.state.reminderText}
                    updateReminderDelay={this.updateReminderDelay}
                    updateReminderText={this.updateReminderText}
                />

                <Footer
                    mode={this.state.mode}
                    reminderText={this.state.reminderText}
                    askPermission={this.askPermission}
                    registerReminder={this.registerReminder}
                />
            </Fragment>
        );
    };
}

App.propTypes = {
    title: PropTypes.string
};


export default App;
