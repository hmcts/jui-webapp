import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/* istanbul ignore next */
@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    public isLoading = new BehaviorSubject(false);
    constructor() { }
}
