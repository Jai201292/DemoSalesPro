import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../api/sharedservice';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginCreationModel } from '../../models/request/loginCreate.model';
import { Constant } from '../../api/Constant';
declare var $: any;

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  loginCreationList: LoginCreationModel[] = [];
  isDisabled = false
  empId = sessionStorage.getItem("empId");
  empRole = sessionStorage.getItem("empRole");
  memberLimit: number = 0;
  tenentId = sessionStorage.getItem("tenentId");
  company = sessionStorage.getItem("company");
  teamList = [];
  mySettings = {
    mode: 'external',
    actions: {
      add: false,
      edit: false,
      delete: false,
      columnTitle: "ACTION",
      custom: [{
        name: 'Active',
        title: '<i class=" fa fa-check-circle" title="Active"></i>'
      },
      {
        name: 'InActive',
        title: '<i class="fa fa-times-circle" title="InActive"></i>'
      },
      {
        name: 'Edit',
        title: '<i class="fa fa-pencil-square-o" title="Edit"></i>'
      }
      ],
      position: 'left'
    },
    columns: {
    }
  };
  settings;
  constructor(private ss: SharedService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getMemberLimit();

    this.settings = Object.assign({}, this.mySettings);
    this.getTeamTableCol();
    this.getTableData();
  }
  getMemberLimit() {
    var json = {
      "empId": this.empId,
      "empRole": this.empRole,
      "tenentId": this.tenentId
    }
    this.ss.getMemberLimit(json)
      .subscribe(
        (response) => {
          if (response.responseCode == Constant.responseCode) {
            this.memberLimit = response.wrappedList[0].memberlimit;
            this.spinner.hide();
            this.checkAddEmployee();
          }
          else if (response.responseCode == '100001') {
            this.spinner.hide();
          }
          else {
            this.spinner.hide();
          }

        },
        (error) => {
          alert("Network Error");
          this.spinner.hide();
        }
      )
  }
  getTeamTableCol() {

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
            for (var i = 0; i < response.wrappedList.length; i++) {
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
  getTableData() {
    this.spinner.show();
    var json = {
      "empId": this.empId,
      "empRole": this.empRole,
      "tenentId": this.tenentId
    }
    this.ss.viewEmployees(json)
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
  checkAddEmployee() {
    if (this.memberLimit == 0) {
      this.isDisabled = true;
    }
    else {
      let loginCreation: LoginCreationModel = {
        emailId: "",
        userName: "",
        mobile: "",
        empId: this.empId,
        empRole: this.empRole,
        tenentId: this.tenentId,
        company: this.company
      }
      this.loginCreationList.push(loginCreation);
    }
  }
  customEmpAction(e) {
    //alert(e.data.empId);
    if (e.action == 'Active') {
      this.updateEmpStatus(e.data.empId, 1);
    }
    else if (e.action == 'InActive') {
      this.updateEmpStatus(e.data.empId, 0);
    }
    else if (e.action == 'Edit') {
      this.editEmpStatus(e);
    }
  }

  editableEmployeeId = "";
  editEmployeeName = "";
  editMobile = "";
  isDoAnyChange : boolean = true;
  editEmpStatus(event){
    this.editableEmployeeId = event.data.empId;
    this.editEmployeeName = event.data.key2;
    this.editMobile = event.data.key3;
    // alert(empId+" "+empName+" "+mobile)

    $("#editEmployeeModal").modal({
      backdrop : 'static',
      keyboard : false
    });

  }

  editEmployeeData(){
    if(this.editEmployeeName == ''){
      alert("enter name");
      return;
    }
    else if(this.editMobile.trim() == ''){
      alert("enter valid number");
      return;
    }
    else if(this.editMobile.length != 10){
      alert("mobile length should be equal to 10");
      return;
    }
    this.spinner.show();
    let jsonData = {
      // id : this.editableId,
      tenentId : this.tenentId,
      employeeId : this.editableEmployeeId,
      employeeName : this.editEmployeeName,
      mobile : this.editMobile,
    }

    this.ss.getPostRequestData(jsonData, 'updateEmployee')
    .subscribe(response => {
      // console.log(JSON.stringify(response));
      if(response.responseCode == Constant.responseCode){
        // alert(response.responseMsg);
        $("#editEmployeeModal").modal("hide");
        this.getTableData();
      }
      else{
        alert(response.responseMsg);
      }
      this.spinner.hide();
    });   
  }

  closeModal(){
    if(!this.isDoAnyChange){
      let isConfirm = confirm("Do you want to close?");
      if(isConfirm){
        $("#editEmployeeModal").modal("hide");
      }
    }
    else{
      $("#editEmployeeModal").modal("hide");
    }
    
  }
  updateEmpStatus(updateEmpId, stat) {
    var json = {
      "empId": this.empId,
      "empRole": this.empRole,
      "updateEmpId": updateEmpId,
      "tenentId": this.tenentId,
      "empStatus": stat
    }
    this.ss.updateEmpStatus(json)
      .subscribe(
        (response) => {
          if (response.responseCode == Constant.responseCode) {
            if (stat == 0) {
              alert("Employee Inactive successfully");
            }
            else if (stat == 1) {
              alert("Employee Active successfully");
            }
            this.spinner.hide();
            this.getTableData();
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

  addLoginCreation() {
    if (this.loginCreationList.length >= this.memberLimit) {
      alert("Limit exceeded");
      return false;
    }
    let loginCreation: LoginCreationModel = {
      emailId: "",
      userName: "",
      mobile: "",
      empId: this.empId,
      empRole: this.empRole,
      tenentId: this.tenentId,
      company: this.company
    }
    this.loginCreationList.push(loginCreation);

  }

  removeLoginCreation(event) {
    if (confirm("want to delete login creation")) {
      this.loginCreationList.splice(event, 1); // first arg = start position, second arg = no. of item
    }
  }

  emailIdValidation(event) {
    var x = event.key;
    if (/^[a-z0-9\@\.]+$/i.test(x)) {
      return true;
    }
    else {
      return false;
    }
  }

  mobileValidation(event) {
    var x = event.key;
    if (/^\d*$/.test(x)) {
      return true;
    }
    else {
      return false;
    }
  }

  userNameValidation(event) {
    var x = event.key;
    if (/^[a-z\s]+$/i.test(x)) {
      return true;
    }
    else {
      return false;
    }
  }


  submitCreateLogin() {
    for (var i = 0; i < this.loginCreationList.length; i++) {
      let lc: LoginCreationModel = this.loginCreationList[i];
      if (lc.emailId == null || lc.emailId.trim() == "") {
        alert("Please fill emailId");
        return false;
      }
      else if (lc.userName == null || lc.userName.trim() == "") {
        alert("Please fill userName");
        return false;
      }
      else if (lc.mobile == null || lc.mobile.trim() == "") {
        alert("Please fill mobile");
        return false;
      }

      for (var j = 0; j < i; j++) {
        let lc1: LoginCreationModel = this.loginCreationList[j];
        if (lc1.mobile == lc.mobile) {
          alert("Duplicate mobile No");
          return false;
        }
        if (lc1.emailId == lc.emailId) {
          alert("Duplicate Email Id");
          return false;
        }
      }

    }
    this.spinner.show();
    this.ss.submitCreateLogin(this.loginCreationList)
      .subscribe((response) => {
        if (response.responseCode == '200') {
          if(response.count == "0"){
            alert(response.errorMsg);
          }
          else{
            alert(response.errorMsg + "\n" + response.count + " records inserted ");
            this.loginCreationList = [];
            this.memberLimit = 0;
            this.getMemberLimit();
            this.getTableData();
          }
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
