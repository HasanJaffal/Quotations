export interface GetQuotationsParams {
    searchQuery?: string;
    sortByCreationDate: boolean;
    isAscending: boolean;
    pageNumber: number;
    pageSize: number;
}