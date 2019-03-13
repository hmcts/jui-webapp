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
     * @param object
     */
    createMinimalErrorStack(errorStack) {

        delete errorStack.response;
        delete errorStack.request;
        delete errorStack.return;

        return errorStack;
    }
}
