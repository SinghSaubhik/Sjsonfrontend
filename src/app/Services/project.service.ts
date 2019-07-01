import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  url = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  createAPI(jsonbody) {
    return this.http.post('/createapi', jsonbody);
  }

  login(username, password) {
    const body = {
      email: username,
      password
    };

    return this.http.post('/user/login', body);
  }

  signUp(email, username, password) {
    const body = {
      email,
      username,
      password
    };

    return this.http.post('/user/signup', body);
  }
}
