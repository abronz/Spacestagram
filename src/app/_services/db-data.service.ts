import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataBaseDataService {

  constructor(private http: HttpClient) { }

  getLikedImages(): Observable<any> {
    return this.http.get<any>(`${environment.dbApi}/image`);
  }

  likeImage(data): Observable<any> {
    return this.http.post<any>(`${environment.dbApi}/image-like`, data);
  }

  unlikeImage(date): Observable<any> {
    return this.http.post<any>(`${environment.dbApi}/image-unlike`, date);
  }

}
