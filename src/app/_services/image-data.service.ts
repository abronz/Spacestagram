import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageDataService {

  constructor(private http: HttpClient) { }

  getImages(): Observable<any> {
    return this.http.get<any>(`${environment.nasaApodApi}&start_date=2022-01-02&end_date=2022-01-09`);  // extracts 8 static images from Jan-01-2022 to Jan-10-2022 NASA APOD
  }

  getImage(date): Observable<any> {
    return this.http.get<any>(`${environment.nasaApodApi}&date=${date}`);  // extracts 1 image from NASA Open API
  }
}
