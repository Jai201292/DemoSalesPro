import { Component, OnInit } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker/public_api';
import { NgxSpinnerService } from 'ngx-spinner';
import { SharedService } from 'src/app/api/sharedservice';
declare var jQuery: any;
import * as alasql from 'alasql';

@Component({
  selector: 'app-view-attendance',
  templateUrl: './view-attendance.component.html',
  styleUrls: ['./view-attendance.component.css']
})
export class ViewAttendanceComponent implements OnInit {
  datePickerConfig: Partial<BsDatepickerConfig>;
  loginEmpId = "";
  loginEmpRole = "";
  tenentId = "";
  fromDate="";
  toDate="";
  viewType="";
  attedanceList = [];

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
    if(this.viewType == ''){
      alert("select view type");
      return;
    }
    this.spinner.show();
    let jsonData = {
      loginEmpId : this.loginEmpId,
      loginEmpRole : this.loginEmpRole,
      tenentId : this.tenentId,
      fromDate: jQuery('#fromDate').val(),
      toDate: jQuery('#toDate').val(),
      viewType: this.viewType
    }

    this.ss.getPostRequestData(jsonData, 'viewAttendance')
    .subscribe(
      (response) => {
        // console.log(response);
        let columnName = response.columnName;

        this.mySettings.columns = {};
        for(let i=0;i<columnName.length;i++){
          if(columnName[i].key == "inLatLong" || columnName[i].key == "outLatLong" ){
            this.mySettings.columns[columnName[i].key] =
                {
                  title: columnName[i].title,
                  filter: false,
                  type: 'html',
                  valuePrepareFunction: (item: string) => { return `<a href = 'https://www.google.co.in/maps/search/${item}' target='_blank' class='lat_long'>${item}</a>` } 
                }
          }
          else{
            this.mySettings.columns[columnName[i].key] =
                {
                  title: columnName[i].title,
                }
          }
          
        }

        this.settings = Object.assign({}, this.mySettings);

        this.attedanceList = response.wrappedList;
      
        this.spinner.hide();
        setTimeout(() => {
          jQuery(".lat_long").css('color','#6c757d');
        }, 100);

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
    //   return date.toLocaleString();
    // };

    let sql = "select * INTO XLSXML('Attendance_Report.xls',{headers:true}) FROM ?";
    alasql(sql,[this.attedanceList]);
  }

  refreshDate(id){
    jQuery('#'+id).val("");
  }

}
