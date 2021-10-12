import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
interface userType {
  username: string;
  password: string;
}
interface userToken {
  role: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private APIURL = 'http://localhost:3030/api/';
  private APISERVER = 'https://enigmatic-hamlet-45263.herokuapp.com/api/';
  private readonly authToken = 'authToken';
  private readonly adminAuthToken = 'adminAuthToken';
  loginUser(url: string, data: userType) {
    return this.http.post<any>(`${this.APIURL}${url}`, data).pipe(
      map((data) => {
        if (data.status) {
          if (data.role == 'admin') {
            this.setLocalStorage(this.adminAuthToken, data.token);
            this.setLocalStorage('_id', data._id);
          } else {
            this.setLocalStorage(this.authToken, data.token);
          }
          return data;
        } else {
          return data;
        }
      })
    );
  }

  logout() {
    localStorage.clear();
    return true;
  }

  setLocalStorage(item: string, token: string) {
    localStorage.setItem(item, token);
  }

  isUserLoggedIn() {
    return !!this.getJwtToken();
  }

  isAdminUserLoggedIn() {
    return !!this.getAdminJwtToken();
  }

  getJwtToken() {
    return localStorage.getItem(this.authToken);
  }
  getAdminJwtToken() {
    return localStorage.getItem(this.adminAuthToken);
  }

  getUserDetails() {
    if (this.isUserLoggedIn()) {
      const token = this.getAdminJwtToken();
      if (token) {
        console.log(jwt_decode(token));
      }
    }
  }
}
