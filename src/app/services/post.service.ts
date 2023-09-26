// Core
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Libraries
import { Observable, iif, of, tap } from 'rxjs';

// Models
import { Post } from '../models';

// Environment
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private baseUrl = environment.baseUrl;
  private posts: Post[] = [];

  public constructor(private http: HttpClient) {}

  public getPosts(): Observable<Post[]> {
    return iif(
      () => !!this.posts.length,
      of(this.posts),
      this.http
        .get<Post[]>(`${this.baseUrl}/posts`)
        .pipe(tap((posts) => (this.posts = posts)))
    );
  }

  public getPost(id: number): Observable<Post | undefined> {
    return iif(
      () => !!this.posts.length,
      of(this.posts.find((post) => post.id === id)),
      this.http.get<Post>(`${this.baseUrl}/posts/${id}`)
    );
  }

  public addPost(newPost: Post): Observable<Post> {
    const greaterStoredId = this.getLastInsertedId();
    this.posts = [
      ...this.posts,
      {
        ...newPost,
        id: greaterStoredId + 1,
      },
    ];
    return of<Post>(newPost);
  }

  public editPost(body: Post): Observable<Post> {
    const indexToEdit = this.posts.findIndex((post) => post.id === body.id);
    const newPosts = [...this.posts];
    newPosts[indexToEdit] = body;
    this.posts = [...newPosts];
    return of<Post>(body);
  }

  public deletePost(id: number): Observable<number> {
    const indexToEdit = this.posts.findIndex((post) => post.id === id);
    this.posts.splice(indexToEdit, 1);
    return of(id);
  }

  private getLastInsertedId(): number {
    let greaterId = 0;
    if (this.posts.length) {
      const storedIds = this.posts.map((post) => post.id);
      greaterId = Math.max(...storedIds);
    }
    return greaterId;
  }
}
