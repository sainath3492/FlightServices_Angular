import { Component, OnInit } from '@angular/core';
import {MatTableModule} from '@angular/material/table'
import { DataSource } from '@angular/cdk/table';
import { Router } from '@angular/router';

import { AirlineserviceService } from 'src/app/services/airlineservice.service';



@Component({
  selector: 'app-airlines',
  templateUrl: './airlines.component.html',
  styleUrls: ['./airlines.component.css']
})
export class AirlinesComponent implements OnInit {
 
  
  constructor(private airlineService: AirlineserviceService,private router:Router) { }
  airlines: any = [];


  ngOnInit(): void {
    this.getAllAirlines();
    
  }
  logoutClicked(){
    localStorage.removeItem("Sessionuser");
    localStorage.removeItem('access_token');
    this.router.navigateByUrl("/");
  }

  getAllAirlines() {
    console.log("dfds");
    this.airlineService.getAirlines().subscribe((res: any) => {
      this.airlines = res;
      console.log(res);

    });
  }
  blockAirline(id: number, Status:string) {
    console.log(id)
   
    this.airlineService.blockAirline(id,Status).subscribe({

      next:(Data) =>  this.getAllAirlines() ,
    error:(errdata)=> this.getAllAirlines()
  
    
    }
    

      );
      if(Status=="Active"){
        alert("UnBlocked Succesfully");
      }
      else{
        alert("Blocked Succesfully");
      }
    
  }
 

}
