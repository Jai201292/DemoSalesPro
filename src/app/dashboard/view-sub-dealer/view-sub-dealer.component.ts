import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../api/sharedservice';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from '../../api/Constant';

@Component({
  selector: 'app-view-sub-dealer',
  templateUrl: './view-sub-dealer.component.html',
  styleUrls: ['./view-sub-dealer.component.css']
})
export class ViewSubDealerComponent implements OnInit {

  menuId = "29";
  territoryCode="";
  territoryList=[];
  subdealerList=[];
 
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
      // subdealerCode: { title: 'Sub Dealer Code'},
      // subdealerName: { title: 'Sub Dealer Name'},
      // classification: { title: 'Classification'}
      
    }
  };

  constructor(private router: Router, private ss: SharedService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.settings = Object.assign({}, this.mySettings);
    this.getSubDealerTableCol();
    this.getMappedTerritoryList();
   // this.getOutletType();
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

  getSubDealerTableCol(){
    this.spinner.show();
   // this.mySettings.columns = {};
    this.mySettings.columns = Object.assign({}, {});
    //this.registrationList = [];
    // alert(this.outletType);
    var json = {
      "empId": sessionStorage.getItem('empId'),
      "empRole": sessionStorage.getItem('empRole'),
      "menuId" : "29"
    }
    this.ss.getSubDealerTableCol(json)
      .subscribe(
        (response) => {
          if (response.responseCode == Constant.responseCode) {
           // this.applyfilterBtn = true;
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
  applyfilterData() {
    
    this.getTableData();
  }

  getTableData() {
    this.spinner.show();
    var json = {
      "empId": sessionStorage.getItem('empId'),
      "empRole": sessionStorage.getItem('empRole'),
      "menuId": this.menuId,
      "territoryCode": this.territoryCode
    }
    this.ss.getSubDealerMapping(json)
      .subscribe(
        (response) => {
          if (response.responseCode == Constant.responseCode) {
            this.subdealerList = response.wrappedList;
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

}
