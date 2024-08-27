import { Component } from '@angular/core';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { QuotationListComponent } from './components/quotation-list/quotation-list.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [HeaderComponent, FooterComponent, QuotationListComponent],
})
export class AppComponent {
    title = 'client';
}
