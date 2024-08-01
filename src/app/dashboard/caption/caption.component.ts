import { Component, OnInit } from '@angular/core';
import { CaptionModel } from '../../models/request/caption.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from '../../api/sharedservice';
import * as $ from 'jquery';
declare var jQuery: any;

@Component({
  selector: 'app-caption',
  templateUrl: './caption.component.html',
  styleUrls: ['./caption.component.css']
})
export class CaptionComponent implements OnInit {
  empId = sessionStorage.getItem('empId');
  empRole = sessionStorage.getItem('empRole');
  leadType = "";
  tenentId = sessionStorage.getItem("tenentId");
  regTypeCount: number;
  visitTypeCount: number;
  complaintTypeCount: number;

  cap: CaptionModel = {
    caption : "",
    capType : "0",
    isMandate : false,
    isEdit: false
  }
  captionList = [];
  cat: any = {
    category: "",
    subCategory: ""
  }

  catList = [];
  visitTypeList = [];
  visitType = "";
  myPlan = "";

  settings = {
    mode: 'external',
    actions: {
      add: false,
      edit: false,
     delete: false,
     columnTitle: "ACTION",
     custom: [{
       name: 'Edit',
       title: 'Edit'
     },
     {
      name: 'Delete',
      title: 'Delete'
    }
    ],
     position: 'left'
   },
     columns: {
       Type: {  title: 'Type' },
       F1: {  title: 'Field1' },
       F2: {  title: 'Field2' },
       F3: {  title: 'Field3' },
       F4: {  title: 'Field4' },
       F5: {  title: 'Field5' },
       F6: {  title: 'Field6' },
       F7: {  title: 'Field7' },
       F8: {  title: 'Field8' },
       F9: {  title: 'Field9' },
       F10: {  title: 'Field10' },
       F11: {  title: 'Field11' }
     }
  };
  visitSettings = {
    mode: 'external',
    actions: {
      add: false,
      edit: false,
     delete: false,
     columnTitle: "ACTION",
     custom: [{
       name: 'Edit',
       title: 'Edit'
     }
    ],
     position: 'left'
   },
     columns: {
       F1: {  title: 'F1' },
       F2: {  title: 'F2' },
       F3: {  title: 'F3' },
       F4: {  title: 'F4' },
       F5: {  title: 'F5' },
       F6: {  title: 'F6' },
       F7: {  title: 'F7' },
       F8: {  title: 'F8' },
       F9: {  title: 'F9' },
       F10: {  title: 'F10' },
       F11: {  title: 'F11' }
     }
  };
  catTypeSettings = {
    mode: 'external',
    actions: {
      add: false,
      edit: false,
     delete: false,
     columnTitle: "ACTION",
     custom: [{
       name: 'Edit',
       title: 'Edit'
     },
     {
      name: 'Delete',
      title: 'Delete'
    }
    ],
     position: 'left'
   },
     columns: {
      category: {  title: 'Category' },
       F1: {  title: 'F1' },
       F2: {  title: 'F2' },
       F3: {  title: 'F3' },
       F4: {  title: 'F4' },
       F5: {  title: 'F5' },
       F6: {  title: 'F6' },
       F7: {  title: 'F7' },
       F8: {  title: 'F8' },
       F9: {  title: 'F9' },
       F10: {  title: 'F10' },
       F11: {  title: 'F11' }
     }
  };
  viewRegistrationTypeList = [];
  viewVisitTypesList = [];
  viewCatTypeList = [];

  regTypeVisible = false;
  visitTypeVisible = false;
  complaintTypeVisible = false;
  regTypeArray = [];
  isRegEditable = false;
  isVisitEditable = false;
  cId = "";
  constructor(private spinner: NgxSpinnerService,private ss: SharedService) { }

  ngOnInit() {
    //this.captionList.push(this.cap);
    //this.catList.push(this.cat);
    //this.visitTypeList.push("");
    jQuery('#leadBtnId').addClass('active');
    jQuery('#visitDivId').hide();
    jQuery('#complaintDivId').hide();
    this.viewCaptions();
  }

  showDiv(divId,btnId){
    jQuery('.buttonClass').removeClass('active');
    jQuery('#'+btnId).addClass('active');
    jQuery('.divClass').hide();
    jQuery('#'+divId).show();
  }
  onCustomAction(e){
    if(e.action == 'Edit'){
      //alert(e.data.cid);
      this.editRegistrationType(e.data.cid);
    }
    else if(e.action == 'Delete'){
      //alert(e.data.cid);
      if(confirm("Are you sure you want to delete this registration type")){
        this.deleteRegistrationType(e.data.cid);
      }
    }
    
  }

