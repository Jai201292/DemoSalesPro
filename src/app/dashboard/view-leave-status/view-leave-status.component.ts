import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'src/app/api/sharedservice';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
declare var jQuery: any;
import * as alasql from 'alasql';

@Component({
  selector: 'app-view-leave-status',
  templateUrl: './view-leave-status.component.html',
  styleUrls: ['./view-leave-status.component.css']
})
export class ViewLeaveStatusComponent implements OnInit {

  datePickerConfig: Partial<BsDatepickerConfig>;
  loginEmpId = "";
  loginEmpRole = "";
  tenentId = "";
  fromDate="";
  toDate="";
  leaveList = [];
  settings;
  mySettings = {
    mode: 'external',
    actions: false,
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

      this.loginEmpId = sessionStorage.getItem('empId');
      this.loginEmpRole = sessionStorage.getItem('empRole');
      this.tenentId = sessionStorage.getItem('tenentId');
  }

  ngOnInit() {
    this.settings = Object.assign({}, this.mySettings);
  }

  applyfilterData(){
    this.spinner.show();
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      tenentId : this.tenentId,
      fromDate: jQuery('#fromDate').val(),
      toDate: jQuery('#toDate').val(),
    }

    this.ss.getPostRequestData(jsonData, 'getLeaves')
    .subscribe(
      (response) => {
        // console.log(response);
        let columnName = response.columnName;

        this.mySettings.columns = {};
        for(let i=0;i<columnName.length;i++){
          
          this.mySettings.columns[columnName[i].key] =
              {
                title: columnName[i].title,
              }
        }

        this.settings = Object.assign({}, this.mySettings);

        this.leaveList = response.wrappedList;
      
        this.spinner.hide();

      },
      (error) => {
        alert("Network Error");
        this.spinner.hide();
      }
    )
  }

  exportData(){
    // alasql.fn.datetime = function(dateStr) {
    //   var date = new Date(dateStr);
    //   return date.toLocaleString('ja', {
    //     year:  'numeric',
    //     month: '2-digit',
    //     day:   '2-digit'
    //   });
    // };

    // let sql = "select datetime(fromDate) as From_Date INTO XLSXML('Leave_Report.xls',{headers:true}) FROM ?";
    let sql = "select * INTO XLSXML('Leave_Report.xls',{headers:true}) FROM ?";
    alasql(sql,[this.leaveList]);
  }

  refreshDate(id){
    jQuery('#'+id).val("");
  }

}
