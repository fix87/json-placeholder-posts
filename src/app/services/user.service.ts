// Core
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Libraries
import { Observable } from 'rxjs';

// Models
import { Post, User } from '../models';

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

  public getUser(id: string): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/users/${id}`);
  }

  public getUserPosts(id: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/users/${id}/posts`);
  }
}
