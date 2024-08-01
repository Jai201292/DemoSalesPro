import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../api/sharedservice';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from '../../api/Constant';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
// import * as $ from 'jquery';
declare var jQuery: any;

@Component({
  selector: 'app-view-complaint',
  templateUrl: './view-complaint.component.html',
  styleUrls: ['./view-complaint.component.css']
})
export class ViewComplaintComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  tenentId = "";
  category="";
  subCategory="";
  status="";
  fromDate="";
  toDate="";
  complaintList = [];
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

  constructor(private ss: SharedService, private spinner: NgxSpinnerService) { 
    this.datePickerConfig = Object.assign({},
      {
      containerClass: 'theme-dark-blue',
      showWeekNumbers: false,
      dateInputFormat: 'YYYY-MM-DD'
      });

      this.tenentId = sessionStorage.getItem("tenentId");
  }

  ngOnInit() {
   
    this.settings = Object.assign({}, this.mySettings);
    this.getViewComplaintTableCol();
  }

  applyfilterData(){
    this.getTableData();
  }

  getTableData(){
    this.spinner.show();
    var json = {
      "empId": sessionStorage.getItem('empId'),
      "empRole": sessionStorage.getItem('empRole'),
      "tenentId": this.tenentId,
      "category": this.category,
      "subCategory": this.subCategory,
      "status": this.status,
      "fromDate": jQuery('#fromDate').val(),
      "toDate": jQuery('#toDate').val()
    }
    this.ss.getViewComplaints(json)
      .subscribe(
        (response) => {
          if (response.responseCode == Constant.responseCode) {
            this.complaintList = response.wrappedList;
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
  getViewComplaintTableCol(){
    this.spinner.show();
    this.mySettings.columns = Object.assign({}, {});
    var json = {
      "empId": sessionStorage.getItem('empId'),
      "empRole": sessionStorage.getItem('empRole')
    }
    this.ss.getViewComplaintTableCol(json)
      .subscribe(
        (response) => {
          if (response.responseCode == Constant.responseCode) {
            for(var i = 0; i< response.wrappedList.length; i++){
              if(response.wrappedList[i].keyName == 'imageUrl'){
                this.mySettings.columns[response.wrappedList[i].keyName] =
                {
                  title: response.wrappedList[i].valueName,
                  filter: false,
                  type: 'html',
                  valuePrepareFunction: (item: string) => { 
                    if(item !=null){
                      var splitImage = item.split(",");
                      var imageUrl = "";
                      // for(let i=0;i<splitImage.length;i++){
                      //   imageUrl += "<img src= "+splitImage[i]+" width='30px' height='30px'/ > ";
                      // }
                      for(let i=0;i<splitImage.length;i++){
                        imageUrl += "<a href = '"+splitImage[i]+"' target='_blank'><span class='material-icons'>image</span> </a>";
                      }
                      return imageUrl;
                    }
                   
                    //return `<img src="${item}" width="30px" height="30px"/ >` 
                  } 
                }
              }
              else{
                this.mySettings.columns[response.wrappedList[i].keyName] =
                { title: response.wrappedList[i].valueName };
              }
              
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

}
