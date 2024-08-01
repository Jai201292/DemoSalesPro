// import { Component, OnInit } from '@angular/core';
// import { DomSanitizer } from '@angular/platform-browser';

// @Component({
//   selector: 'app-performance',
//   templateUrl: './performance.component.html',
//   styles: []
// })
// export class PerformanceComponent implements OnInit {

//   empId = sessionStorage.getItem('empId');
//   kpiurl = "http://fast.org.in/HsilSapPortal/#/dashbord?empId="+this.empId;
//   kpiurl1;
//   constructor(private dom: DomSanitizer) {
//     this.kpiurl1 = this.dom.bypassSecurityTrustResourceUrl(this.kpiurl);
//    }

//   ngOnInit() {
  
//   }


// }

/**** jp code start ****/
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { SharedService } from 'src/app/api/sharedservice';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styles: []
})
export class PerformanceComponent implements OnInit {
  empId = sessionStorage.getItem('contactNo');
  kpiurl = "";
  kpiurl1;
  constructor(private ss: SharedService,private dom: DomSanitizer) {
   }

  ngOnInit() {
    this.getKpiUrl();
  }

  getKpiUrl(){
    this.ss.getUrls("kpiURL")
    .subscribe(
      (response) => {
          this.kpiurl = response.kpiURL+this.empId;
          this.kpiurl1 = this.dom.bypassSecurityTrustResourceUrl(this.kpiurl);
      },
      (error) => {
        alert("Network Error");
      }
    )
  }
}
/**** jp code - end ****/
