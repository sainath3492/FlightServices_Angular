import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private userService: UserServiceService) { }
  data:any=[]
  ngOnInit(): void {
  }
submit(){
  console.log(this.data);
  let result: any=[];
  this.userService.Register(this.data).subscribe((res: any []) => {
    console.log(res);
   this.data=res;
   alert("User Added Succesfully");
   this.router.navigateByUrl("/");
});
 

}

}

