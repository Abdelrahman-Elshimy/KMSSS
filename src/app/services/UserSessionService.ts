import { Injectable } from '@angular/core';
import { EncryptionService } from './EncryptionService';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  private user: any;

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
  }
}
