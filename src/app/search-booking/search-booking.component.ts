import { Component, OnInit } from '@angular/core';
import { BookingServiceService } from 'src/app/services/booking-service.service';
import { Router,ActivatedRoute } from '@angular/router';
interface student {
  position:number;
  name:string;
  email:string;
  gender:string;
}
const ELEMENT_DATA: student[] = [
  {position: 1, name: 'Hydrogen', email: "sai@gmail.com", gender: 'H'},
  {position: 2, name: 'Helium', email: "sai@gmail.com", gender: 'He'},
  {position: 3, name: 'Lithium', email: "sai@gmail.com", gender: 'Li'},
  {position: 4, name: 'Beryllium', email: "sai@gmail.com", gender: 'Be'},

];
@Component({
  selector: 'app-search-booking',
  templateUrl: './search-booking.component.html',
  styleUrls: ['./search-booking.component.css']
})
export class SearchBookingComponent implements OnInit {
title='Tickets';

headers=['PNR', 'From', 'To', 'Journey Date', 'Price','Status'];

rows:any=[

  {
    "PNR":"1",
    "From":"Hyderabad",
    "To":"Chennai",
    "Trip Type":"Round"
  },
  {
    "PNR":"2",
    "From":"Mumbai",
    "To":"Chennai",
    "Trip Type":"Round"
  }
];

  x:boolean=false;
  email:any="";
  
  constructor(private bookingServie:BookingServiceService,private router:Router,private activeRoute:ActivatedRoute) {
    this.email=localStorage.getItem('User_Email')?.toString();
   }
  displayedColumns: string[] = ['PNR', 'From', 'To', 'Journey Date', 'Price','Status'];
  dataSource = ELEMENT_DATA;
  data:any=[]
  submit(){
    console.log(this.data);
    this.x=true;
    
  }

  GetBookingsByPNR(){
    console.log(this.data.PNR);
    this.bookingServie.getBookingsByPnr(this.data.PNR).subscribe((res: any) => {
     
      this.data = res; 
      console.log(res);
      this.x=true;
     
  });
    
  }

  CancelTicket(id:number,status:string){

    console.log(status)
    this.bookingServie.cancelTicket(id).subscribe({


      }
      );
      if(status=="Active"){
        alert("Cancelled Succesfully");
      }
      
      this.router.navigateByUrl("/SearckBook");
      this.x=false;
  }

  GetBookingsByEmail(){
    console.log(this.data.Email);
    this.bookingServie.getBookingsByEmail(this.data.Email).subscribe((res: any) => {
     
      this.data = res; 
      console.log(res);
      this.x=true;
     
  });
  }
 
  ngOnInit(): void {
   
    this.GetBookingsByEmailonload(this.email);
  }

  GetBookingsByEmailonload(email:any){
    console.log(email);
    this.bookingServie.getBookingsByEmail(email).subscribe((res: any) => {
     
      this.data = res; 
      console.log(res);
      this.x=true;
     
  });
  }
  logoutClicked(){
    localStorage.removeItem("Sessionuser");
    localStorage.removeItem('access_token');
    this.router.navigateByUrl("/");
  }
}
