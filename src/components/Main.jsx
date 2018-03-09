import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import UserInputs from './UserInputs';


/**
 * Displays intro text, app UI, or informational text if notifications have been blocked by the user
 * @param props
 * @returns {*}
 * @constructor
 */
function Main(props) {
    const { mode } = props;

    const introText = () => {
        return (
            <Fragment>
                <p>This is an offline-first webapp which will allow you to send your future self quick reminders. Add your text, select when you’d like to be reminded, and your reminder will pop up as a notification on your device at that time.</p>

                <p>Since this is a proof-of-concept using newer web APIs, it will not work with every browser or device.</p>

                <p>When prompted, you’ll need to allow “show notifications”.</p>
            </Fragment>
        );
    };

    return (
        <main>
            {(mode === 'intro' || mode === 'unsupported') && introText()}

            {mode === 'ready' &&
                <UserInputs {...props} />
            }

            {mode === 'denied' &&
                <Fragment>
                    <p>You must allow “show notifications” in order to use this app.</p>

                    <p><a href="https://support.google.com/chrome/answer/3220216?co=GENIE.Platform%3DDesktop&hl=en">Turn notifications on or off in Chrome</a></p>
                </Fragment>
            }
        </main>
    );
}

Main.propTypes = {
    props: PropTypes.object
};


export default Main;
