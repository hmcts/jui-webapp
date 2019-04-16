import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorFormattingService {

    constructor() {
    }

    /**
     * createMinimalErrorStack
     *
     * We remove the request, response and return properties from the errorStack,
     * as we should not be displaying these in the view.
     *
     * Note that we use Object.assign to clone the object. Therefore we now have two objects, with
     * different memory references. Therefore if we delete a property on one object, it's only deleted
     * on that object, therefore we maintain the original error stack object
     * which can be used for debugging ( within the console ), and have meaningful tests.
     *
     * @param object
     */
    createMinimalErrorStack(errorStack) {

        const minimalErrorStack = Object.assign({}, errorStack);

        delete minimalErrorStack.response;
        delete minimalErrorStack.request;
        delete minimalErrorStack.return;

        return minimalErrorStack;
    }

    /**
     * createHumanReadableStack
     *
     * Create a human readable error stack, that can be displayed to the User, so that they
     * are able to take a screenshot of it, to help us diagnose their issue.
     *
     * @param minimalErrorStack
     * @returns {string}
     */
    createHumanReadableStack(minimalErrorStack) {

        const humanReadableErrors = [];

        for (const error in minimalErrorStack) {
            if (minimalErrorStack.hasOwnProperty(error)) {
                humanReadableErrors.push(minimalErrorStack[error]);
            }
        }

        return humanReadableErrors.join(', ');
    }
}
