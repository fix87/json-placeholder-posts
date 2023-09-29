// Core
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  public get<T>(key: string): T {
    let values = {} as T;
    const storedComments = sessionStorage.getItem(key);
    if (storedComments) {
      values = JSON.parse(storedComments);
    }
    return values;
  }

  public set<T>(key: string, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }
}
