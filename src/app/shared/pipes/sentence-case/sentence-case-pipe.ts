import {
    Pipe,
    PipeTransform
} from '@angular/core';
@Pipe({
    name: 'sentencecase'
})
export class SentenceCasePipe implements PipeTransform {
    transform(value: string): any {
        if (!value || value === '') return value;

        return this.toUpper(value) + this.toLower(value.substr(1));
    }

    private toLower(value: string) {
        // will match (D81), D81, A
        const regex = /^\(.*\)$|^[A-Z]\d+$|^[A-Z]$/g;
        return value.split(' ').map(function(wrd) {
                return wrd.match(regex) ? wrd : wrd.toLowerCase();
            }).join(' ');
    }

    private toUpper(value: string) {
        return value.substring(0, 1).toUpperCase();
    }
}
