import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class ObjectService {

    /**
     * Nested Property Exists
     *
     * Checks if a nested property exists on an object.
     *
     * TODO: Should be part of seperate object npm repo, usable by both PUI and JUI.
     *
     * Ref: https://stackoverflow.com/questions/2631001/test-for-existence-of-nested-javascript-object-key
     *
     * @see unit tests.
     * @param object
     * @returns {boolean}
     */
    nestedPropertyExists(object) {

        const args = Array.prototype.slice.call(arguments, 1);

        for (let i = 0; i < args.length; i++) {
            if (!object || !object.hasOwnProperty(args[i])) {
                return false;
            }
            object = object[args[i]];
        }
        return true;
    }
}
