import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import { durations, placeholders } from '../../constants';

import '../stylesheets/user-inputs.scss';


/**
 * Accepts user input to create a new reminder
 * @param props
 * @returns {*}
 * @constructor
 */
function UserInputs(props) {
    /**
     * Randomly select text to be used as placeholder text for the reminder input
     * @returns {string}
     */
    const getPlaceholderText = () => {
        const randomIndex = Math.floor(Math.random() * (placeholders.length));

        return placeholders[randomIndex];
    };

    const handleSelection = (event) => {
        props.updateReminderDelay(event.target.value);
    };

    const handleTextInput = (event) => {
        props.updateReminderText(event.target.value);
    };

    return (
        <Fragment>
            <input type="text" autoFocus required aria-label="reminder text" placeholder={getPlaceholderText()} value={props.reminderText} onChange={handleTextInput}/>

            <div className="select-delay">
                <div>
                    <select aria-label="available durations" value={props.reminderDelay} onChange={handleSelection}>
                        {durations.map(value => {
                            return (
                                <option key={value} value={value}>in {value} minute{value !== 1 ? 's' : ''}</option>
                            );
                        })}
                    </select>
                </div>
            </div>
        </Fragment>
    );
}

UserInputs.propTypes = {
    reminderDelay: PropTypes.any,
    reminderText: PropTypes.string,
    updateReminderDelay: PropTypes.func,
    updateReminderText: PropTypes.func
};


export default UserInputs;
