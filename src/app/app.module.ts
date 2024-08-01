import {} from 'googlemaps';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
//import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { LoginDemoComponent } from './login-demo/login-demo.component';
import { SharedService } from './api/sharedservice';
import { ViewDealerComponent } from './dashboard/view-dealer/view-dealer.component';
import { ViewRegistrationComponent } from './dashboard/view-registration/view-registration.component';
import { Ng2SmartTableModule } from 'ngx-smart-table';
import { NgxSpinnerModule } from "ngx-spinner";
import { ApplyLeaveComponent } from './dashboard/apply-leave/apply-leave.component';
import { ViewLeaveStatusComponent } from './dashboard/view-leave-status/view-leave-status.component';
import { ViewPlannedVisitComponent } from './dashboard/view-planned-visit/view-planned-visit.component';
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
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MapviewComponent } from './dashboard/mapview/mapview.component';
import { VisitLocationComponent } from './dashboard/mapview/visit-location/visit-location.component';
import { AgmCoreModule } from '@agm/core';
import { TrackVisitComponent } from './dashboard/track-visit/track-visit.component';
import { AddEmployeeComponent } from './dashboard/add-employee/add-employee.component';
import { CaptionComponent } from './dashboard/caption/caption.component';
import { HomepageComponent } from './dashboard/homepage/homepage.component';
import { ViewAttendanceComponent } from './dashboard/view-attendance/view-attendance.component';
import { KpiComponent, DialogOverviewExampleDialog } from './dashboard/kpi/kpi.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ForgotpasswordComponent,
    LoginDemoComponent,
    ViewRegistrationComponent,
    ViewDealerComponent,
    ApplyLeaveComponent,
    ViewLeaveStatusComponent,
    ViewPlannedVisitComponent,
    NewVisitComponent,
    NewRegistrationComponent,
    NewOrderComponent,
    RequestFormComponent,
    ViewComplaintComponent,
    EmpMasterComponent,
    DealerMasterComponent,
    PerformanceComponent,
    EnquiryComponent,
    PipelineComponent,
    ConversionComponent,
    LostComponent,
    MyTeamComponent,
    ViewSubDealerComponent,
    LeaveApprovalComponent,
    MapviewComponent,
    VisitLocationComponent,
    TrackVisitComponent,
    AddEmployeeComponent,
    CaptionComponent,
    HomepageComponent,
    ViewAttendanceComponent,
    KpiComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    Ng2SmartTableModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule,
    BsDatepickerModule.forRoot(),
    MatTableModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatButtonModule,
    MatDialogModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyBRaty5Cs4xkv1dgudw_mS0PYyMxms4HFQ',
    //   libraries: ['geometry'],
    //   apiVersion: '3',

    //  // libraries: ['places']
    // })
  ],
  entryComponents: [DialogOverviewExampleDialog],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
