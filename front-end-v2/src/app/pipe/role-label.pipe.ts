import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'roleLabel',
    standalone: true,
})
export class RoleLabelPipe implements PipeTransform {

    transform(value: string | null | undefined): string {
        if (!value) return '';

        return value
            .replace(/[-_]+/g, ' ')
            .toLowerCase()
            .split(' ')
            .map(word =>
                word.charAt(0).toUpperCase() + word.slice(1)
            )
            .join(' ');
    }
}
