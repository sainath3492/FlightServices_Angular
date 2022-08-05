import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { AirlineserviceService } from 'src/app/services/airlineservice.service';
import { BookingServiceService } from '../services/booking-service.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit {
  listdata:any;
  PassengerData:any;
  TotalCost:number=0;
  data:any=[]
  pnr=this.activeRoute.snapshot.params["id"];
  constructor(private fb: FormBuilder, private BookingService:BookingServiceService,private router:Router,private activeRoute:ActivatedRoute) {

    this.listdata=[];
    this.PassengerData=[];
   }

  ngOnInit(): void {
    this.GetBookingsByPNR();
    this.GetPassengersByPNR();
    
  }

  GetBookingsByPNR(){
    console.log(this.pnr);
    this.BookingService.getBookingsByPnr(this.pnr).subscribe((res: any) => {
      this.data=res;
      this.listdata=res;
         console.log("data:",this.listdata)
         console.log(this.listdata[0].airline_Name)
       
     
     
  });
}
public openPDF(): void {
  console.log("ticket print")
  let DATA: any = document.getElementById('htmlData');
  html2canvas(DATA).then((canvas) => {
    console.log(canvas.width)
    let fileWidth = 208;
    let fileHeight = (canvas.height * fileWidth) / canvas.width;
    const FILEURI = canvas.toDataURL('image/png');
    let PDF = new jsPDF('p', 'mm', 'a4');
    let position = 0;
    PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    PDF.save('Ticket.pdf');
  });
}
  GetPassengersByPNR(){
    console.log("Passenger data:",this.pnr);
    this.BookingService.getPassengersByPnr(this.pnr).subscribe((response: any) => {
      
      this.PassengerData=response;
         console.log("Passenger data:",this.PassengerData)
     
       
     
     
  });


    
  }
  logoutClicked(){
    localStorage.removeItem("Sessionuser");
    localStorage.removeItem('access_token');
    this.router.navigateByUrl("/");
  }
}
