// Core
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Libraries
import { Observable, iif, of, tap } from 'rxjs';

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
    const storedComments = this.getCommentsFromSessionStorage();
    return iif(
      () => !!storedComments.length,
      of(storedComments),
      this.http
        .get<Comment[]>(`${this.baseUrl}/comments`)
        .pipe(tap((comments) => this.setCommentsToSessionStorage(comments)))
    );
  }

  public getComment(id: number): Observable<Comment | undefined> {
    const storedComments = this.getCommentsFromSessionStorage();
    return iif(
      () => !!storedComments.length,
      of(storedComments.find((comment) => comment.id === id)),
      this.http.get<Comment>(`${this.baseUrl}/comments/${id}`)
    );
  }

  public addComment(newComment: Comment): Observable<Comment> {
    let storedComments = this.getCommentsFromSessionStorage();
    const greaterStoredId = this.getLastInsertedId();
    storedComments = [
      ...storedComments,
      {
        ...newComment,
        id: greaterStoredId + 1,
      },
    ];
    this.setCommentsToSessionStorage(storedComments);
    return of<Comment>(newComment);
  }

  public editComment(body: Comment): Observable<Comment> {
    const storedComments = this.getCommentsFromSessionStorage();
    const indexToEdit = storedComments.findIndex(
      (comment) => comment.id === body.id
    );
    storedComments[indexToEdit] = body;
    this.setCommentsToSessionStorage(storedComments);
    return of<Comment>(body);
  }

  public deleteComment(id: number): Observable<number> {
    const storedComments = this.getCommentsFromSessionStorage();
    const indexToEdit = storedComments.findIndex(
      (comment) => comment.id === id
    );
    storedComments.splice(indexToEdit, 1);
    this.setCommentsToSessionStorage(storedComments);
    return of(id);
  }

  private getCommentsFromSessionStorage(): Comment[] {
    let comments: Comment[] = [];
    const storedComments = sessionStorage.getItem('comments');
    if (storedComments) {
      comments = JSON.parse(storedComments);
    }
    return comments;
  }

  private setCommentsToSessionStorage(comments: Comment[]): void {
    sessionStorage.setItem('comments', JSON.stringify(comments));
  }

  private getLastInsertedId(): number {
    let greaterId = 0;
    const storedComments = this.getCommentsFromSessionStorage();
    if (storedComments) {
      const storedIds = storedComments.map((comment) => comment.id);
      greaterId = Math.max(...storedIds);
    }
    return greaterId;
  }
}
