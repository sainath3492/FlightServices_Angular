import { Component, OnInit } from '@angular/core';
import { BookTicket } from 'src/app/interfaces/bookticket';
import { FlightInventory } from 'src/app/interfaces/FlightInventory';
import { Router } from '@angular/router';

import { AirlineserviceService } from 'src/app/services/airlineservice.service';

@Component({
  selector: 'app-bookingticket',
  templateUrl: './bookingticket.component.html',
  styleUrls: ['./bookingticket.component.css']
})
export class BookingticketComponent implements OnInit {
  selectedFlightIndexOneWay = -1;
  selectedFlightIndexTwoWay = -1;
  flightsOneWay: any = [];
  flightsRoundTrip: any = [];
  isOneWay: boolean = true;
  oneWayTicket: BookTicket = new BookTicket();
  twowayTicket: BookTicket =new BookTicket();

  fromPlace: string = "";
  toPlace: string = "";
  departDate: Date = new Date();
  returnDate: Date = new Date();
  constructor(private router: Router, private airlineSevice: AirlineserviceService) {
    debugger;
    this.flightsOneWay = [];
    this.flightsRoundTrip=[];
    this.selectedFlightIndexTwoWay=-1;
    this.selectedFlightIndexOneWay=-1;
   }
  

  ngOnInit(): void {
  }

  addTicket(index: number, flight: FlightInventory, journeyType: string) {
   
    if (journeyType == "oneway") {
      this.selectedFlightIndexOneWay = index;
      this.oneWayTicket.flightInvID = flight.id;
      this.oneWayTicket.totalCost=flight.ticketCost;
      return;
    }
    this.selectedFlightIndexTwoWay = index;
    this.twowayTicket.flightInvID = flight.id;
    this.twowayTicket.totalCost=flight.ticketCost;

  }

  continueBookClicked() {

    //Todo prepare json for ticket
    if(!this.isOneWay)
    {
      this.router.navigate(['/add-passenger'], {
        state: {
          oneWayTicket: JSON.stringify(this.oneWayTicket),
          twoWayTicket:JSON.stringify(this.twowayTicket),
          isOneWay:true
        }
      });
      return;
    }
    this.router.navigate(['/add-passenger'], {
      state: {
        oneWayTicket: JSON.stringify(this.oneWayTicket),   
        isOneWay:this.isOneWay 
      }
    });

    // this.router.navigate(['/add-passenger'], {
    //   state: {
    //     frontEnd: JSON.stringify({ framwork: 'Angular', version: '9' }),
    //     site: 'edupala.com'
    //   }
    // });
  }

  searchFlights() {
 
    if (!this.isOneWay) {
      let fromPlace = this.toPlace;
      let toPlace = this.fromPlace;
     
       this.airlineSevice.searchFlights(fromPlace, toPlace, this.returnDate).subscribe((res: any) => {
      console.log(res);
        this.flightsRoundTrip = res; 
       
       
    });

    }
    //this.airlineSevice.searchFlights(this.fromPlace, this.toPlace, this.departDate, this.returnDate).subscribe((res: any) => {
     // this.flightsOneWay = res;
    //});

   


  }

  radionButtonClicked(e: any) {

    let journeyType = e.target.value;
    if (journeyType == "round") {
      this.isOneWay = false;
      return;
    }
    this.isOneWay = true;
  }
 

}
