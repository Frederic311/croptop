import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HarvestService {
  private apiUrl = 'http://localhost:8080/api/harvest';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  addHarvest(harvest: HarvestDTO): Observable<HarvestDTO> {
    return this.http.post<HarvestDTO>(`${this.apiUrl}/add-harvest`, harvest, { headers: this.getAuthHeaders() });
  }

  getHarvest(id: number): Observable<HarvestDTO> {
    return this.http.get<HarvestDTO>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() });
  }

  getHarvests(): Observable<HarvestDTO[]> {
    return this.http.get<HarvestDTO[]>(`${this.apiUrl}/all-harvests`, { headers: this.getAuthHeaders() });
  }

  getHarvestsByFarm(id: number): Observable<HarvestDTO[]> {
    return this.http.get<HarvestDTO[]>(`${this.apiUrl}/all-harvests/${id}`, { headers: this.getAuthHeaders() });
  }

  updateHarvest(id: number, harvest: HarvestDTO): Observable<HarvestDTO> {
    return this.http.put<HarvestDTO>(`${this.apiUrl}/update/${id}`, harvest, { headers: this.getAuthHeaders() });
  }

  deleteHarvest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers: this.getAuthHeaders() });
  }
}

export interface HarvestDTO {
  id: number;
  title: string;
  harvestDate: string;
  quantity: number;
  crop: {
    id: number;
    cropName: string;
    cropDescription: string;
  };
  farmId: number;
}
