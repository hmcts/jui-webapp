import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
@Injectable({providedIn: 'root'})
export class RotationService {
    private showRotation = new BehaviorSubject<boolean>(false);
    getShowRotationSub(): BehaviorSubject<boolean> {
        return this.showRotation;
    }
    toggleRotation() {
        this.showRotation.next(!this.showRotation.getValue());
    }
}
