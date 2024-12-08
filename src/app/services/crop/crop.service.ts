import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CropService {
  baseUrl: string = "http://localhost:8080/api/crop/"

  token: any = localStorage.getItem('token')

  user: any


  private createAuthorizationHeader(token: string): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  constructor(private http:HttpClient) { }

  getCrop(id: number): Observable<any>{
    const headers = this.createAuthorizationHeader(this.token);
    return this.http.get(this.baseUrl + id, {headers})
  }

  addCrop( CropDTO: {id: number,  cropName: String ,  cropDescription: String ,  farm_id: number  }): Observable<any>{
    const headers = this.createAuthorizationHeader(this.token);
    return this.http.post(this.baseUrl + "add-crop", CropDTO, {headers})
  }

  getCropsByFarmId(id: number): Observable<any>{
    const headers = this.createAuthorizationHeader(this.token);
    return this.http.get(this.baseUrl + "all-crops/" + id, {headers})
  }

  updateCrop(id:number, CropDTO: {id: number,  cropName: String ,  cropDescription: String ,  farm_id: number  }): Observable<any>{
    const headers = this.createAuthorizationHeader(this.token);
    return this.http.put(this.baseUrl + "update/" + id, CropDTO, {headers})
  }

  deleteCrop(id:number): Observable<any>{
    const headers = this.createAuthorizationHeader(this.token);
    return this.http.delete(this.baseUrl + "delete/" + id, {headers})
  }

  getAllFarms(): Observable<any> {
    const headers = this.createAuthorizationHeader(this.token);
    return this.getUserFromToken().pipe(
      switchMap(response => {
        this.user = response; // Assign the user data
        if (!this.user || !this.user.id) {
          throw new Error("User ID is not available");
        }
        return this.http.get(`http://localhost:8080/api/farm/all-farms/${this.user.id}`, { headers });
      })
    );
  }
  

  getUserFromToken(): Observable<any>{
    const headers = this.createAuthorizationHeader(this.token);
    return this.http.get("http://localhost:8080/api/auth?token=" + localStorage.getItem("token"), {headers})
    
  }
}
