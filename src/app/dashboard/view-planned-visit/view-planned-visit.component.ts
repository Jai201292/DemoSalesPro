import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../api/sharedservice';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from '../../api/Constant';

@Component({
  selector: 'app-view-planned-visit',
  templateUrl: './view-planned-visit.component.html',
  styleUrls: ['./view-planned.component.css']
})
export class ViewPlannedVisitComponent implements OnInit {

  empId = sessionStorage.getItem('empId');
  empRole = sessionStorage.getItem('empRole');
  tenentId = sessionStorage.getItem('tenentId');

  territoryCode="";
  territoryList=[];
  applyfilterBtn = false;
  visitStatus="";
  visitTypeList = [];
  purposeTypeList = [];
  visitType="";
  purposeType="";
  visitList = [];
  settings;
  mySettings = {
    mode: 'external',
    actions: false,
    // actions: {
    //   add: false,
    //   edit: false,
    //   delete: false,
    //   columnTitle: "ACTION",
    //   custom: [{
    //     name: 'view Detail',
    //     title: 'View'

    //   }],
    //   position: 'right'
    // },
     columns: {
  
    }
  };
  constructor(private ss: SharedService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.settings = Object.assign({}, this.mySettings);
    //this.getMappedTerritoryList();
    this.getVisitPurposeTypes();
  }
  getVisitPurposeTypes(){
    this.spinner.show();
    var json = {
      "empId": this.empId,
      "empRole": this.empRole,
      "tenentId": this.tenentId
    }
    this.ss.getVisitPurposeTypes(json)
    .subscribe(
      (response) => {
        if (response.responseCode == Constant.responseCode) {
          this.visitTypeList = response.wrappedList[0].visitType;
          this.purposeTypeList = response.wrappedList[0].purposeType;
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

  getViewTableCol(){
    this.spinner.show();
   // this.mySettings.columns = {};
   this.mySettings.columns = Object.assign({}, {});
   this.visitList = [];
   // alert(this.outletType);
   var json = {
     "empId": this.empId,
     "empRole": this.empRole,
     "visitType": this.visitType,
     "visitStatus": this.visitStatus,
     "purposeType": this.purposeType,
     "tenentId": this.tenentId
   }
   this.ss.getViewPlannedVisitTableCol(json)
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

  applyfilterData(){
    this.getTableData();
  }
  getTableData() {
    this.spinner.show();
    var json = {
      "empId": this.empId,
      "empRole": this.empRole,
      "visitType": this.visitType,
      "visitStatus": this.visitStatus,
      "purposeType": this.purposeType,
      "tenentId": this.tenentId
    }
    this.ss.getPlannedVisitTableData(json)
      .subscribe(
        (response) => {
          if (response.responseCode == Constant.responseCode) {
            this.visitList = response.wrappedList;
            this.spinner.hide();
          }
          else if (response.responseCode == '100001') {
           // alert("No Record Found");
            this.spinner.hide();
          }
          else {
           // alert("Server Error");
            this.spinner.hide();
          }

        },
        (error) => {
          alert("Network Error");
          this.spinner.hide();
        }
      )

  }
}
