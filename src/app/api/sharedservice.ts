import { Injectable } from '@angular/core';
//import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Http, RequestOptions,Response, Headers } from '@angular/http';
import { Constant } from './Constant';
import { LoginComponent } from '../login/login.component';
import { LoginRequest } from '../models/request/loginRequest.model';
import { Observable } from 'rxjs';
import 'rxjs/Rx';

@Injectable()
export class SharedService {
    private serviceEndPoint: any;
    
    constructor(private http: Http){
         this.serviceEndPoint = Constant.serverURL;
    }
    
    public authenticate(req: LoginRequest) {

        let headers = new Headers({ 'Content-Type': 'application/json' });
       // headers.append( "Access-Control-Allow-Origin", "*" );
        let options = new RequestOptions({ headers: headers });
     
    //     let headers = new HttpHeaders(
    //         { 'content-type': 'application/json',
    //          }
    //         );
    //    // headers.set( "Access-Control-Allow-Origin", "*" );
    //     let options = {headers: headers};
       return this.http.post(this.serviceEndPoint + 'authenticate.php', req, options)
      // return this.http.post('http://in3.co.in:4125/Azure/AzureLogin.php',json,options)
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getEmpProfile(req){
        // console.log(req);
          let headers = new Headers({ 'Content-Type': 'application/json' });
           let options = new RequestOptions({ headers: headers });
          return this.http.post(this.serviceEndPoint + 'getEmpProfile.php', req, options)
          .map((response: Response) => response.json())
          .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
      }
   public getPortalMenu(req){
      // console.log(req);
        let headers = new Headers({ 'Content-Type': 'application/json' });
         let options = new RequestOptions({ headers: headers });
        return this.http.post(this.serviceEndPoint + 'getPortalMenu.php', req, options)
        .map((response: Response) => response.json())
        .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getMemberLimit(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'getMemberLimit.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    
    public getTableData(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'viewRegistered.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getOutletType(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'getOutletType.php',req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public viewEmployees(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'viewEmployees.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public updateEmpStatus(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'updateEmpStatus.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getViewRegisteredTableCol(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'viewRegisteredTableCol.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getViewPlannedVisitTableCol(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'viewVisitTableCol.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getPlannedVisitTableData(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'viewPlannedVisit.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getViewComplaintTableCol(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'viewComplaintTableCol.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getViewComplaints(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'viewComplaints.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getViewDealerTableCol(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'getDealerMappingTableCol.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getDealerMapping(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'getDealerMapping.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getViewDealerCategory(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'getDealerMappingCategory.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getTeamTableCol(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'getTeamTableCol.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getTeamList(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'myTeam.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getSubDealerTableCol(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'getSubDealerMappingTableCol.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getSubDealerMapping(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'getSubDealerMapping.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public saveRequestForm(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'submitRequestForm.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getMappedTerritoryList(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'getMappedTerritories.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getEmpVisitDateAndMapLocations(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'getEmpVisitedDate.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getMappedLocation(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'getEmpVisitedLocation.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getVisitDetails(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'getEmpVisitedLocation.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getAttendanceDetails(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'getEmpAttendanceLocation.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getVisitPurposeTypes(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'getVisitPurposeTypes.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public calculateDistance(org,des){
        let headers = new Headers({'Access-Control-Allow-Origin':'*'});
       // headers.append( "Access-Control-Allow-Origin", "*" );
        let options = new RequestOptions({ headers: headers });
        var url = " https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins="+org+"&destinations="+des+"&key=AIzaSyBRaty5Cs4xkv1dgudw_mS0PYyMxms4HFQ";
        return this.http.get(url,options)
        .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public submitCreateLogin(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'addEmployees.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public viewCaptions(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'viewCaptions.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public deleteRegistrationType(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'deleteRegistrationType.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public updateLead(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'updateLead.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public createLead(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'createLead.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public createCategory(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'createCategory.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public createVisitCaption(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'createVisitCaption.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public updateVisitCaption(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'updateVisitCaption.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public updateRegistrationStatus(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'updateRegistrationStatus.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getLeadTypeAndName(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'getOutletTypeAndName.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    public getCategoryAndSubCategory(req){
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
       return this.http.post(this.serviceEndPoint + 'getCategoryAndSubCategory.php', req, options)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }


    /* jp code - start */
    public getUrls(searchType : string){
        var url = this.serviceEndPoint+"getURLs.php?searchType="+searchType;
        return this.http.get(url)
        .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }

    public getPostRequestData(jsonData : any, serviceName : string){
        return this.http.post(this.serviceEndPoint + serviceName+'.php', jsonData)
       .map((response: Response) => response.json())
       .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }
    /* jp code - end */
}