// Core
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Libraries
import { Observable, iif, of, tap } from 'rxjs';

// Services
import { SessionStorageService } from './session-storage.service';

// Models
import { Post } from '../models';

// Environment
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = environment.baseUrl;

  public constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {}

  public getPosts(): Observable<Post[]> {
    const storedPosts = this.sessionStorage.get<Post[]>('posts');
    return iif(
      () => !!storedPosts.length,
      of(storedPosts),
      this.http
        .get<Post[]>(`${this.baseUrl}/posts`)
        .pipe(tap((posts) => this.sessionStorage.set<Post[]>('posts', posts)))
    );
  }

  public getPost(id: number): Observable<Post | undefined> {
    const storedPosts = this.sessionStorage.get<Post[]>('posts');
    return iif(
      () => !!storedPosts.length,
      of(storedPosts.find((post) => post.id === id)),
      this.http.get<Post>(`${this.baseUrl}/posts/${id}`)
    );
  }

  public addPost(newPost: Post): Observable<Post> {
    let storedPosts = this.sessionStorage.get<Post[]>('posts');
    const greaterStoredId = this.getLastInsertedId();
    storedPosts = [
      ...storedPosts,
      {
        ...newPost,
        id: greaterStoredId + 1,
      },
    ];
    this.sessionStorage.set<Post[]>('posts', storedPosts);
    return of<Post>(newPost);
  }

  public editPost(body: Post): Observable<Post> {
    const storedPosts = this.sessionStorage.get<Post[]>('posts');
    const indexToEdit = storedPosts.findIndex((post) => post.id === body.id);
    storedPosts[indexToEdit] = body;
    this.sessionStorage.set<Post[]>('posts', storedPosts);
    return of<Post>(body);
  }

  public deletePost(id: number): Observable<number> {
    const storedPosts = this.sessionStorage.get<Post[]>('posts');
    const indexToEdit = storedPosts.findIndex((post) => post.id === id);
    storedPosts.splice(indexToEdit, 1);
    this.sessionStorage.set<Post[]>('posts', storedPosts);
    return of(id);
  }

  private getLastInsertedId(): number {
    let greaterId = 0;
    const storedPosts = this.sessionStorage.get<Post[]>('posts');
    if (storedPosts) {
      const storedIds = storedPosts.map((post) => post.id);
      greaterId = Math.max(...storedIds);
    }
    return greaterId;
  }
}
