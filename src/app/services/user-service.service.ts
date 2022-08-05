import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError, map } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  apiGateWayEndpoint =environment.apiGateWayURL;// "http://localhost:9000/";
  constructor(private httpClient: HttpClient) {

  }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),

  };

  login(username: string, password: string): Observable<any> {
   
    
   let  arrayObj: any = 
      {
        userName: username,
        
        password:password,
       
      }

    let header = 
   new HttpHeaders({   
      'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',         
    });


console.log(JSON.stringify(arrayObj));
    // header.set('Content-Type', 'application/json');
    // header.set('Access-Control-Allow-Origin', '*');
    return this.httpClient.post<any>(this.apiGateWayEndpoint + "api/v1.0/flight/login",  JSON.stringify(arrayObj), this.httpHeader);
   

  }
  Register(data:any): Observable<any> {
   
    
    let  arrayObj: any = 
    {
      "userID": 0,
      "userName": data.UserID,
      "password": data.Password,
      "name": data.UserName,
      "role": "user",
      "email":data.Email,
      "passwordHash": "",
      "passwordSalt": ""
    }
 
     let header = 
    new HttpHeaders({   
       'Content-Type': 'application/json',
                 'Access-Control-Allow-Origin': '*',         
     });
 
 
 console.log(JSON.stringify(arrayObj));
     // header.set('Content-Type', 'application/json');
     // header.set('Access-Control-Allow-Origin', '*');
     return this.httpClient.post<any>(this.apiGateWayEndpoint + "api/v1.0/flight/login/register",  JSON.stringify(arrayObj), this.httpHeader);
    
 
   }
  getToken() {
    // console.log("getToken");
    // return "eyJhbGciOiJodHRwOi8vd3d3LnczLm9yZy8yMDAxLzA0L3htbGRzaWctbW9yZSNobWFjLXNoYTUxMiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiU2FpMzQiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsImV4cCI6MTY1OTI0NDM2MH0.VizeZ9lAYlyQZj1bqUAPwBZxgWpVAVo9SYP8sr5V-ZIB9nt4ZIxarTZ887zxBLmyQVqVacpjrlQnhaT9TDVw7A";
    return localStorage.getItem('access_token');
  }


  getCurrentUser():any{
    // debugger;
    // let user:any= localStorage.getItem('Sessionuser');
    let user=localStorage.getItem('Sessionuser');
console.log("getCurrentUser");
    return JSON.parse(user|| '{}');
  }

  getRole():String{
    let user=JSON.parse(localStorage.getItem('Sessionuser')||'{}');
    return user.role;
  }
  

  

  processError(err: any) {

    let message = '';
    if (err.error instanceof ErrorEvent) {
      message = err.error.message;
    } else {
      message = `Error Code: ${err.status}\nMessage: ${err.message}`;
    }
    console.log(message);
    alert(message);
    return throwError(() => {
      message;
    });
  }
}
