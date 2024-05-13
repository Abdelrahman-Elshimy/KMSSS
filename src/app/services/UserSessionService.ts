import { Injectable } from '@angular/core';
import { EncryptionService } from './EncryptionService';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  private user: any;
  private userSubject: Subject<any> = new Subject<any>();

  constructor(private encryptionService: EncryptionService) {
    const encryptedUser = sessionStorage.getItem('user');
    if (encryptedUser) {
      this.user = this.encryptionService.decrypt(encryptedUser);
    }
  }

  setUser(user: any) {
    const encryptedUser = this.encryptionService.encrypt(JSON.stringify(user));
    sessionStorage.setItem('user', encryptedUser);
    this.user = user;
    this.userSubject.next(user); // Notify subscribers
  }

  getUser(): any {
    return this.user;
  }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  logout() {
    sessionStorage.removeItem('user');
    this.user = undefined;
    this.userSubject.next(undefined); // Notify subscribers
  }

  getUserObservable(): Observable<any> {
    return this.userSubject.asObservable();
  }
}
