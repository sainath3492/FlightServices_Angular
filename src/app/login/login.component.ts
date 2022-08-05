import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = "";
  password = "";
  data:any=[];
  constructor(private router: Router, private userService: UserServiceService) { }
  login() {
    console.log(this.username, this.password);
    let result: any=[];
    this.userService.login(this.username, this.password).subscribe((res: any []) => {
     
     
      console.log(res);
     
    
     if (res != undefined) {
      this.data=res;
      let row= this.data[0];
            console.log(row.role);
            localStorage.setItem("Sessionuser", row.user);
            localStorage.setItem("access_token", row.token);
            localStorage.setItem("User_Email", row.email);
            console.log(row.email);
            this.navigateRouteByRole(row.role);
           
     
           }
           else{
             alert("Invalid Credentials")
           }
     
  });
    // this.userService.login(this.username, this.password).subscribe(
    //   (next: any) => {
       
    //     console.log("Success", next);
    //     console.log(next.role);
    //     if (next.role != undefined) {
    //       console.log(next.role);
    //       debugger;
    //       this.navigateRouteByRole(next.role);
    //      localStorage.setItem("Sessionuser", JSON.stringify(next.user));
    //       localStorage.setItem("access_token", next.token.access_token);
        
    //     }

    //   },
    //   // (err: any) => {
    //   //   console.log('Error: ', err.status);
    //   //   this.notificService.showError("Invalid user....", "Login Failed");
    //   // },
    //   () => { console.log("Completed..."); }
    // );

  }
  navigateRouteByRole(role: string) {

    if (role == "Admin")
      this.router.navigateByUrl("/Airlines");
    else if (role == "user")
      this.router.navigateByUrl("/SearckBook");
  }

  ngOnInit(): void {
  }

}
