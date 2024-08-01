import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../api/sharedservice';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from '../../api/Constant';
import * as $ from 'jquery';
//import { AgmCoreModule, MapsAPILoader } from "@agm/core";
//import {} from '@types/googlemaps';
declare var jQuery: any;

@Component({
  selector: 'app-mapview',
  templateUrl: './mapview.component.html',
  styleUrls: ['./mapview.component.css']
})
export class MapviewComponent implements OnInit {
  empId = sessionStorage.getItem('empId');
  empRole = sessionStorage.getItem('empRole');
  tenentId = sessionStorage.getItem('tenentId');
  distanceCovered = 0;
  visitEmpId = "";
  visitbar = true;
  visitDate = "";
  workingHrs = "";
  visitNo: number;
  //menuId = "27";
  teamList = [];
  visitDateList = [];
  attendanceDateList = [];
  mappedLocationList = [];
  visitlist = [];
  attlist = [];
  org: google.maps.LatLng;
  dest: google.maps.LatLng;
  waypt = [];
  positions = [];
  map: google.maps.Map;
  markers = [];
  regMarkers = [];
  flightPlanCoordinates = [];
  flightPath: google.maps.Polyline;
  lat: number = 28.658464;
  lng: number = 77.366008;

  lat1: number = 28.694808;
  lng1: number = 77.266775;
  zoom: number = 15;
  directionsDisplay: google.maps.DirectionsRenderer;
   
  constructor(private router: Router, private ss: SharedService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.createMap();
    jQuery('#mapViewDivId').addClass('col-80');
    jQuery('#mapViewDivId').removeClass('col-100');
    this.getTeamList();
 //  this.calculateDistance();
  }

 

