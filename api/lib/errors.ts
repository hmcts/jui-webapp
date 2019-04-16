/**
 * We use the following error codes, to display the error that has happened to the User.
 *
 * We should then be able to track down the error within our logs, to diagnois the issue.
 *
 * The errors being sent here, flow through the errorStack. It would of been better to throw native Javascript
 * Error's, and bubble these up to the UI, but due to where we are in the project timescales, it's too large a change
 * to now place this in. Therefore leveraging the errorStack to pass these messages through to the UI.
 *
 * The User will take a snapshot of the human status code, along with an associated timestamp, we will
 * then be able to go into the logs, and see the error status code.
 *
 * @type {string}
 */

export const ERROR_UNABLE_TO_GET_CASES = {

        humanStatusCode: 'ER_CASES',
}

/**
 * There has been an error getting cases for a jurisdiction, the jurisdiction is placed
 * after the second underscore and can be seen in the error stack, sent back to the browser.
 */
export const ERROR_UNABLE_TO_GET_CASES_FOR_JURISDICTION = {

    humanStatusCode: 'ER_CASES_JUR_',
}

/**
 * This seems to fail silently, and is not bubbled up to the User.
 *
 * As the User is still able to interact with their case. They still see
 * a Case List, but that Case List is seems to not be filtered by Hearing
 */
export const ERROR_UNABLE_TO_GET_HEARING_BY_CASE = {

    humanStatusCode: 'ER_CASES_HEARING',
}

export const ERROR_UNABLE_TO_APPEND_TO_COR = {

    humanStatusCode: 'ER_CASES_APPEND_COR',
}

/**
 * Question Round Error Codes
 */
export const ERROR_UNABLE_TO_APPEND_QRS = {

    humanStatusCode: 'ER_CASES_APPEND_QRS',
}

export const ERROR_UNABLE_TO_APPEND_QRS_HEARING = {

    humanStatusCode: 'ER_CASES_APPEND_QRS_HEARING',
}

export const ERROR_UNABLE_TO_APPEND_QRS_ROUNDS = {

    humanStatusCode: 'ER_CASES_APPEND_QRS_ROUNDS',
}
