import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http:HttpClient) { }

  addUser(data:any){
    return this.http.post("http://localhost:3000/student",data);
  }
  
  getUser(){
    return this.http.get("http://localhost:3000/student");
  }

  deleteUser(id: any) {
    return this.http.delete(`http://localhost:3000/student/${id}`);
  }
  updateUser(id: any, user: any) {
    return this.http.put(`http://localhost:3000/student/${id}`, user);
  }
}