  editVisitTypes(e){
    this.visitType = "";
     
    if(e.data.F1 == 'undefined'){
      this.visitType = "";
    }
    else{
      this.visitType = e.data.F1+","+e.data.F2+","+e.data.F3+","+e.data.F4+","+e.data.F5+","+e.data.F6+","+e.data.F7+","+e.data.F8+","+
      e.data.F9+","+e.data.F10+","+e.data.F11;
      this.visitType = this.visitType.slice(0,this.visitType.indexOf('undefined')-1);
    }
    this.isVisitEditable = true;
    this.visitTypeVisible = false;
  }
  
  editRegistrationType(cid){
    this.cId = cid;
    this.regTypeVisible = false;
    this.leadType = "";
    this.captionList = [];
    this.isRegEditable = false;
    for(var i =0;i<this.regTypeArray.length;i++){
      if(this.regTypeArray[i].cid == cid){
        this.leadType = this.regTypeArray[i].Type;
        for(var j=0;j<this.regTypeArray[i].details.length;j++){
        
          var field = {
            caption : this.regTypeArray[i].details[j].value,
            capType : this.regTypeArray[i].details[j].type,
            isMandate : this.regTypeArray[i].details[j].mandatory,
            isEdit : this.regTypeArray[i].details[j].edit
          }
          this.captionList.push(field);
        }
        this.isRegEditable = true;
        break;
      }
    }
  }

