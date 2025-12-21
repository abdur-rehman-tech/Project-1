import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from '../../environment/environment';

export type PricingType = 'Free' | 'Paid' | 'Freemium';

export interface Tool {
  id: number;
  name: string;
  category: string;
  pricing: PricingType;
  website: string;
  description: string;
  popular: boolean;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  private baseUrl = environment.apiUrl + '/tools';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Tool[]> {
    return this.http
      .get<Tool[]>(this.baseUrl)
      .pipe(catchError(this.handleError));
  }

  getById(id: number): Observable<Tool> {
    return this.http
      .get<Tool>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  create(tool: Omit<Tool, 'id'>): Observable<Tool> {
    return this.http
      .post<Tool>(this.baseUrl, tool)
      .pipe(catchError(this.handleError));
  }

  update(id: number, tool: Omit<Tool, 'id'>): Observable<Tool> {
    return this.http
      .put<Tool>(`${this.baseUrl}/${id}`, tool)
      .pipe(catchError(this.handleError));
  }

  delete(id: number): Observable<void> {
    return this.http
      .delete<void>(`${this.baseUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('API Error:', error);
    return throwError(() => error);
  }
}
