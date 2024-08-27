import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetQuotationsParams } from '../types/GetQuotationsParams';
import { Quotations } from '../types/Quotations';

@Injectable({
    providedIn: 'root',
})
export class QuotationsService {
    private apiUrl = 'https://localhost:5000/api/Quotations';

    constructor(private http: HttpClient) {}

    getQuotations(params: GetQuotationsParams): Observable<Quotations> {
        let httpParams = new HttpParams()
            .set('sortByCreationDate', params.sortByCreationDate.toString())
            .set('isAscending', params.isAscending.toString())
            .set('pageNumber', params.pageNumber.toString())
            .set('pageSize', params.pageSize.toString());

        if (params.searchQuery) {
            httpParams = httpParams.set('searchQuery', params.searchQuery);
        }

        return this.http.get<Quotations>(this.apiUrl, { params: httpParams });
    }
}
