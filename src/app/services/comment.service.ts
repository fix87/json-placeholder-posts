// Core
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Libraries
import { Observable, iif, of, tap } from 'rxjs';

// Services
import { SessionStorageService } from './session-storage.service';

// Models
import { Comment } from '../models';

// Environment
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private baseUrl = environment.baseUrl;

  public constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {}

  public getComments(): Observable<Comment[]> {
    const storedComments = this.sessionStorage.get<Comment[]>('comments');
    return iif(
      () => !!storedComments.length,
      of(storedComments),
      this.http
        .get<Comment[]>(`${this.baseUrl}/comments`)
        .pipe(
          tap((comments) =>
            this.sessionStorage.set<Comment[]>('comments', comments)
          )
        )
    );
  }

  public getComment(commentId: number): Observable<Comment | undefined> {
    const storedComments = this.sessionStorage.get<Comment[]>('comments');
    return iif(
      () => !!storedComments.length,
      of(storedComments.find((comment) => comment.id === commentId)),
      this.http.get<Comment>(`${this.baseUrl}/comments/${commentId}`)
    );
  }

  public addComment(newComment: Comment): Observable<Comment> {
    let storedComments = this.sessionStorage.get<Comment[]>('comments');
    const greaterStoredId = this.getLastInsertedId();
    storedComments = [
      ...storedComments,
      {
        ...newComment,
        id: greaterStoredId + 1,
      },
    ];
    this.sessionStorage.set<Comment[]>('comments', storedComments);
    return of<Comment>(newComment);
  }

  public editComment(body: Comment): Observable<Comment> {
    const storedComments = this.sessionStorage.get<Comment[]>('comments');
    const indexToEdit = storedComments.findIndex(
      (comment) => comment.id === body.id
    );
    storedComments[indexToEdit] = body;
    this.sessionStorage.set<Comment[]>('comments', storedComments);
    return of<Comment>(body);
  }

  public deleteComment(commentId: number): Observable<number> {
    const storedComments = this.sessionStorage.get<Comment[]>('comments');
    const indexToEdit = storedComments.findIndex(
      (comment) => comment.id === commentId
    );
    storedComments.splice(indexToEdit, 1);
    this.sessionStorage.set<Comment[]>('comments', storedComments);
    return of(commentId);
  }

  public getPostComments(postId: number): Observable<Comment[]> {
    const storedComments = this.sessionStorage.get<Comment[]>('comments');
    return iif(
      () => !!storedComments.length,
      of(storedComments.filter((comment) => comment.postId === postId)),
      this.http.get<Comment[]>(`${this.baseUrl}/post/${postId}/comments`)
    );
  }

  private getLastInsertedId(): number {
    let greaterId = 0;
    const storedComments = this.sessionStorage.get<Comment[]>('comments');
    if (storedComments) {
      const storedIds = storedComments.map((comment) => comment.id);
      greaterId = Math.max(...storedIds);
    }
    return greaterId;
  }
}
