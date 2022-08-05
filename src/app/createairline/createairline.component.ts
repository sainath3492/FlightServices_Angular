import { Component, OnInit } from '@angular/core';
import { AirlineserviceService } from '../services/airlineservice.service';
import{HttpClient} from '@angular/common/http';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';
import { Observable, observable, Subscriber } from 'rxjs';
@Component({
  selector: 'app-createairline',
  templateUrl: './createairline.component.html',
  styleUrls: ['./createairline.component.css']
})
export class CreateairlineComponent implements OnInit {
  selectedfile:any;
  base64:string="";
 
  constructor(private airlineService:AirlineserviceService,private router:Router
    ,private activeRoute:ActivatedRoute,private http:HttpClient) { }
  data:any=[]
  
  submit(){
// let formdata = new FormData();
// formdata.set("name",this.data.AirlineName);
// formdata.set("file",this.selectedfile);

// this.selectedfile.move
// this.http.post('src/FileUpload',formdata).subscribe(

// (res=>{})
// );


    this.airlineService.addNewAirline(this.data,this.base64).subscribe((res: any []) => {
     
     
      console.log(res);
     this.data=res;
     if(res!=undefined){
       alert("Airline Added Succesfully");
       this.router.navigateByUrl('/Airlines');
     }
     else{
      alert("Error occured");
     }
     
    
     
     
  });
    console.log(this.data);
  }

  converttobase64(file:File){
    const observable = new Observable((subscriber:Subscriber<any>)=>{
      this.readfile(file,subscriber);
    })
observable.subscribe((d)=>{
  console.log("base64:",d);

this.base64=d;
  
})
  }

  readfile(file:File,subscriber:Subscriber<any>){

    const filereader = new FileReader();

    filereader.readAsDataURL(file);

    filereader.onload=()=>{
      subscriber.next(filereader.result);
      subscriber.complete();

    }

    filereader.onerror=()=>{
      subscriber.error();
      subscriber.complete();
    }

  }

  onFileSelected(event:any){
    this.selectedfile=<File>event.target.files[0];
    
    console.log(this.selectedfile);
    this.converttobase64(this.selectedfile);
  }

  logoutClicked(){
    localStorage.removeItem("Sessionuser");
    localStorage.removeItem('access_token');
    this.router.navigateByUrl("/");
  }
  

  ngOnInit(): void {
  }

}
