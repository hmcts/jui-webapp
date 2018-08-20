import {
    Pipe,
    PipeTransform
} from '@angular/core';
import {isUpperCase} from 'tslint/lib/utils';
@Pipe({
    name: 'sentencecase'
})
export class SentenceCasePipe implements PipeTransform {
    transform(value: string): any {
        if (!value) { return value; }

        return this.toUpper(value) + this.toLower(value.substr(1));
    }

    private toLower(value: string) {
        return value.split(' ').map(function(wrd) {
                return (wrd.length === 1 && isUpperCase(wrd)) ?  wrd : wrd.substring(0, 1).toLowerCase() + wrd.substr(1);
            }).join(' ');
    }

    private toUpper(value: string) {
        return value.substring(0, 1).toUpperCase();
    }
}
