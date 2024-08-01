import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../api/sharedservice';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from '../../api/Constant';
import * as $ from 'jquery';
declare var jQuery: any;

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styles: []
})
export class RequestFormComponent implements OnInit {

  empId = sessionStorage.getItem('empId');
  empRole = sessionStorage.getItem('empRole');
  tenentId = sessionStorage.getItem('tenentId');

  leadType = "";
  leadName = "";
  leadTypeList = [];
  leadNameList = [];
  leadNameTypeList = [];
  catSubCatList =[];
  categoryList = [];
  category = "";
  subCategoryList = [];
  subCategory = "";
  remarks = "";

  constructor(private ss: SharedService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getLeadTypeAndName();
    this.getCategoryAndSubCategory();
  }

  getLeadTypeAndName(){
    this.spinner.show();
    var json = {
      "empId": this.empId,
      "empRole": this.empRole,
      "tenentId": this.tenentId
    }
    this.ss.getLeadTypeAndName(json)
    .subscribe(
      (response) => {
        if (response.responseCode == Constant.responseCode) {
            this.leadNameTypeList = response.wrappedList;
            for(var i=0;i<response.wrappedList.length;i++){
              this.leadTypeList.push(response.wrappedList[i].leadType);
            }
         // console.log(response.wrappedList);
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
  getLeadName(){
    this.leadNameList = [];
    for(var i =0;i< this.leadNameTypeList.length;i++){
      if(this.leadType == this.leadNameTypeList[i].leadType){
        this.leadNameList = this.leadNameTypeList[i].leadName;
        break;
      }
    }
  }
  getCategoryAndSubCategory(){
    this.spinner.show();
    var json = {
      "empId": this.empId,
      "empRole": this.empRole,
      "tenentId": this.tenentId
    }
    this.ss.getCategoryAndSubCategory(json)
    .subscribe(
      (response) => {
        if (response.responseCode == Constant.responseCode) {
            this.catSubCatList = response.wrappedList;
            for(var i=0;i<response.wrappedList.length;i++){
              this.categoryList.push(response.wrappedList[i].category);
            }
         // console.log(response.wrappedList);
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

  getSubCategoryList(){
    this.subCategoryList = [];
    for(var i=0;i<this.catSubCatList.length;i++){
      if(this.category == this.catSubCatList[i].category){
        this.subCategoryList = this.catSubCatList[i].subCategory;
        break;
      }
    }
  }

  validateForm(){
  //  console.log(this.category+","+this.subCategory+","+this.remarks);
    if(this.leadType == "" || this.leadName == "" || this.category == "" || this.subCategory == "" || this.remarks == ""){
      alert("Fill form fields") ;
      return false;
    }
    return true;
  }
  submitForm(){
   // console.log(this.validateForm());
    if(this.validateForm()){
      this.spinner.show();
    var json = {
      "empMob": sessionStorage.getItem('contactNo'),
      "empRole": this.empRole,
      "empId": this.empId,
      "tenentId": this.tenentId,
      "outletType": this.leadType,
      "outletName": this.leadName,
      "category": this.category,
      "subCategory": this.subCategory,
      "remarks": this.remarks
    }
    this.ss.saveRequestForm(json)
      .subscribe(
        (response) => {
          if (response.responseCode == Constant.responseCode) {
            alert("Your Complaint submitted successfully");
            this.spinner.hide();
            //jQuery("#requestFormId").reset();
            this.category = "";
            this.subCategory = "";
            this.remarks = "";
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

}