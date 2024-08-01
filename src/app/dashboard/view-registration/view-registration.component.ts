import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../api/sharedservice';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from '../../api/Constant';
import * as $ from 'jquery';
declare var jQuery: any;

@Component({
  selector: 'app-view-registration',
  templateUrl: './view-registration.component.html',
  styleUrls: ['./view-registration.component.css']
})
export class ViewRegistrationComponent implements OnInit {
  routerActive ="";
  empId = sessionStorage.getItem('empId');
  empRole = sessionStorage.getItem('empRole');
  tenentId = sessionStorage.getItem('tenentId');
  applyfilterBtn = false;
  territoryCode = "";
  territoryList = [];
  imagePath = "";
  //exportBtn = false;
  registrationList = [];
  outletTypeList = [];
  outletType = "";
  settings;
  mySettings = {
    mode: 'external',
    actions: false,
     columns: {
    }
  };

customArray ;

  constructor(private router: Router, private ss: SharedService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.settings = Object.assign({}, this.mySettings);
    this.getOutletType();
    //this.getMappedTerritoryList();
    if(this.empRole == 'ADMIN'){
      this.customArray = [{
        name: 'Img',
        title: 'Image'
       },
       {
        name: 'Active',
        title: 'Active'
       },
       {
        name: 'InActive',
        title: 'InActive'
       }];
    }
    else{
      this.customArray = [{
        name: 'Img',
        title: 'Image'
       }];
    }
  }

  onCustomAction(e){
    if(e.action == 'Img'){
      this.imagePath = e.data.regImage;
      jQuery('#imgModal').modal({
        backdrop: 'static',
        keyboard: false
      });
    }
    else if(e.action == 'Active'){
      this.updateRegistrationStatus('Y',e.data.regId);
    }
    else if(e.action == 'InActive'){
      this.updateRegistrationStatus('N',e.data.regId);
    }
    
  }
  updateRegistrationStatus(stat,regId){
    this.spinner.show();
    var json = {
      "empId": this.empId,
      "empRole": this.empRole,
      "tenentId" : this.tenentId,
      "regId" : regId,
      "status" : stat
    }
    this.ss.updateRegistrationStatus(json)
    .subscribe(
      (response) => {
        if (response.responseCode == Constant.responseCode) {
          if(stat == 'N'){
            alert("Inactive successfully");
          }
          else if(stat == 'Y'){
            alert("Active successfullly");
          }
          this.spinner.hide();
        }
        else if (response.responseCode == "0") {
          alert("Error in Updation");
          this.spinner.hide();
        }
        else {
          alert("Server Error");
          this.spinner.hide();
        }

      },
      (error) => {
        alert("Network Error");
        this.spinner.hide();
      }
    )
  }
  getMappedTerritoryList(){
    this.spinner.show();
    var json = {
      "empId": sessionStorage.getItem('empId'),
      "empRole": sessionStorage.getItem('empRole')
    }
    this.ss.getMappedTerritoryList(json)
    .subscribe(
      (response) => {
        if (response.responseCode == Constant.responseCode) {
          this.territoryList = response.wrappedList;
          this.spinner.hide();
        }
        else if (response.responseCode == '100001') {
          alert("No Record Found");
          this.spinner.hide();
        }
        else {
          alert("Server Error");
          this.spinner.hide();
        }

      },
      (error) => {
        alert("Network Error");
        this.spinner.hide();
      }
    )
  }

  getOutletType() {
    var json = {
      "empId" : this.empId,
      "empRole" : this.empRole,
      "tenentId" : this.tenentId
    }
    this.ss.getOutletType(json)
      .subscribe(
        (response) => {
          if (response.responseCode == Constant.responseCode) {
            this.outletTypeList = response.wrappedList;
            this.spinner.hide();
          }
          else if (response.responseCode == '100001') {
            alert("No Record Found");
            this.spinner.hide();
          }
          else {
            alert("Server Error");
            this.spinner.hide();
          }

        },
        (error) => {
          alert("Network Error");
          this.spinner.hide();
        }
      )
  }

  getViewTableCol() {
    this.spinner.show();
   // this.mySettings.columns = {};
    this.mySettings.columns = Object.assign({}, {});
    this.registrationList = [];
    // alert(this.outletType);
    var json = {
      "empId": this.empId,
      "empRole": this.empRole,
      "outletType": this.outletType,
      "tenentId": this.tenentId
    }
    //console.log(json);
    this.ss.getViewRegisteredTableCol(json)
      .subscribe(
        (response) => {
          if (response.responseCode == Constant.responseCode) {
            this.applyfilterBtn = true;
          //  console.log(response.wrappedList);
            for(var i = 0; i< response.wrappedList.length; i++){
              this.mySettings.columns[response.wrappedList[i].keyName] =
              { title: response.wrappedList[i].valueName };
            }
            this.settings = Object.assign({}, this.mySettings);
            this.settings.actions =  {
              add: false,
              edit: false,
              delete: false,
              columnTitle: "Action",
              custom: this.customArray,
              position: 'right'
            },
            this.spinner.hide();
          }
          else if (response.responseCode == '100001') {
            alert("No Record Found");
            this.spinner.hide();
          }
          else {
            alert("Server Error");
            this.spinner.hide();
          }

        },
        (error) => {
          alert("Network Error");
          this.spinner.hide();
        }
      )

  }
  applyfilterData() {
    this.getTableData();
  }

  getTableData() {
    this.spinner.show();
    var json = {
      "empId": this.empId,
      "empRole": this.empRole,
      "outletType": this.outletType,
      "tenentId": this.tenentId
    }
    this.ss.getTableData(json)
      .subscribe(
        (response) => {
          if (response.responseCode == Constant.responseCode) {
            this.registrationList = response.wrappedList;
            this.spinner.hide();
          }
          else if (response.responseCode == '100001') {
            alert("No Record Found");
            this.spinner.hide();
          }
          else {
            alert("Server Error");
            this.spinner.hide();
          }

        },
        (error) => {
          alert("Network Error");
          this.spinner.hide();
        }
      )

  }

  rotateImage(){
    var angle = (jQuery('#imgId').data('angle') + 90) || 90;
    jQuery('#imgId').css({'transform': 'rotate(' + angle + 'deg)'});
    jQuery('#imgId').data('angle', angle);
  }
}
