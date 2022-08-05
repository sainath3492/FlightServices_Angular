import { Component, OnInit } from '@angular/core';
import { AirlineserviceService } from '../services/airlineservice.service';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-coupon-add',
  templateUrl: './coupon-add.component.html',
  styleUrls: ['./coupon-add.component.css']
})
export class CouponAddComponent implements OnInit {

  constructor(private airlineService:AirlineserviceService,private router:Router,private activeRoute:ActivatedRoute) { }
  data:any=[]
  submit(){
    this.airlineService.addNewDiscount(this.data).subscribe((res: any []) => {
     
     
      console.log(res);
     this.data=res;
     if(res!=undefined){
       alert("Coupon Added Succesfully");
       this.router.navigateByUrl('/Airlines');
     }
     else{
      alert("Error occured");
     }
     
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
