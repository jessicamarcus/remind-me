import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import '../stylesheets/footer.scss';


/**
 * Show which APIs are not supported in the browser
 * @returns {*}
 * @constructor
 */
function Unsupported() {
    return (
        <aside>
            <h2>Sorry, the app won’t run on this device. :(</h2>

            {'serviceWorker' in navigator === false &&
            <p>🚫 Browser does not support Service Workers</p>
            }

            {'Notification' in window === false &&
            <p>🚫 Browser does not support Notifications</p>
            }
        </aside>
    );
}

function showButton(props) {
    return (
        <Fragment>
            {props.mode !== 'unsupported' ?
                <button
                    type="button"
                    disabled={props.mode === 'ready' && !props.reminderText}
                    onClick={props.mode === 'ready' ? props.registerReminder : props.askPermission}
                >{props.mode === 'ready' ? 'Set reminder' : 'Let’s go!'}</button>
            : null}
        </Fragment>
    );

}

/**
 * Display action button when available, or information about missing browser support
 * @param props
 * @returns {*}
 * @constructor
 */
function Footer(props) {
    return (
        <footer>
            {props.mode === 'unsupported' && <Unsupported />}

            {props.mode !== 'denied' && showButton(props)}
        </footer>
    );
}

Footer.propTypes = {
    mode: PropTypes.string,
    reminderText: PropTypes.string,
    askPermission: PropTypes.func,
    registerReminder: PropTypes.func
};


export default Footer;
