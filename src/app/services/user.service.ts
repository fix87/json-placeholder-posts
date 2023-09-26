// Core
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Libraries
import { Observable, of } from 'rxjs';

// Models
import { User } from '../models';

// Environment
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseUrl;
  public constructor(private http: HttpClient) {}

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }

  public getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  public addUser(body: User): Observable<User> {
    return of<User>(body);
  }

  public editUser(body: User): Observable<User> {
    return of<User>(body);
  }

  public deleteUser(id: number): Observable<number> {
    return of(id);
  }
}
