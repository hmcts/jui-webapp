import { Injectable } from '@angular/core';

@Injectable()
export class EmLoggerService {

    private loggingClass: string;

    setClass(loggingClass: string) {
        this.loggingClass = loggingClass;
    }

    error(message) {
        this.buildLog('error-' + JSON.stringify(message));
    }

    info(message) {
        this.buildLog('info-' + JSON.stringify(message));
    }

    buildLog(message) {
        console.log(`${this.loggingClass}-${message}`);
    }
}
