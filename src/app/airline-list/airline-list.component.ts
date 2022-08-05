import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

import { AirlineserviceService } from 'src/app/services/airlineservice.service';

@Component({
  selector: 'app-airline-list',
  templateUrl: './airline-list.component.html',
  styleUrls: ['./airline-list.component.css']
})
export class AirlineListComponent implements OnInit {
  Flights: any = [];
  airlineId=this.activeRoute.snapshot.params["id"];
  constructor(private airlineService: AirlineserviceService,private router:Router,private activeRoute:ActivatedRoute) { }
  getAllFlightsByID() {
    console.log("dfds");
    this.airlineService.getFlights(this.airlineId).subscribe((res: any) => {
      this.Flights = res;
      console.log(res);

    });
  }
  ngOnInit(): void {
   this.getAllFlightsByID();
  }
  logoutClicked(){
    localStorage.removeItem("Sessionuser");
    localStorage.removeItem('access_token');
    this.router.navigateByUrl("/");
  }
  

}