  createMap(){
    var mapArea = document.getElementById('map');
    const mapProperties = {
      center: new google.maps.LatLng(23.195567, 78.827971),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    //this.map.setMapTypeId(null);
    this.map = new google.maps.Map(mapArea,mapProperties);
  }
  getAllVisitDatesAndLocation(visitEmpId){
    this.visitDate = "";
    this.visitNo = 0;
    this.distanceCovered = 0;
    this.visitDateList = [];
    this.mappedLocationList = [];
    this.attendanceDateList = [];
    this.deleteMarkers();
    this.deleteRegMarkers();
    this.deleteAllPathInMap();
    this.map = null;
    this.createMap();
    this.visitEmpId = visitEmpId;
    //console.log(visitEmpId);
    jQuery('.firstColorClass').removeClass('TeamDivClass');
    jQuery('.secondColorClass').removeClass('TeamDivClass');
    jQuery('#empId_'+visitEmpId).addClass('TeamDivClass');
    //this.map = null;
    //this.map = new google.maps.Map(this.mapArea, this.mapProperties);
    //this.router.navigate(['/dashboard/mapView/visitLocation/'+visitEmpId]);
    //this.deleteRegMarkers();
    this.spinner.show();
    var json = {
      "visitEmpId": this.visitEmpId,
      "empId": this.empId,
      "empRole": this.empRole,
      "tenentId": this.tenentId
    }
    this.ss.getEmpVisitDateAndMapLocations(json)
      .subscribe(
        (response) => {
          if (response.responseCode == Constant.responseCode) {
            this.visitDateList = response.wrappedList[0].visitDateList;
            this.attendanceDateList = response.wrappedList[0].attendanceDateList;
            this.mappedLocationList = response.wrappedList[0].regLocationList;
            if(this.mappedLocationList.length != 0){
              this.addMappedLocationInMap();
            }
            
            //this.addPathInMap();
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

  addMappedLocationInMap(){
    var bounds = new google.maps.LatLngBounds();
    for(var m=0;m < this.mappedLocationList.length;m++){
            
        var loc = new google.maps.LatLng(+(this.mappedLocationList[m].lat),+(this.mappedLocationList[m].lng));
        var place = this.mappedLocationList[m].locName;
        var infoView = this.mappedLocationList[m].infoView;
        bounds.extend(loc);
        this.addregMarker(loc,place,infoView);
          
    }
    this.showRegMarkers();
    this.map.fitBounds(bounds);
    // this.createAndShowPolylines();
    this.spinner.hide();
}

addAttendanceLocationInMap(){
  var bounds = new google.maps.LatLngBounds();
  for(var v=0;v < this.attlist.length;v++){
    if(this.attlist[v].lat != null && this.attlist[v].lng != null && this.attlist[v].lat != "0" && this.attlist[v].lng != "0"){
      var loc = new google.maps.LatLng(+(this.attlist[v].lat),+(this.attlist[v].lng));
     // console.log(loc);
      var place = this.attlist[v].location;
      var infoView = this.attlist[v].infoView;
     // var stat = this.visitlist[v].stat;
      bounds.extend(loc);
      this.addAttendanceMarker(loc,place,infoView);
     // this.addRoutePath(v,loc);
     //this.calculateDistanceCovered(v,(v+1));
    //  this.calculateDistance(v,v+1);
    }
  }
  this.showMarkers();
  this.map.fitBounds(bounds);
  //this.showPathInMap();
  // this.createAndShowPolylines();
  this.spinner.hide();
}

addVisitLocationInMap(){
  var bounds = new google.maps.LatLngBounds();
  for(var v=0;v < this.visitlist.length;v++){
          
    var place = this.visitlist[v].location;
    if(place == 'start' || place == 'stop'){
      this.workingHrs = this.visitlist[v].wrkTime;
    }
    if(this.visitlist[v].lat != null && this.visitlist[v].lng != null && this.visitlist[v].lat != "0" && this.visitlist[v].lng != "0"){
      var loc = new google.maps.LatLng(+(this.visitlist[v].lat),+(this.visitlist[v].lng));
      //console.log(loc);
      
      var infoView = this.visitlist[v].infoView;
      
     // var stat = this.visitlist[v].stat;
      bounds.extend(loc);
      this.addMarker(loc,place,infoView);
      this.addRoutePath(v,loc);
     //this.calculateDistanceCovered(v,(v+1));
      this.calculateDistance(v,v+1);
    }
      
  }
  this.showMarkers();
  this.map.fitBounds(bounds);
  this.showPathInMap();
  // this.createAndShowPolylines();
  this.spinner.hide();
}

calculateDistance(o,d){
    if(o == this.visitlist.length-1){
        this.distanceCovered = this.distanceCovered + 0;
    }
    else if(o < this.visitlist.length){
      var org = new google.maps.LatLng(this.visitlist[o].lat,this.visitlist[o].lng);
      var dest = new google.maps.LatLng(this.visitlist[d].lat,this.visitlist[d].lng);
      new google.maps.DistanceMatrixService().getDistanceMatrix(
        {
          origins:[org],
          destinations :[dest],
          travelMode : google.maps.TravelMode.DRIVING,
          unitSystem : google.maps.UnitSystem.METRIC
        },
        (results: any) => {
          this.distanceCovered = this.distanceCovered + results.rows[0].elements[0].distance.value;
            //console.log('resultados distancia (mts) -- ', results.rows[0].elements[0].distance.value)
        }
      );
    }
  //var gzb = new google.maps.LatLng(this.lat,this.lng);
  //var del = new google.maps.LatLng(this.lat1, this.lng1);
  //var org = gzb;
  //var dest = del;
  //var distance = google.maps.geometry.spherical.computeDistanceBetween(org, dest);
  //var distance1 = google.maps.geometry.spherical.computeLength([gzb,del]);
  //console.log(distance);
  //console.log(distance1);
  
}

/*calculateDistanceCovered(o,d){
   
  if(o < this.visitlist.length - 1){
    var origin = +(this.visitlist[o].lat)+','+ +(this.visitlist[o].lng);
    var dest = +(this.visitlist[d].lat)+','+ +(this.visitlist[d].lng);
    this.ss.calculateDistance(origin,dest)
    .subscribe(
      (response) => {
        
        console.log(JSON.stringify(response));

      },
      (error) => {
        alert("Network Error");
        this.spinner.hide();
      }
    )
  }
}
*/

addRoutePath(v,loc){
  if(v == 0){
    this.org = loc;
  }
  else if(v == this.visitlist.length-1){
    this.dest = loc;
  }  
  else{
    var wypt = {
      location:loc,
      stopover:true
    }
    this.waypt.push(wypt);
  }
}


toggleVisitbar(){
  if(this.visitbar == true){
    this.visitbar = false;
    jQuery('#mapViewDivId').removeClass('col-80');
    jQuery('#mapViewDivId').addClass('col-100');
  }
  else{
    this.visitbar = true;
    jQuery('#mapViewDivId').removeClass('col-100');
    jQuery('#mapViewDivId').addClass('col-80');
  }
}
showPathInMap(){ 
  this.directionsDisplay = new google.maps.DirectionsRenderer();
  this.directionsDisplay.setMap(this.map);
  this.directionsDisplay.setOptions( { suppressMarkers: true } );
  var directionsService = new google.maps.DirectionsService();
  directionsService.route({
    origin: this.org,
    destination: this.dest,
    waypoints:this.waypt,
    optimizeWaypoints: true,
    travelMode: google.maps.TravelMode.DRIVING
  }, (response, status) => {
    if (status === 'OK') {
      this.directionsDisplay.setDirections(response);
    } else {
        alert('Directions request failed due to ' + status);
    }
  });
}
deleteAllPathInMap(){
  //this.directionsDisplay.setMap(null);
  if(this.directionsDisplay != null){
      this.directionsDisplay.setMap(null);
      this.directionsDisplay = null;
  }
  this.org = null;
  this.dest = null;
  this.waypt = [];
  
}

getVisitList(vd){
  this.visitDate = vd;
  this.visitNo = 0;
  this.distanceCovered = 0;
    jQuery('.firstVisitColorClass').removeClass('visitDateClass');
    jQuery('.secondVisitColorClass').removeClass('visitDateClass');
    jQuery('#vdate_'+vd).addClass('visitDateClass');
  
   
this.spinner.show();
this.deleteMarkers();
//this.deleteRegMarkers();
this.deleteAllPathInMap();
  var json = {
    "visitEmpId": this.visitEmpId,
    "visitDate": vd,
    "empId": this.empId,
    "empRole": this.empRole,
    "tenentId": this.tenentId
  }
  this.ss.getVisitDetails(json)
    .subscribe(
      (response) => {
        if (response.responseCode == Constant.responseCode) {
          this.visitlist = response.wrappedList;
          this.addVisitLocationInMap();
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
getAttendanceList(vd){
  this.visitDate = vd;
  this.visitNo = 0;
  this.distanceCovered = 0;
  this.workingHrs = "";
  jQuery('.firstAttendanceColorClass').removeClass('attendanceDateClass');
  jQuery('.secondAttendanceColorClass').removeClass('attendanceDateClass');
  jQuery('#attdate_'+vd).addClass('attendanceDateClass');
this.spinner.show();
this.deleteMarkers();
//this.deleteRegMarkers();
this.deleteAllPathInMap();
  var json = {
    "visitEmpId": this.visitEmpId,
    "attDate": vd,
    "empId": this.empId,
    "empRole": this.empRole,
    "tenentId": this.tenentId
  }
  this.ss.getAttendanceDetails(json)
    .subscribe(
      (response) => {
        if (response.responseCode == Constant.responseCode) {
          this.attlist = response.wrappedList;
          if(this.attlist.length != 0){
            this.workingHrs = this.attlist[0].wrkTime;
            this.addAttendanceLocationInMap();
          }
          
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

gotoRegisteredLocation(m,j){
  jQuery('.firstColorLocClass').removeClass('regLocClass');
  jQuery('.secondColorLocClass').removeClass('regLocClass');
  jQuery('#reg_'+(m.regId)).addClass('regLocClass');
  var marker = this.regMarkers[j];
  var regbounds = new google.maps.LatLngBounds();
  var regloc = new google.maps.LatLng(+(m.lat),+(m.lng));
  regbounds.extend(regloc);
  this.map.fitBounds(regbounds);
 /* var marker = new google.maps.Marker({
    position: regloc,
    title: m.locName,
    icon: 'http://www.in3.co.in:4125/FieldForce/PortalApi/Files/reg.png'
  });
  */
  var infoWindow = new google.maps.InfoWindow({content: m.infoView, position: regloc}); infoWindow.open(this.map,marker);
 
 // var regloc = new google.maps.LatLng(+(m.lat),+(m.lng));
 // this.map.setZoom(18);
  //this.map.panTo(regloc);
}

  getTeamList(){
    this.spinner.show();
    var json = {
      "empId": this.empId,
      "empRole": this.empRole,
      "tenentId": this.tenentId
    }
    this.ss.getTeamList(json)
      .subscribe(
        (response) => {
          if (response.responseCode == Constant.responseCode) {
            this.teamList = response.wrappedList;
            //console.log(this.teamList);
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

  addMarker(location,place,infoView) {
    var iconUrl = "";
    var aniType = google.maps.Animation.DROP;
    if(place == "start"){
      iconUrl =  'http://www.in3.co.in/in3.co.in/FieldForce/PortalApi/Files/start.png';
      aniType = google.maps.Animation.BOUNCE;
    }
    else if(place == "stop"){
      iconUrl =  'http://www.in3.co.in/in3.co.in/FieldForce/PortalApi/Files/stop.png';
      aniType = google.maps.Animation.BOUNCE;
    }
    else{
      iconUrl =  'http://www.in3.co.in/in3.co.in/FieldForce/PortalApi/Files/visit.png';

      this.visitNo = this.visitNo + 1;
    }
    var marker = new google.maps.Marker({
      position: location,
      title: place,
      icon: iconUrl,
      animation: aniType
    });
   // if(place != "start" && place !="stop"){
      var infowindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', (function(marker) {
      return function() {
        infowindow.setContent(infoView);
        infowindow.open(this.map, marker);
      }
      })(marker));
   // }
    

    this.markers.push(marker);
   
  }
  addAttendanceMarker(location,place,infoView) {
    var iconUrl = "";
    var aniType = google.maps.Animation.DROP;
    if(place == "start"){
      iconUrl =  'http://www.in3.co.in/in3.co.in/FieldForce/PortalApi/Files/start.png';
     // aniType = google.maps.Animation.BOUNCE;
    }
    else if(place == "stop"){
      iconUrl =  'http://www.in3.co.in/in3.co.in/FieldForce/PortalApi/Files/stop.png';
     // aniType = google.maps.Animation.BOUNCE;
    }
    var marker = new google.maps.Marker({
      position: location,
      title: place,
      icon: iconUrl,
      animation: aniType
    });
      var infowindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', (function(marker) {
      return function() {
        infowindow.setContent(infoView);
        infowindow.open(this.map, marker);
      }
      })(marker));
    

    this.markers.push(marker);
   
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  clearMarkers() {
    this.setMapOnAll(null);
  }

  showMarkers() {
    this.setMapOnAll(this.map);
  }


  addregMarker(loc,place,infoView){
    var marker = new google.maps.Marker({
      position: loc,
      title: place,
//icon: "http://in3.co.in:4125/FieldForce/PortalApi/Files/reg.jpg",
     // label: 'R',
      icon: 'http://www.in3.co.in/in3.co.in/FieldForce/PortalApi/Files/reg.png'
     // animation: google.maps.Animation.BOUNCE
    });
    var infowindow = new google.maps.InfoWindow();
    google.maps.event.addListener(marker, 'click', (function(marker) {
      return function() {
        infowindow.setContent(infoView);
        infowindow.open(this.map, marker);
      }
    })(marker));
    this.regMarkers.push(marker);
  }

  deleteRegMarkers() {
    this.clearRegMarkers();
    this.regMarkers = [];
  }

  showRegMarkers(){
    this.setMapOnAllReg(this.map);
  }

  clearRegMarkers() {
    this.setMapOnAllReg(null);
  }

  setMapOnAllReg(map){
    for (var i = 0; i < this.regMarkers.length; i++) {
      this.regMarkers[i].setMap(map);
    }
  }

  addPolyLines(location){
    this.flightPlanCoordinates.push(location);
  }

  createAndShowPolylines(){
    this.flightPath = new google.maps.Polyline({
      path: this.flightPlanCoordinates,
      geodesic: true,
      strokeColor: "#FF0000",
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
  
    this.flightPath.setMap(this.map);
  }

  clearPolyLines(){
      this.flightPath.setMap(null);
  }

  deletePolyLines(){
    this.clearPolyLines();
    this.flightPlanCoordinates = [];
  }
}
