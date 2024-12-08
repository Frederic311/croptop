import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Farm } from '../../models/farm.model';

const BASE_URL = 'http://localhost:8080/api/farm';

@Injectable({
  providedIn: 'root'
})
export class FarmService {

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const jwtToken = localStorage.getItem('token');
    if (jwtToken) {
      return new HttpHeaders().set('Authorization', 'Bearer ' + jwtToken);
    }
    return new HttpHeaders();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    if (error.status === 403) {
      console.error('Access denied. Please log in again.');
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  addFarm(farm: Farm): Observable<Farm> {
    return this.http.post<Farm>(`${BASE_URL}/add-farm`, farm, {
      headers: this.createAuthorizationHeader()
    }).pipe(catchError(this.handleError));
  }

  getAllFarms(): Observable<Farm[]> {
    return this.http.get<Farm[]>(`${BASE_URL}/all-farms`, {
      headers: this.createAuthorizationHeader()
    }).pipe(catchError(this.handleError));
  }

  getFarmsByUserId(userId: number): Observable<Farm[]> {
    return this.http.get<Farm[]>(`${BASE_URL}/all-farms/${userId}`, {
      headers: this.createAuthorizationHeader()
    }).pipe(catchError(this.handleError));
  }

  getFarmById(id: number): Observable<Farm> {
    return this.http.get<Farm>(`${BASE_URL}/${id}`, {
      headers: this.createAuthorizationHeader()
    }).pipe(catchError(this.handleError));
  }

  updateFarm(farm: Farm): Observable<Farm> {
    return this.http.put<Farm>(`${BASE_URL}/update/${farm.id}`, farm, {
      headers: this.createAuthorizationHeader()
    }).pipe(catchError(this.handleError));
  }

  deleteFarm(id: number): Observable<void> {
    return this.http.delete<void>(`${BASE_URL}/delete/${id}`, {
      headers: this.createAuthorizationHeader()
    }).pipe(catchError(this.handleError));
  }
}