  cancelLead(){
    this.isRegEditable = false;
    this.leadType = "";
    this.captionList = [];
      if(this.regTypeCount < 11){
       // this.captionList.push(this.cap);
       // this.regTypeCount++;
       this.regTypeVisible = false;
      }
      else{
        this.regTypeVisible = true;
      }
  }
  cancelVisitType(){
    this.visitType = "";
    this.isVisitEditable = false;
    this.visitTypeVisible = false;

  }
  clearLead(){
    this.leadType = "";
    this.captionList = [];
  }
  updateLead(){
    if(this.validateLead()){
      this.spinner.show();
      var req = {
        "leadType": this.leadType,
        "captionList": this.captionList,
        "tenentId" : this.tenentId,
        "cId": this.cId
      }
      this.ss.updateLead(req)
      .subscribe((response) => {
        if (response.responseCode == '200') {
          alert("Lead updated successfully");
          this.captionList = [];
          this.leadType = "";
          this.spinner.hide();
          this.viewCaptions();
        }
    
        else {
          alert(response.errorMsg);
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
  deleteRegistrationType(cid){
    var json = {
      "empId" : this.empId,
      "empRole" : this.empRole,
      "tenentId": this.tenentId,
      "cid": cid
    }
    this.ss.deleteRegistrationType(json)
      .subscribe((response) => {
        if (response.responseCode == '200') {
          alert("Deleted successfully");
          this.spinner.hide();
          this.viewCaptions();
        }
    
        else {
          alert(response.errorMsg);
          this.spinner.hide();
        }

      },
        (error) => {
          alert("Network Error");
          this.spinner.hide();
        }
      )
  }
  viewCaptions(){
    this.spinner.show();
      var req = {
        "empId": this.empId,
        "empRole": this.empRole,
        "tenentId" : this.tenentId
      }
      this.ss.viewCaptions(req)
      .subscribe((response) => {
        if (response.responseCode == '200') {
          var regTypeList = [];
          this.regTypeArray = response.wrappedList[0].regType;
          for(var i=0;i<this.regTypeArray.length;i++){
            var obj = {
              'Type' : this.regTypeArray[i].Type,
              'cid' : this.regTypeArray[i].cid
            }
            for(var j=0;j< this.regTypeArray[i].details.length;j++){
              var key = this.regTypeArray[i].details[j].key;
              obj[key] = this.regTypeArray[i].details[j].value;
            }
            regTypeList.push(obj);
          }
          this.viewRegistrationTypeList = regTypeList;
          this.viewVisitTypesList = response.wrappedList[0].visitType;
          this.viewCatTypeList = response.wrappedList[0].categoryType;
          this.regTypeCount = response.wrappedList[0].regTypeCount;
          this.visitTypeCount = response.wrappedList[0].visitTypeCount;
          this.complaintTypeCount = response.wrappedList[0].complaintTypeCount ;
          this.spinner.hide();
          if(this.regTypeCount < 11){
            this.captionList.push(this.cap);
            this.regTypeCount++;
          }
          else{
            this.regTypeVisible = true;
          }
          if(this.visitTypeCount == 11){
            this.visitTypeVisible = true;
          }
          if(this.complaintTypeCount < 11){
            this.catList.push(this.cat);
             this.complaintTypeCount++;
          }
          else{
            this.complaintTypeVisible = true;
          }
        }
        else {
          alert(response.errorMsg);
          this.spinner.hide();
        }
      },
        (error) => {
          alert("Network Error");
          this.spinner.hide();
        }
      )
    }
    customCategoryAction(e){
      alert(e.action);
      if(e.action == 'Edit'){
        
      }
      else if(e.action == 'Delete'){
        this.deleteCategory();
      }
    }
    deleteCategory(){

    }
  validateLead(){
    if(this.leadType == ""){
      alert("Fill lead type");
      return false;
    }
    for(var i=0;i<this.captionList.length;i++){
      if(this.captionList[i].capType == null || this.captionList[i].capType == ""){
        alert("Select caption Type");
        return false;
      }
      if(this.captionList[i].caption == null || this.captionList[i].caption == ""){
        alert("Fill caption");
        return false;
      }
      //alert(this.captionList[i].isMandate);
    }
    return true;
  }

  createLead(){
    if(this.validateLead()){
      this.spinner.show();
      var req = {
        "leadType": this.leadType,
        "captionList": this.captionList,
        "tenentId" : this.tenentId
      }
      this.ss.createLead(req)
      .subscribe((response) => {
        if (response.responseCode == '200') {
          alert("Lead created successfully");
          this.captionList = [];
          this.leadType = "";
          this.spinner.hide();
        }
    
        else {
          alert(response.errorMsg);
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


  updateVisitCaption(){
    if(this.validateVisitCaption()){
      this.spinner.show();
      var req = {
        "visitType": this.visitType,
        "tenentId" : this.tenentId
      }
      this.ss.updateVisitCaption(req)
      .subscribe((response) => {
        if (response.responseCode == '200') {
          alert(response.visitCount +" Visit Type Updated successfully");
          this.visitType = "";
          this.myPlan = "";
          this.spinner.hide();
          this.viewCaptions();
        }
    
        else {
          alert(response.errorMsg);
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


  validateVisitCaption(){
    if(this.visitType == "" && this.myPlan == ""){
     alert("Fill at least one of them");
      return false;
    }
    return true;
  }
  createVisitCaption(){
    if(this.validateVisitCaption()){
      this.spinner.show();
      var req = {
        "visitType": this.visitType,
        "myPlan": this.myPlan,
        "tenentId" : this.tenentId
      }
      this.ss.createVisitCaption(req)
      .subscribe((response) => {
        if (response.responseCode == '200') {
          alert(response.visitCount +" Visit Type and "+ response.myPlanCount +" My Plan created successfully");
          this.visitType = "";
          this.myPlan = "";
          this.spinner.hide();
        }
    
        else {
          alert(response.errorMsg);
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

  removeCaption(pos){
    if(confirm("Are you sure you want to remove this caption?")){
      this.captionList.splice(pos,1);
    }
  }
  addCaptionCreation(){
    if(this.captionList.length == 11){
      alert("You can't add more field");
      return false;
    }
    var cp: CaptionModel = {
      caption : "",
      capType : "0",
      isMandate : false,
      isEdit: false
    }
    this.captionList.push(cp);
  }
  addVisitType(){
    var visitType = "";
    this.visitTypeList.push(visitType);
  }
  removeVisitType(pos){
    if(confirm("Are you sure you want to remove this visitType?")){
      this.visitTypeList.splice(pos,1);
    }
  }
  addCategory(){
    var c = {
      category : "",
      subCategory : ""
    }
    this.catList.push(c);
  }

  removeCategory(pos){
    if(confirm("Are you sure you want to remove this category?")){
      this.catList.splice(pos,1);
    }
  }

  validateCategory(){
    for(var i=0;i<this.catList.length;i++){
     // alert("Category"+this.catList[i].category);
      if(this.catList[i].category == null || this.catList[i].category == ""){
        alert("Fill category");
        return false;
      }
      if(this.catList[i].subCategory == null || this.catList[i].subCategory == ""){
        alert("Fill subCategory");
        return false;
      }
    }
    return true;
  }

  createCategory(){
    if(this.validateCategory()){
     // alert("successs");
      this.spinner.show();
      var req = {
        "catList" : this.catList,
        "tenentId" : this.tenentId
      }
      this.ss.createCategory(req)
      .subscribe((response) => {
        if (response.responseCode == '200') {
          alert(response.count + "Category created successfully");
          this.catList = [];
          this.addCategory();
          this.spinner.hide();
        }
    
        else {
          alert(response.errorMsg);
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
