// Core
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Libraries
import { Observable, of } from 'rxjs';

// Models
import { Post } from '../models';

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

  public getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/posts/${id}`);
  }

  public addPost(body: Post): Observable<Post> {
    return of<Post>(body);
  }

  public editPost(body: Post): Observable<Post> {
    return of<Post>(body);
  }

  public deletePost(id: number): Observable<number> {
    return of(id);
  }
}
