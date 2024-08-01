import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../api/sharedservice';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from '../../api/Constant';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css']
})
export class MyTeamComponent implements OnInit {

  empId = sessionStorage.getItem('empId');
  empRole = sessionStorage.getItem('empRole');
  tenentId = sessionStorage.getItem('tenentId');
  territoryCode="";
  territoryList=[];
  teamList=[];
  settings;
 //menuId = "27";
 mySettings = {
  mode: 'external',
  actions: false,
   columns: {
  
  }
};
  constructor(private router: Router, private ss: SharedService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.spinner.show();
    this.settings = Object.assign({}, this.mySettings);
   this.getTeamTableCol();
   //this.getMappedTerritoryList();
   this.getTableData();
  }


  getMappedTerritoryList(){
    this.spinner.show();
    var json = {
      "empId": this.empId,
      "empRole": this.empRole,
      "tenentId": this.tenentId
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

  getTeamTableCol(){

    var json = {
      "empId": this.empId,
      "empRole": this.empRole,
      "tenentId": this.tenentId
    }
    this.ss.getTeamTableCol(json)
    .subscribe(
      (response) => {
        if (response.responseCode == Constant.responseCode) {
          this.mySettings.columns = {};
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
      "tenentId" : this.tenentId
    }
    this.ss.getTeamList(json)
      .subscribe(
        (response) => {
          if (response.responseCode == Constant.responseCode) {
            this.teamList = response.wrappedList;
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
