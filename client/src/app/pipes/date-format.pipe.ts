import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateFormat',
    standalone: true,
})
export class DateFormatPipe implements PipeTransform {
    transform(value: string | Date | undefined): string {
        if (!value) return '';

        const date = new Date(value);
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);

        return `${year}-${month}-${day}`;
    }
}
