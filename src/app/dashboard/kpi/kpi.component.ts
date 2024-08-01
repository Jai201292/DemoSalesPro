import { Component, OnInit, Inject } from '@angular/core';
import { trigger, transition, style, sequence, animate } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { SharedService } from 'src/app/api/sharedservice';
import { Constant } from 'src/app/api/Constant';

export interface DialogData {
  regName: string
}

@Component({
  selector: 'app-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.css'],
  animations : [
    trigger('rowsAnimation', [
      transition('void => *', [
        style({ height: '*', opacity: '0', transform: 'translateX(-550px)', 'box-shadow': 'none' }),
        sequence([
          animate(".35s ease", style({ height: '*', opacity: '.2', transform: 'translateX(0)', 'box-shadow': 'none'  })),
          animate(".35s ease", style({ height: '*', opacity: 1, transform: 'translateX(0)' }))
        ])
      ])
    ])
  ]
})
export class KpiComponent implements OnInit {
  displayedColumns: string[] = ['Type', 'EmpName', 'Registration', 'Total_Visit', 'Total_Unique_Visit', 'Pending'];
  // displayedColumns: string[] = ['Type', 'EmpId', 'EmpName', 'Registration', 'Total_Visit', 'Total_Unique_Visit', 'Pending'];
  inProgress : boolean = false;
  kpiData;
  attendanceData;
  userEmpId = "";
  empList = [];
  visitData = [];
  outletType = "";
  outletTypeList = [];

  tenentId = "";
  empId = "";
  empRole = "";
  period = "YTD";

  constructor(private route: ActivatedRoute, public dialog: MatDialog,
    private sharedService : SharedService) { 
      this.tenentId = sessionStorage.getItem("tenentId");
      this.empId = sessionStorage.getItem('empId');
      this.empRole = sessionStorage.getItem('empRole');

    }

  ngOnInit() {
    this.getOutletType();
    this.getKpiData();
  }

  getOutletType() {
    var json = {
      "empId" : this.empId,
      "empRole" : this.empRole,
      "tenentId" : this.tenentId,
    }
    this.sharedService.getOutletType(json)
      .subscribe(
        (response) => {
          if (response.responseCode == Constant.responseCode) {
            this.outletTypeList = response.wrappedList;
            // this.spinner.hide();
          }
          else if (response.responseCode == '100001') {
            alert("No Record Found");
            // this.spinner.hide();
          }
          else {
            alert("Server Error");
            // this.spinner.hide();
          }

        },
        (error) => {
          alert("Network Error");
          // this.spinner.hide();
        }
      )
  }

  getKpiData(){
    this.inProgress = true;
    let jsonData = {
      empId : this.empId,
      empRole : this.empRole,
      tenentId : this.tenentId,
      period : this.period,
      outletType : this.outletType,
      userEmpId : this.userEmpId
    }
    this.sharedService.getPostRequestData(jsonData, "getKpiData")
      .subscribe(response => {
        // console.log(JSON.stringify(response));
        this.visitData = response.wrappedList;
        this.empList = response.empList;
        this.kpiData = new MatTableDataSource<object>(this.visitData);
        this.inProgress = false;
      }    
    );
  }

  getPendingData(empId: string, type : string){
    
    for(let i=0;i<this.visitData.length;i++){
      let loopEmpId = this.visitData[i].empId;
      let loopType = this.visitData[i].type;
      if(loopEmpId == empId && loopType == type){
        let pendingVisitData = this.visitData[i].pendingVisitRegistration;
        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          width: '1200px',
          data: pendingVisitData
        });
        
        break;
      } 
    }
  }

}

@Component({
  selector: 'pending.visit.dialog',
  templateUrl: 'pending.visit.dialog.html',
})
export class DialogOverviewExampleDialog {
  pendingVisitData : any = []
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data1: DialogData) {
      this.pendingVisitData = data1;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
