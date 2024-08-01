import { Component, OnInit } from '@angular/core';
import { Constant } from '../../api/Constant';
import { Router } from '@angular/router';
import { SharedService } from '../../api/sharedservice';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-dealer',
  templateUrl: './view-dealer.component.html',
  styleUrls: ['./view-dealer.component.css']
})
export class ViewDealerComponent implements OnInit {

  territoryList = [];
  territoryCode = "";
  menuId ="28";
  dealerList=[];
  categoryList="";
  category = "";
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

      // dealerCode: { title: 'Dealer Code',width:'100px'},
      // dealerName: { title: 'Dealer Name',width:'200px'},
      // dealerType: { title: 'Dealer Type',width:'100px'},
      // showRoom: { title: 'ShowRoom',width:'100px'},
      // contPerson: { title: 'Contact Person',width:'150px'},
      // contAdr1: { title: 'Contact Address',width:'300px'},
      // contAdr1Pin: { title: 'Address Pincode',width:'200px'},
      // primEmailId: { title: 'Primary EmailId',width:'200px'},
      // primMobileNo: { title: 'Primary Mobile No',width:'200px'},
      // mobileNo: { title: 'Mobile No',width:'100px'}
    }
  };

  constructor(private router: Router, private ss: SharedService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
   // this.getOutletType();
   this.spinner.show();
   this.settings = Object.assign({}, this.mySettings);
  this.getViewDealerTableCol();
  this.getViewDealerCategory();
  this.getMappedTerritoryList();
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

  getViewDealerTableCol(){
    this.spinner.show();
    var json = {
      "empId": sessionStorage.getItem('empId'),
      "empRole": sessionStorage.getItem('empRole'),
      "menuId" : this.menuId
    }
    this.ss.getViewDealerTableCol(json)
    .subscribe(
      (response) => {
        if (response.responseCode == Constant.responseCode) {
          this.mySettings.columns = {};
       // console.log(response.wrappedList);
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
  getViewDealerCategory(){

    this.spinner.show();
    var json = {
      "empId": sessionStorage.getItem('empId'),
      "empRole": sessionStorage.getItem('empRole')
      
    }
    this.ss.getViewDealerCategory(json)
    .subscribe(
      (response) => {
        if (response.responseCode == Constant.responseCode) {
          this.categoryList = response.wrappedList;
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
    //console.log(this.category);
    if(this.category == "All"){
      this.category = "";
    }
   // console.log(this.category);
    this.spinner.show();
    var json = {
      "empId": sessionStorage.getItem('empId'),
      "empRole": sessionStorage.getItem('empRole'),
      "category": this.category,
      "territoryCode": this.territoryCode
    }
    //console.log(json);
    this.ss.getDealerMapping(json)
      .subscribe(
        (response) => {
          if (response.responseCode == Constant.responseCode) {
            this.dealerList = response.wrappedList;
            this.category = "All";
            this.spinner.hide();
          }
          else if (response.responseCode == '100001') {
            alert("No Record Found");
            this.category = "All";
            this.spinner.hide();
          }
          else {
            alert("Server Error");
            this.category = "All";
            this.spinner.hide();
          }

        },
        (error) => {
          alert("Network Error");
          this.category = "All";
          this.spinner.hide();
        }
      )

      

  }


}
