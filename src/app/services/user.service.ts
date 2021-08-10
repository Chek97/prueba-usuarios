import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class UserService {
  
  private USER_URL: string = "http://74.208.211.150:8081/person";
  
  constructor(private http: HttpClient) {
  }
  
  getUsers() {
    return this.http.get(`${this.USER_URL}/get-all-person`)    
  }

  addUser(user: User){
    return this.http.post(`${this.USER_URL}/insert-person`, user);
  }

  editUser(user: User){
    return this.http.post(`${this.USER_URL}/update-person`, user);
  }
  
  deleteUser(id: object){
    return this.http.post(`${this.USER_URL}/delete-person`, id);
  }
}

export interface User {
  first_name: string,
  last_name: string,
  age: string,
  identification_number: string,
  mail: string,
  avatar: string
}