import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Resident } from '../models/resident';

@Injectable({
  providedIn: 'root',
})

export class ResidentService {
  constructor(private httpClient: HttpClient) { }

  getAllResidents(): Observable<Resident[]> {
    return this.httpClient.get<Resident[]>(`${environment.backendHost}/residents`);
  }

  getResidentById(id: number): Observable<Resident> {
    return this.httpClient.get<Resident>(`${environment.backendHost}/residents/${id}`);
  }

  saveResident(resident: Resident): Observable<Resident> {
    return this.httpClient.post<Resident>(`${environment.backendHost}/residents`, resident);
  }

  updateResident(resident: Resident, id: number): Observable<Resident> {
    return this.httpClient.put<Resident>(`${environment.backendHost}/residents/${id}`, resident);
  }

  deleteResident(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.backendHost}/residents/${id}`);
  }
}
