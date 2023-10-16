// Core
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Libraries
import { Observable } from 'rxjs';

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

  public getComment(commentId: number): Observable<Comment> {
    return this.http.get<Comment>(`${this.baseUrl}/comments/${commentId}`);
  }
}
