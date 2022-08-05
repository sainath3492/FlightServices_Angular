import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { AirlineserviceService } from '../services/airlineservice.service';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit {
  airlineId=this.activeRoute.snapshot.params["id"];
  AirlineName=this.activeRoute.snapshot.params["AirlineName"];
 
  data:any=[]
  submit(){
    console.log(this.data);
    this.airlineService.addNewFlightInventory(this.data,this.airlineId,this.AirlineName).subscribe((res: any []) => {
     
     
      console.log(res);
     this.data=res;
     if(res!=undefined){
       alert("Flight Added Succesfully");
       this.router.navigateByUrl('/Airlines');
     }
     else{
      alert("Error occured");
     }
     
    
    
    
     
  });
  }

  constructor(private airlineService:AirlineserviceService,private router:Router,private activeRoute:ActivatedRoute) { }
  logoutClicked(){
    localStorage.removeItem("Sessionuser");
    localStorage.removeItem('access_token');
    this.router.navigateByUrl("/");
  }
  ngOnInit(): void {
    console.log(this.airlineId);
  }

}
