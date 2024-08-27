import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuotationListComponent } from './components/quotation-list/quotation-list.component';

const routes: Routes = [
    {
        path: '',
        component: QuotationListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
