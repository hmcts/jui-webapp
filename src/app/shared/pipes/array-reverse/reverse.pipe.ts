import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'reverse'
})
export class ReversePipe implements PipeTransform {

    transform(value) {
        if (!value) return;
        if (!(value instanceof Array)) return;
        return value.reverse();
    }
}
