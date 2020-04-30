import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashService {
  constructor(private http: HttpClient) {}

  getSingle(id) {
    return this.http.get<List>(
      'http://localhost:3000/api/resumes/getResume/' + id
    );
  }

  getList() {
    const token: string = localStorage.getItem('token');
    // console.log(id);
    return this.http.get<Lists>('http://localhost:3000/api/resumes/users/', {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  addResume(resume) {
    const token: string = localStorage.getItem('token');
    return this.http.post<Lists>(
      'http://localhost:3000/api/resumes/add',
      resume,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  updateResume(resume) {
    const token: string = localStorage.getItem('token');
    return this.http.put<Lists>(
      'http://localhost:3000/api/resumes/resumeUpdate',
      resume,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}

export interface Lists {
  success: true;
  message: string;
  data: [Items];
}
export interface List {
  success: true;
  message: string;
  data: Items;
}
export interface Items {
  skills: [string];
  education: [string];
  _id: string;
  user_id: string;
  name: string;
  email: string;
  website: string;
  contact_no: string;
  profile_heading: string;
  profile_description: string;
}
