import { Quotation } from './Quotation';

export interface Quotations {
    quotations: Quotation[];
    totalQuotations: number;
    pageNumber: number;
    perPage: number;
    totalPages: number;
}
