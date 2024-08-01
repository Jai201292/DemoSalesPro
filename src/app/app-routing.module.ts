import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginDemoComponent } from './login-demo/login-demo.component';
import { ViewRegistrationComponent } from './dashboard/view-registration/view-registration.component';
import { ViewDealerComponent } from './dashboard/view-dealer/view-dealer.component';
import { ViewPlannedVisitComponent } from './dashboard/view-planned-visit/view-planned-visit.component';
import { ApplyLeaveComponent } from './dashboard/apply-leave/apply-leave.component';
import { ViewLeaveStatusComponent } from './dashboard/view-leave-status/view-leave-status.component';
import { NewVisitComponent } from './dashboard/new-visit/new-visit.component';
import { NewRegistrationComponent } from './dashboard/new-registration/new-registration.component';
import { NewOrderComponent } from './dashboard/new-order/new-order.component';
import { RequestFormComponent } from './dashboard/request-form/request-form.component';
import { ViewComplaintComponent } from './dashboard/view-complaint/view-complaint.component';
import { EmpMasterComponent } from './dashboard/emp-master/emp-master.component';
import { DealerMasterComponent } from './dashboard/dealer-master/dealer-master.component';
import { PerformanceComponent } from './dashboard/performance/performance.component';
import { EnquiryComponent } from './dashboard/enquiry/enquiry.component';
import { PipelineComponent } from './dashboard/pipeline/pipeline.component';
import { ConversionComponent } from './dashboard/conversion/conversion.component';
import { LostComponent } from './dashboard/lost/lost.component';
import { MyTeamComponent } from './dashboard/my-team/my-team.component';
import { ViewSubDealerComponent } from './dashboard/view-sub-dealer/view-sub-dealer.component';
import { LeaveApprovalComponent } from './dashboard/leave-approval/leave-approval.component';
import { MapviewComponent } from './dashboard/mapview/mapview.component';
import { VisitLocationComponent } from './dashboard/mapview/visit-location/visit-location.component';
import { AddEmployeeComponent } from './dashboard/add-employee/add-employee.component';
import { CaptionComponent } from './dashboard/caption/caption.component';
import { HomepageComponent } from './dashboard/homepage/homepage.component';
import { ViewAttendanceComponent } from './dashboard/view-attendance/view-attendance.component';
import { KpiComponent } from './dashboard/kpi/kpi.component';

const routes: Routes = [
  { path: '' , redirectTo: '/login' , pathMatch: 'full' },
  { path: 'login' , component:  LoginComponent },
  { path: 'forgotpassword' , component:  ForgotpasswordComponent },
  { path: 'dashboard' , component:  DashboardComponent,
    children: [
      {
        path: '',
        // component: HomepageComponent
        // component: PerformanceComponent
        component: KpiComponent
      },
      {
        path: 'viewRegistered',
        component: ViewRegistrationComponent
      },
      {
        path: 'viewDealer',
        component: ViewDealerComponent
      },
      {
        path: 'viewVisit',
        component: ViewPlannedVisitComponent
      },
      {
        path: 'applyLeave',
        component: ApplyLeaveComponent
      },
      {
        path: 'leaveStatus',
        component: ViewLeaveStatusComponent
      },
      {
        path: 'leaveApproval',
        component: LeaveApprovalComponent
      },
      {
        path: 'newVisit',
        component: NewVisitComponent
      },
      {
        path: 'newRegistration',
        component: NewRegistrationComponent
      },
      {
        path: 'newOrder',
        component: NewOrderComponent
      },
      {
        path: 'requestForm',
        component: RequestFormComponent
      },
      {
        path: 'viewComplaint',
        component: ViewComplaintComponent
      },
      {
        path: 'empMaster',
        component: EmpMasterComponent
      },
      {
        path: 'dealerMaster',
        component: DealerMasterComponent
      },
      {
        path: 'performance',
        component: PerformanceComponent
      },
      {
        path: 'kpi',
        component: KpiComponent
      },
      {
        path: 'enquiry',
        component: EnquiryComponent
      },
      {
        path: 'pipeline',
        component: PipelineComponent
      },
      {
        path: 'conversion',
        component: ConversionComponent
      },
      {
        path: 'lost',
        component: LostComponent
      },
      {
        path: 'myTeam',
        component: MyTeamComponent
      },
      {
        path: 'viewDealers',
        component: ViewDealerComponent
      },
      {
        path: 'viewSubDealers',
        component: ViewSubDealerComponent
      },
      {
        path: 'addEmployee',
        component: AddEmployeeComponent
      },
      {
        path: 'caption',
        component: CaptionComponent
      },
      {
        path: 'viewAttedance',
        component: ViewAttendanceComponent
      },
      {
        path: 'mapView',
        component: MapviewComponent,
        children: [
          {
            path: 'visitLocation/:empId',
            component: VisitLocationComponent
          },
          {
            path: '',
            component: VisitLocationComponent
            //redirectTo: '/login' , pathMatch: 'full'
          }
        ]
      }
      
    ]
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
