import { Component, OnInit } from '@angular/core';
import { LoginRequest } from '../models/request/loginRequest.model';
import { Router } from '@angular/router';
import { SharedService } from '../api/sharedservice';
import { Constant } from '../api/Constant';
import { LoginResponseModel } from '../models/response/loginResponse.model';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginRequest: LoginRequest = { empId: "", empPassword: "" };
 // loginResponse: LoginResponseModel;
  constructor(private router: Router, private sharedService: SharedService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    if (sessionStorage.getItem('token') != null && sessionStorage.getItem('token') != "") {
      this.router.navigate(['/dashboard']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  validateForm() {
    if (this.loginRequest.empId == null || this.loginRequest.empId == "") {
      alert("Fill EmpId");
      return false;
    }
    if (this.loginRequest.empPassword == null || this.loginRequest.empPassword == "") {
      alert("Password should not be empty");
      return false;
    }
    return true;
  }
  sumbitLoginForm() {
    if (this.validateForm()) {
      this.spinner.show();
      this.sharedService.authenticate(this.loginRequest)
        .subscribe((response) => {
      
          if (response.responseCode == Constant.responseCode) {
            console.log(response);
    
             sessionStorage.setItem("name", response.wrappedList[0].empName);
             sessionStorage.setItem("empId", response.wrappedList[0].empId);
             sessionStorage.setItem("role", response.wrappedList[0].role);
             sessionStorage.setItem("empRole", response.wrappedList[0].empRole);
             sessionStorage.setItem("contactNo", response.wrappedList[0].mobile);
             sessionStorage.setItem("emailId", response.wrappedList[0].emailId);
             sessionStorage.setItem("tenentId", response.wrappedList[0].tenentId);
             sessionStorage.setItem("company", response.wrappedList[0].company);
            sessionStorage.setItem("token", "1234");
            this.spinner.hide();
            this.router.navigate(['/dashboard']);

          }
          else {
            this.spinner.hide();
            alert("Invalid User");

          }
          //this.spinner.hide();
        },
          (error) => {
            this.spinner.hide();
            alert("Network Error");

          })
    }
  }
}
