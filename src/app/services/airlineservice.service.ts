import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError, map } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Airline } from '../interfaces/Airline';
import { FlightInventory } from '../interfaces/FlightInventory';
import { UserServiceService } from './user-service.service';
import { Discount } from '../interfaces/Discount';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AirlineserviceService {
  apiGateWayEndpoint =environment.apiGateWayURL;
  
  accessToken = this.userService.getToken() ?? "no_token";
  constructor(private httpClient: HttpClient, private userService: UserServiceService) {
    console.log(this.apiGateWayEndpoint,this.accessToken);

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
  getAirlines(): Observable<Airline[]> {
   
    return this.httpClient.get<Airline[]>(this.apiGateWayEndpoint + "api/v1.0/flight/airline/Airline_List", this.httpHeader);
  }

  getFlights(ID:number): Observable<Airline[]> {
   
    return this.httpClient.get<Airline[]>(this.apiGateWayEndpoint + "api/v1.0/flight/airline/FlightListByID?id=" +ID, this.httpHeader);
  }

  // getFlightInventory(): Observable<FlightInventory[]> {
  //   return this.httpClient.get<FlightInventory[]>(this.apiGateWayEndpoint + "flight/GetFlightInventory", this.httpHeader)
  //     .pipe(retry(1), catchError(this.processError));
  // }

  // getAirlineByID(id: number): Observable<Airline> {
  //   return this.httpClient.get<Airline>(this.apiGateWayEndpoint + "airlines/GetAirlineById/" + id, this.httpHeader)
  //     .pipe(retry(1), catchError(this.processError));

  // }
  // getFlightInvemtoryById(id: number) {
  //   return this.httpClient.get<FlightInventory>(this.apiGateWayEndpoint + "airlines/GetFlightInventory/" + id, this.httpHeader)
  //     .pipe(retry(1), catchError(this.processError));
  // }

   searchFlights(fromplace: string, toPlace: string, departDate: Date , returnDate?: Date | null): Observable<FlightInventory[]> {
    
   
      console.log("inside service return");
       return this.httpClient.get<any[]>(this.apiGateWayEndpoint + "api/airlinemanage" + "?ToPlace=" + toPlace +"&FromPlace=" + fromplace +"&StartDate=" +departDate , this.httpHeader)
         .pipe(retry(1), catchError(this.processError));
     
   
   }

   addNewAirline(data: any,file:string): Observable<any> {
    let  arrayObj: any = 
    {
      "airlineID": 0,
      "airlineName": data.AirlineName,
      "logoName": data.AirlineName+".png",
      "Logoimage":file,
      "contact_Number": data.ContactNumber,
      "contact_Address": data.ContactAddress,
      "status": "Active"
    }
console.log(arrayObj);
     return this.httpClient.post<Airline>(this.apiGateWayEndpoint + "api/v1.0/flight/airline/register",
       JSON.stringify(arrayObj), this.authHeader)
       .pipe(retry(1), catchError(this.processError));
   }

 blockAirline(airlineId: number, Status:string) {
  let  arrayObj: any = 
  {
    airlineID: airlineId,
    
    statusValue:Status,
   
  }

   return this.httpClient.post(this.apiGateWayEndpoint + "api/v1.0/flight/airline/BlockAirline" ,  JSON.stringify(arrayObj), this.authHeader)
     ;
 }

   addNewFlightInventory(data: any,airlineId:number,AirlineName:string): Observable<any> {
    let  arrayObj: any = 
    {
      "airlineID": 0,
      "fK_AirlineID": airlineId,
      "from_Place": data.From,
      "to_Place": data.To,
      "start_Date": data.departDate,
      "end_Date": data.returnDate,
      "scheduled_Days": data.Days,
      "instrument": data.Instrument,
      "business_Seats": data.BusinessSeats,
      "non_Business_Seats": data.NonBusinessSeats,
      "ticket_Cost": data.Cost,
      "rows": data.Rows,
      "meal": data.Meal,
      "tripType": data.Triptype,
      "flightStatus": "Active",
      "Airline_Name":AirlineName
     
    }
     return this.httpClient.post<FlightInventory>(this.apiGateWayEndpoint + "api/v1.0/flight/airline/inventory/add", JSON.stringify(arrayObj), this.authHeader)
       .pipe(retry(1), catchError(this.processError));
   }

  // getDiscounts(): Observable<Discount[]> {
  //   debugger;
  //   return this.httpClient.get<Discount[]>(this.apiGateWayEndpoint + "Bookings/GetAllDiscounts", this.authHeader)
  //     .pipe(retry(1), catchError(this.processError));
  // }

   addNewDiscount(data: any): Observable<any> {
    let  arrayObj: any = 
    {
      "discoundID": 0,
      "code": data.CouponCode,
      "discount_Amount": data.CouponAmount
    }
     return this.httpClient.post<Discount>(this.apiGateWayEndpoint + "api/v1.0/flight/booking/AddDiscounts",
       JSON.stringify(arrayObj), this.httpHeader)
       .pipe(retry(1), catchError(this.processError));
   }

  // getDiscccountByID(id: number): Observable<Discount> {
  //   return this.httpClient.get<Discount>(this.apiGateWayEndpoint + "/Bookings/GetDiscountById/" + id, this.httpHeader)
  //     .pipe(retry(1), catchError(this.processError));

  // }


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
