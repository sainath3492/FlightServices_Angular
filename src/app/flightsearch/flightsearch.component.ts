import { Component, OnInit } from '@angular/core';
import { BookTicket } from 'src/app/interfaces/bookticket';
import { FlightInventory } from 'src/app/interfaces/FlightInventory';
import { Router,ActivatedRoute } from '@angular/router';

import { AirlineserviceService } from 'src/app/services/airlineservice.service';

@Component({
  selector: 'app-flightsearch',
  templateUrl: './flightsearch.component.html',
  styleUrls: ['./flightsearch.component.css']
})
export class FlightsearchComponent implements OnInit {
  selectedFlightIndexOneWay = -1;
  selectedFlightIndexTwoWay = -1;
  flightsOneWay: any = [];
  flightsRoundTrip: any = [];
  isOneWay: boolean = true;
  triptype:string="oneway"
  oneWayTicket: BookTicket = new BookTicket();
  twowayTicket: BookTicket =new BookTicket();
  x:boolean=false;
  headers=["Flight ID","Airline","From","To","TicketCost","Date",""];

  rows:any=[
  ];

  fromPlace: string = "";
  toPlace: string = "";
  departDate: Date = new Date();
  returnDate: Date = new Date();
  constructor(private router: Router, private airlineSevice: AirlineserviceService,private activeRoute:ActivatedRoute) { }
  data:any=[];
  rounddata:any=[];
  airlineId=this.activeRoute.snapshot.params["id"];
  
  submit(){
    console.log(this.data);
  }
  radionButtonClicked(e: any) {

    let journeyType = e.target.value;
    if (journeyType == "round") {
      this.isOneWay = false;
      this.triptype="round"
      return;
    }
    this.isOneWay = true;
    this.triptype="oneway"
  }

  searchFlights() {
 console.log("searchFlights")
   
    console.log("oneway:",this.data.departDate)
    this.airlineSevice.searchFlights(this.data.fromPlace, this.data.toPlace, this.data.departDate, this.returnDate).subscribe((res: any) => {
      this.data = res;
     
      this.x=true;
      console.log(res);
    });
if( this.triptype=="round"){
this.SearchRoundFlight()
}
  


  }

  SearchRoundFlight(){
   
      console.log("round:",this.returnDate)
      let fromPlace = this.data.fromPlace;
      let toPlace = this.data.toPlace;

    
     
       this.airlineSevice.searchFlights(toPlace, fromPlace, this.data.returnDate).subscribe((resp: any) => {
     
        this.rounddata = resp; 
        console.log(resp);
        this.x=true;
       
    });

    
  }
  ngOnInit(): void {
  }
  logoutClicked(){
    localStorage.removeItem("Sessionuser");
    localStorage.removeItem('access_token');
    this.router.navigateByUrl("/");
  }
}
