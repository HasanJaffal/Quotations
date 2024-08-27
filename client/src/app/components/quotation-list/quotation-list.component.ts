import { Component, OnInit, ViewChild } from '@angular/core';
import { QuotationsService } from 'src/app/services/quotations.service';
import { GetQuotationsParams } from 'src/app/types/GetQuotationsParams';
import { Quotation } from 'src/app/types/Quotation';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { CommonModule } from '@angular/common';
import { QuotationComponent } from '../quotation/quotation.component';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-quotation-list',
    templateUrl: './quotation-list.component.html',
    styleUrls: ['./quotation-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        PaginatorModule,
        QuotationComponent,
        DropdownModule,
        InputTextModule,
        ButtonModule,
    ],
})
export class QuotationListComponent implements OnInit {
    quotations: Quotation[] = [];
    totalQuotations = 0;
    loading = false;
    errorMessage = '';
    selectedSortingOption = 'Default';

    sortingOptions = [
        { label: 'Default', value: 'Default' },
        { label: 'Creation Date (Ascending)', value: 'Creation Date (Ascending)' },
        { label: 'Creation Date (Descending)', value: 'Creation Date (Descending)' }
    ];

    rowsPerPageOptions = [2, 4, 6, 8, 10]; // Ensure this is an array of numbers

    fetchParams: GetQuotationsParams = {
        searchQuery: '',
        sortByCreationDate: false,
        isAscending: true,
        pageNumber: 1,
        pageSize: 10,
    };

    constructor(private quotationService: QuotationsService) {}

    @ViewChild('paginator') paginator: Paginator | undefined;

    ngOnInit(): void {
        this.fetchQuotations(this.fetchParams);
    }

    fetchQuotations(params: GetQuotationsParams): void {
        this.loading = true;

        this.quotationService.getQuotations(params).subscribe({
            next: (data) => {
                this.quotations = data.quotations;
                this.totalQuotations = data.totalQuotations;
                this.loading = false;
                console.log('Quotations fetched:', this.quotations);
            },
            error: (error) => {
                this.errorMessage = 'Failed to load quotations';
                this.quotations = [];
                this.resetPaginator();

                console.error('Error fetching quotations:', error);
                this.loading = false;
            },
        });
    }

    onPageChange(event: any) {
        this.fetchParams.pageNumber = event.page + 1;
        this.fetchParams.pageSize = event.rows; // Update pageSize based on user selection
        this.fetchQuotations(this.fetchParams);
    }

    onSortChange(event: any): void {
        switch (event.value) {
            case 'Default':
                this.fetchParams.sortByCreationDate = false;
                this.selectedSortingOption = 'Default';
                break;
            case 'Creation Date (Ascending)':
                this.fetchParams.sortByCreationDate = true;
                this.fetchParams.isAscending = true;
                this.selectedSortingOption = 'Creation Date (Ascending)';
                break;
            case 'Creation Date (Descending)':
                this.fetchParams.sortByCreationDate = true;
                this.fetchParams.isAscending = false;
                this.selectedSortingOption = 'Creation Date (Descending)';
                break;
        }

        this.resetPaginator();
        this.fetchQuotations(this.fetchParams);
    }

    resetPaginator() {
        if (this.paginator) {
            this.paginator.changePage(0);
            this.paginator.rows = this.fetchParams.pageSize; // Ensure paginator reflects current pageSize
        }
    }

    onSearch() {
        this.resetPaginator();
        this.fetchQuotations(this.fetchParams);
    }

    refresh() {
        this.errorMessage = '';
        this.resetPaginator();
        this.fetchParams = {
            searchQuery: '',
            sortByCreationDate: false,
            isAscending: true,
            pageNumber: 1,
            pageSize: 10,
        };
        this.fetchQuotations(this.fetchParams);
    }
}
