import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Movie } from '../model/movie';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  private baseUrl = environment.api;  

  private key = environment.apiKey; 
  

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }
  
  getAllMovies(page: number): Observable<any[]> {

    return this.http.get<any[]>(`${this.baseUrl}/trending/movie/week${this.key}&page=${page}`)
      .pipe(
        delay(1000),
        tap(_ => console.log('fetched trending')),
      );
  }

  // Returns list of trending movies 20/page - 1000 pages
  getAllUpcoming(page: number): Observable<Movie[]> {
    console.log(`getTrending page: ${page}`);
    return this.http.get<Movie[]>(`${this.baseUrl}/movie/upcoming${this.key}&page=${page}`)
      .pipe(
        delay(1000),
        tap(_ => console.log('fetched trending')),
      );
  }

  // Returns list of popular movies 20/page - 500 pages
  getAllPopular(page: number): Observable<Movie[]> {
    console.log(`getPopular page: ${page}`);

    return this.http.get<Movie[]>(`${this.baseUrl}/movie/popular${this.key}&page=${page}`)
      .pipe(
        delay(1000),
        tap(_ => console.log('fetched popular')),
      );
  }

  
 
}
