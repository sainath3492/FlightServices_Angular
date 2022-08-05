import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BookTicket } from '../interfaces/bookticket';
import { UserServiceService } from './user-service.service';

@Injectable({
  providedIn: 'root'
})
export class BookingServiceService {
  apiGateWayEndpoint =environment.apiGateWayURL;// "http://localhost:9000/";
  accessToken = this.userService.getToken() ?? "no_token";

  constructor(private httpClient: HttpClient, private userService: UserServiceService) {
  }

  httpHeader = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  authHeader = {

    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': "Bearer " + this.accessToken
    }),
  }

  bookTicket(data:any,flight_ID:string,airline_Name:string,from_Place:string,to_Place:string,
    total_Price:string, onward_Price:string,return_Price:string,total_BusinessSeats:number,
    total_NonBusinessSeats:Number,trip_Type:string,onward_JourneyDate:string,
    return_JourneyDate:any )
  {
    let  arrayObj: any = 
    {
      "pK_BookingID": 0,
      "flight_ID": flight_ID,
      "airline_Name": airline_Name,
      "from_Place": from_Place,
      "to_Place": to_Place,
      "total_Price": total_Price,
      "onward_Price": onward_Price,
      "return_Price": return_Price,
      "total_BusinessSeats": total_BusinessSeats,
      "total_NonBusinessSeats": total_NonBusinessSeats,
      "emailID": data.Email,
      "pnr": "",
      "trip_Type": trip_Type,
      "onward_JourneyDate": onward_JourneyDate,
      "return_JourneyDate": return_JourneyDate,
      "status": "Active"
    }
    return this.httpClient.post<any >(this.apiGateWayEndpoint + "api/v1.0/flight/booking",
      JSON.stringify(arrayObj), this.httpHeader)
      ;
  }

  bookReturnTicket(data:any,flight_ID:string,airline_Name:string,from_Place:string,to_Place:string,
    total_Price:string, onward_Price:string,return_Price:string,total_BusinessSeats:number,
    total_NonBusinessSeats:Number,trip_Type:string,onward_JourneyDate:string,
    return_JourneyDate:any )
  {
    let  arrayObj: any = 
    {
      "pK_BookingID": 0,
      "flight_ID": flight_ID,
      "airline_Name": airline_Name,
      "from_Place": to_Place,
      "to_Place": from_Place,
      "total_Price": total_Price,
      "onward_Price": onward_Price,
      "return_Price": return_Price,
      "total_BusinessSeats": total_BusinessSeats,
      "total_NonBusinessSeats": total_NonBusinessSeats,
      "emailID": data.Email,
      "pnr": "",
      "trip_Type": trip_Type,
      "onward_JourneyDate": onward_JourneyDate,
      "return_JourneyDate": return_JourneyDate,
      "status": "Active"
    }
    return this.httpClient.post<any >(this.apiGateWayEndpoint + "api/v1.0/flight/booking",
      JSON.stringify(arrayObj), this.httpHeader)
      ;
  }

  AddPassengers(data:any,pK_BookingID:string,pnr:string )
  {
    let  arrayObj: any = 
    {
      
        "pK_PassengerID": 0,
        "fK_BookingID":pK_BookingID,
        "pnr": pnr,
        "name": data.Name,
        "gender": data.Gender,
        "age":Number.parseInt(data.Age) ,
        "seats": data.Seat+data.Row,
        "class": data.Class,
        "meal": data.Meal
      
    }
   console.log(JSON.stringify(arrayObj))
    return this.httpClient.post<any>(this.apiGateWayEndpoint + "api/v1.0/flight/Passengers",
      JSON.stringify(arrayObj), this.httpHeader)
     ;
  }

  getBookingsByUserID(userId: number): Observable<any> {
    return this.httpClient.get<any>(this.apiGateWayEndpoint + "Aggregator/GetBookingByUser/" + userId, this.httpHeader)
     ;

  }


  getBookingsByPnr(pnr: any): Observable<any> {
    return this.httpClient.get<any[]>(this.apiGateWayEndpoint + "api/v1.0/flight/booking/ticket/" + pnr, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));



  }

  getPassengersByPnr(pnr: any): Observable<any> {
    return this.httpClient.get<any[]>(this.apiGateWayEndpoint + "api/v1.0/flight/booking/GetPassengerDetails/" + pnr, this.httpHeader)
      .pipe(retry(1), catchError(this.processError));



  }









  getCoupon(Code: string): Observable<any> {
    return this.httpClient.get<any[]>(this.apiGateWayEndpoint + "api/v1.0/flight/booking/GetDiscounts?Code=" + Code, this.httpHeader)
   
  }



  getBookingsByEmail(Email: string): Observable<any> {
    return this.httpClient.get<any[]>(this.apiGateWayEndpoint + "api/v1.0/flight/booking/history?UserEmail=" + Email, this.httpHeader)
   
  }

  








  cancelTicket(pnr: any) {
    return this.httpClient.delete(this.apiGateWayEndpoint + "api/v1.0/flight/booking/cancel/" + pnr, this.httpHeader)
      ;
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
