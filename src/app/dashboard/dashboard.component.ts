import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginResponseModel } from '../models/response/loginResponse.model';
import { SharedService } from '../api/sharedservice';
import { Constant } from '../api/Constant';
import * as $ from 'jquery';
import { NgxSpinnerService } from 'ngx-spinner';
declare var jQuery: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  tday = new Date();
  empId = sessionStorage.getItem("empId");
  empRole = sessionStorage.getItem("empRole");
  tenentId = sessionStorage.getItem("tenentId");
  empIcon = "";
  
  isSidebarVisible = true;
  // loginResponse = {};
  loginResponse = {empName:"",mobile:"",empRole:"",emailId:"",rmName:"",rmMobile:"",rmEmailId:"",company:""};
  menulist = [];
  profileOptionsFlag=false;

  constructor(private router: Router, private sharedService: SharedService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    jQuery("#sidebarId").addClass('sidebarClass');
    jQuery("#routerOutletId").addClass('routerOutletClass');
    this.profileOptionsFlag=false;
   // jQuery('#profileOptions').hide();
    if (sessionStorage.getItem('token') != null && sessionStorage.getItem('token') != "") {
      this.getPortalMenu();
      this.getEmpProfile();
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  toggleSidebar(){
    if(this.isSidebarVisible){
      this.isSidebarVisible = false;
      jQuery("#routerOutletId").removeClass('routerOutletClass');
      jQuery("#routerOutletId").addClass('routerOutletClass1');
    }
    else{
      this.isSidebarVisible = true;
      jQuery("#routerOutletId").removeClass('routerOutletClass1');
      jQuery("#routerOutletId").addClass('routerOutletClass');
    }
  }

  showOptions(){
   
    if(this.profileOptionsFlag){
      this.profileOptionsFlag = false;
    }
    else{
      this.profileOptionsFlag = true;
    }
    
   
  }
  logout() {
   // jQuery('#modalWindow2').modal('hide');
   this.profileOptionsFlag = false;
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  viewProfile() {
    this.profileOptionsFlag = false;
    //jQuery('#modelWindow2').modal().hide();
    //jQuery('#modalWindow2').modal('hide');
    jQuery('#modelWindow1').modal({
      backdrop: 'static',
      keyboard: false
    });
  }

  getEmpProfile(){
    this.spinner.show();
    var json = {
      "empId" : this.empId,
      "empRole" : this.empRole,
      "tenentId" : this.tenentId
    }
    this.sharedService.getEmpProfile(json)
    .subscribe((response) => {
      if (response.responseCode == Constant.responseCode) {
          this.loginResponse = response.wrappedList[0];
          this.empIcon = response.wrappedList[0].profileUrl;
          this.spinner.hide();
      }
      else {
        this.spinner.hide();
      }
    }
    ),
    (error) => {
      this.spinner.hide();
    }
  }
  
  getPortalMenu() {
    this.spinner.show();
    var json = {
      "empRole": this.empRole
    }
    this.sharedService.getPortalMenu(json)
      .subscribe((response) => {
        if (response.responseCode == Constant.responseCode) {
            this.menulist = response.wrappedList;
            this.spinner.hide();
            
        }
        else {
          this.spinner.hide();
          alert("No Menu found for this user");
        }
      }
      ),
      (error) => {
        this.spinner.hide();
        alert("Network Error");

      }}
}
