// Core
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Libraries
import { Observable, of } from 'rxjs';

// Models
import { Comment } from '../models';

// Environment
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseUrl = environment.baseUrl;
  public constructor(private http: HttpClient) {}

  public getComments(): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.baseUrl}/comments`);
  }

  public getComment(id: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.baseUrl}/comments/${id}`);
  }

  public addComment(body: Comment): Observable<Comment> {
    return of<Comment>(body);
  }

  public editComment(body: Comment): Observable<Comment> {
    return of<Comment>(body);
  }

  public deleteComment(id: number): Observable<number> {
    return of(id);
  }
}
