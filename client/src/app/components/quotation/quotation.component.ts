import { Component, Input } from '@angular/core';
import { Quotation } from 'src/app/types/Quotation';
import { DateFormatPipe } from 'src/app/pipes/date-format.pipe';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-quotation',
    templateUrl: './quotation.component.html',
    styleUrls: ['./quotation.component.scss'],
    imports: [CommonModule, DateFormatPipe],
    standalone: true,
})
export class QuotationComponent {
    @Input() quotation: Quotation | undefined;
    constructor() {}
}
