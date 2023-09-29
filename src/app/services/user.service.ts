// Core
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Libraries
import { Observable, iif, of, tap } from 'rxjs';

// Services
import { SessionStorageService } from './session-storage.service';

// Models
import { User } from '../models';

// Environment
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = environment.baseUrl;

  public constructor(
    private http: HttpClient,
    private sessionStorage: SessionStorageService
  ) {}

  public getUsers(): Observable<User[]> {
    const storedUsers = this.sessionStorage.get<User[]>('users');
    return iif(
      () => !!storedUsers.length,
      of(storedUsers),
      this.http
        .get<User[]>(`${this.baseUrl}/users`)
        .pipe(tap((users) => this.sessionStorage.set<User[]>('users', users)))
    );
  }

  public getUser(id: number): Observable<User | undefined> {
    const storedUsers = this.sessionStorage.get<User[]>('users');
    return iif(
      () => !!storedUsers.length,
      of(storedUsers.find((user) => user.id === id)),
      this.http.get<User>(`${this.baseUrl}/users/${id}`)
    );
  }

  public addUser(newUser: User): Observable<User> {
    let storedUsers = this.sessionStorage.get<User[]>('users');
    const greaterStoredId = this.getLastInsertedId();
    storedUsers = [
      ...storedUsers,
      {
        ...newUser,
        id: greaterStoredId + 1,
      },
    ];
    this.sessionStorage.set<User[]>('users', storedUsers);
    return of<User>(newUser);
  }

  public editUser(body: User): Observable<User> {
    const storedUsers = this.sessionStorage.get<User[]>('users');
    const indexToEdit = storedUsers.findIndex((user) => user.id === body.id);
    storedUsers[indexToEdit] = body;
    this.sessionStorage.set<User[]>('users', storedUsers);
    return of<User>(body);
  }

  public deleteUser(id: number): Observable<number> {
    const storedUsers = this.sessionStorage.get<User[]>('users');
    const indexToEdit = storedUsers.findIndex((user) => user.id === id);
    storedUsers.splice(indexToEdit, 1);
    this.sessionStorage.set<User[]>('users', storedUsers);
    return of(id);
  }

  private getLastInsertedId(): number {
    let greaterId = 0;
    const storedUsers = this.sessionStorage.get<User[]>('users');
    if (storedUsers) {
      const storedIds = storedUsers.map((user) => user.id);
      greaterId = Math.max(...storedIds);
    }
    return greaterId;
  }
}
