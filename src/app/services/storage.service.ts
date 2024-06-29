import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  addItemToCache(key : string, value : string) {
    localStorage.setItem(key,value);
  }

  fetchItemFromCache(key : string) : string {
    if(localStorage.getItem(key) !== null) {
      return localStorage.getItem(key) as string;
    } 
    return '';
  }

  removeItemFromCache(key : string) {
    localStorage.removeItem(key);
  }

  clearLocalStorage() {
    localStorage.clear();
  }
}
