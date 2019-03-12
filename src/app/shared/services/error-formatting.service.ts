import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ErrorFormattingService {

    constructor() {
    }

    /**
     * removeRequestAndResponse
     *
     * We remove the request and response properties from an object,
     * as we should not be displaying these in the view.
     *
     * @param object
     */
    removeRequestAndResponse(object) {
        delete object.response;
        delete object.request;

        return object;
    }
}
