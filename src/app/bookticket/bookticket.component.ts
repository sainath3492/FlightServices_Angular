import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';

import { AirlineserviceService } from 'src/app/services/airlineservice.service';
import { BookingServiceService } from '../services/booking-service.service';

@Component({
  selector: 'app-bookticket',
  templateUrl: './bookticket.component.html',
  styleUrls: ['./bookticket.component.css']
})
export class BookticketComponent implements OnInit {
  airlineid=this.activeRoute.snapshot.params["flightid"];
  FromPlace=this.activeRoute.snapshot.params["from"];
  onward_JourneyDate = this.activeRoute.snapshot.params["onward_JourneyDate"];
  toplace = this.activeRoute.snapshot.params["to"];
  onward_Price=this.activeRoute.snapshot.params["onward_Price"];
  //onward_Price=this.activeRoute.snapshot.params["onward_Price"];
  triptype=this.activeRoute.snapshot.params["triptype"];
  airline_Name=this.activeRoute.snapshot.params["airline_Name"];
  data:any=[]
  listdata:any;
  Coupondata:any;
  Ticketform:FormGroup;
  TotalCost:number=0;
  CouponCost:number=0;
  businessseats:number=0;
  nonbusinessseats:number=0;
  pnrid:string="";
  fk_bookingid:string="";
  Class:string="";
  constructor(private fb: FormBuilder, private BookingService:BookingServiceService,private router:Router,private activeRoute:ActivatedRoute) { 
    this.listdata=[];
    this.Coupondata=[];
    this.Ticketform= this.fb.group({
      Name:['',Validators.required],
      Age:['',Validators.required],
      Gender:['',Validators.required],
      Row:['',Validators.required],
      Seat:['',Validators.required],
      Class:['',Validators.required],
      Meal:['',Validators.required],

    })
  }

  Classchange(e: any){
    let ClassType = e.target.value;
    console.log(ClassType);
    this.Class =ClassType
  }
  public Additem() : void{
this.listdata.push(this.Ticketform.value);
this.Ticketform.reset();
this.TotalCost =Number.parseInt(this.onward_Price) + (this.TotalCost)
console.log(this.Class);

if(this.Class=="Business"){

this.businessseats=this.businessseats+1;
}
if(this.Class=="NonBusiness"){

  this.nonbusinessseats=this.nonbusinessseats+1;
  }

  console.log(this.businessseats,this.nonbusinessseats)


  }
 
  logoutClicked(){
    localStorage.removeItem("Sessionuser");
    localStorage.removeItem('access_token');
    this.router.navigateByUrl("/");
  }
  Applycoupon(){

    console.log(this.data);
    let code =this.data.Coupon;
    console.log(code);
     this.BookingService.getCoupon(code).subscribe((res: any) => {
      
       this.Coupondata=res;

      

       console.log("amount: ",this.Coupondata[0].discount_Amount);
        this.CouponCost=  this.CouponCost +Number.parseInt(this.Coupondata[0].discount_Amount)
        
       this.TotalCost = this.TotalCost-Number.parseInt(this.Coupondata[0].discount_Amount)
 
 
   });
  }

  remove(element:any){
this.listdata.forEach((value:any,index:any) => {
  if(value==element){
  this.listdata.splice(index,1);
  this.TotalCost = (this.TotalCost) -Number.parseInt(this.onward_Price)  +this.CouponCost;
 console.log(element.Class);
 if(element.Class=="Business"){

  this.businessseats=this.businessseats-1;
  }
  if(element.Class=="NonBusiness"){
  
    this.nonbusinessseats=this.nonbusinessseats-1;
    }

    console.log(this.businessseats,this.nonbusinessseats);
  }
});
  }
  submit(){
    if( this.listdata.length>0){

   
   console.log(this.FromPlace,this.toplace)
    this.BookingService.bookTicket(this.data,this.airlineid,this.airline_Name,this.FromPlace,this.toplace,this.TotalCost.toString()
      ,this.TotalCost.toString(),"",this.businessseats,this.nonbusinessseats,this.triptype,this.onward_JourneyDate
      ,null).subscribe((res: any ) => {
        this.data=res[0];
        
         console.log("data:",res.from_Place)
       this.pnrid=res[0].pnr;
       this.fk_bookingid=res[0].pK_BookingID;
     
     this.data=res;
     console.log("data:",this.data,this.pnrid,this.fk_bookingid)
     this.addpassengers(this.data,this.fk_bookingid,this.pnrid,this.triptype)
      });

     if(this.triptype=="round"){
      this.listdata=[];
      this.businessseats=0;
      this.nonbusinessseats=0;
      this.TotalCost=0;
      this.CouponCost=0;

     }
    }
    else{
      alert("Please Add Passengers")
    } 


  }

  submitReturn(){
   
    if( this.listdata.length>0){
    this.BookingService.bookReturnTicket(this.data,this.airlineid,this.airline_Name,this.toplace,this.FromPlace,this.TotalCost.toString()
      ,this.TotalCost.toString(),"",this.businessseats,this.nonbusinessseats,this.triptype,this.onward_JourneyDate
      ,null).subscribe((res: any ) => {
        this.data=res;
        
         console.log("data:",res.from_Place)
       this.pnrid=res.pnr;
       this.fk_bookingid=res.pK_BookingID;
     
     this.data=res;
     console.log("data:",this.data,this.pnrid,this.fk_bookingid)
     this.addpassengers(this.data,this.fk_bookingid,this.pnrid,this.triptype)
      });
    }
    else{
      alert("Please Add Passengers")
    } 
  }

  addpassengers(pass:any,pbr:string,id:string,type:string){
    for (let i = 0; i < this.listdata.length; i++) {
     console.log(pbr,id)
      this.BookingService.AddPassengers(this.listdata[i],pbr,id).subscribe((res: any []) => {
 
 
     
     
    
      });
    }
   
      alert("Ticket Booked Succesfully PNR:" +id);
   
     

    
  }
  ngOnInit(): void {
    console.log(this.airlineid,this.FromPlace,this.onward_JourneyDate,this.toplace,this.onward_Price,this.triptype)
  }

}
