// Core
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Libraries
import { Observable } from 'rxjs';

// Models
import { Comment, Post } from '../models';

// Environment
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = environment.baseUrl;

  public constructor(private http: HttpClient) {}

  public getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.baseUrl}/posts`);
  }

  public getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  public getPostComments(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/posts/${id}/comments`);
  }
}
