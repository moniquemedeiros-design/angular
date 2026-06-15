import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getVehicles() {
    return this.http.get(`${this.apiUrl}/vehicles`);
  }

  getVehicleData(id: string) {
    return this.http.get(`${this.apiUrl}/vehicleData?id=${id}`);
  }
}