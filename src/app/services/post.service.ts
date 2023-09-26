// Core
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Libraries
import { Observable, iif, of } from 'rxjs';

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
    const storedPosts = this.getPostsFromSessionStorage();
    return iif(
      () => !!storedPosts.length,
      of(storedPosts),
      this.http.get<Post[]>(`${this.baseUrl}/posts`)
    );
  }

  public getPost(id: number): Observable<Post | undefined> {
    const storedPosts = this.getPostsFromSessionStorage();
    return iif(
      () => !!storedPosts.length,
      of(storedPosts.find((post) => post.id === id)),
      this.http.get<Post>(`${this.baseUrl}/posts/${id}`)
    );
  }

  public addPost(newPost: Post): Observable<Post> {
    let storedPosts = this.getPostsFromSessionStorage();
    const greaterStoredId = this.getLastInsertedId();
    storedPosts = [
      ...storedPosts,
      {
        ...newPost,
        id: greaterStoredId + 1,
      },
    ];
    this.setPostsToSessionStorage(storedPosts);
    return of<Post>(newPost);
  }

  public editPost(body: Post): Observable<Post> {
    const storedPosts = this.getPostsFromSessionStorage();
    const indexToEdit = storedPosts.findIndex((post) => post.id === body.id);
    storedPosts[indexToEdit] = body;
    this.setPostsToSessionStorage(storedPosts);
    return of<Post>(body);
  }

  public deletePost(id: number): Observable<number> {
    const storedPosts = this.getPostsFromSessionStorage();
    const indexToEdit = storedPosts.findIndex((post) => post.id === id);
    storedPosts.splice(indexToEdit, 1);
    this.setPostsToSessionStorage(storedPosts);
    return of(id);
  }

  private getPostsFromSessionStorage(): Post[] {
    let posts: Post[] = [];
    const storedPosts = sessionStorage.getItem('posts');
    if (storedPosts) {
      posts = JSON.parse(storedPosts);
    }
    return posts;
  }

  private setPostsToSessionStorage(posts: Post[]): void {
    sessionStorage.setItem('posts', JSON.stringify(posts));
  }

  private getLastInsertedId(): number {
    let greaterId = 0;
    const storedPosts = this.getPostsFromSessionStorage();
    if (storedPosts) {
      const storedIds = storedPosts.map((post) => post.id);
      greaterId = Math.max(...storedIds);
    }
    return greaterId;
  }
}
