import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../../api/sharedservice';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constant } from '../../../api/Constant';
import { ViewChild } from '@angular/core';
import * as $ from 'jquery';
declare var jQuery: any;


@Component({
  selector: 'app-visit-location',
  templateUrl: './visit-location.component.html',
  styleUrls: ['./visit-location.component.css']
})
export class VisitLocationComponent implements OnInit {

  visitbar = true;
  visitDate = "";
  visitNo: number;
  visitEmpId = "";
  visitDateList = [];
  mappedLocationList = [];
  visitlist = [];
  org: google.maps.LatLng;
  dest: google.maps.LatLng;
 // directionsDisplay: google.maps.DirectionsRenderer;
  waypt = [];
  //lat: Number;
  //log: Number;
  positions = [];

 // @ViewChild('map') mapElement: any;

  map: google.maps.Map;
  markers = [];
  regMarkers = [];
  flightPlanCoordinates = [];
  flightPath: google.maps.Polyline;
  // bounds: google.maps.LatLngBounds;
  // markers = [
  //   {
  //     position: new google.maps.LatLng(28.658464, 77.366008),
  //     map: this.map,
  //     title: "Marker 1"
  //   },
  //   {
  //     position: new google.maps.LatLng(28.694808,77.266775),
  //     map: this.map,
  //     title: "Marker 2"
  //   }
  // ];
  //28.658464, 77.366008
  //28.694808,77.266775
  lat: number = 28.658464;
  lng: number = 77.366008;

  lat1: number = 28.694808;
  lng1: number = 77.266775;
  zoom: number = 15;

  constructor(private router: Router, private ss: SharedService, private spinner: NgxSpinnerService, private activateRoute: ActivatedRoute) {
    this.activateRoute.
      params.
      subscribe(params => {
        //console.log(params);
        this.visitEmpId = params.empId;
        //console.log(this.visitEmpId);
      });
  }

  ngOnInit() {
    jQuery('#mapViewDivId').addClass('col-80');
      jQuery('#mapViewDivId').removeClass('col-100');
    var mapArea = document.getElementById('map');
    
    const mapProperties = {
      center: new google.maps.LatLng(23.195567, 78.827971),
      zoom: 4,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(mapArea, mapProperties);
   
    // var marker = new google.maps.Marker({
    //   // map: this.map,
    //    position: new google.maps.LatLng(28.687559, 77.280364),
    //    title: "Shahdara",
    //    animation: google.maps.Animation.BOUNCE
    //    // icon : mapIcon // remove when want default map icon
    //  });
    //  marker.setMap(this.map);
    // var marker = new google.maps.Marker({
    //  // map: this.map,
    //   position: new google.maps.LatLng(28.658464, 77.366008),
    //   title: "Sunrise Mall",
    //   animation: google.maps.Animation.BOUNCE
    //   // icon : mapIcon // remove when want default map icon
    // });
    // marker.setMap(this.map);
   // this.markers.push(marker);
    // var marker1 = new google.maps.Marker({
    //  // map: this.map,
    //   position: new google.maps.LatLng(28.694808, 77.266775),
    //   title: "Ghonda",
    //   animation: google.maps.Animation.BOUNCE
    //   //icon : mapIcon // remove when want default map icon
    // });
    // marker1.setMap(this.map);
    //this.markers.push(marker1);


    //   var mapIcon = {
    //     url: mapIconURL, // url
    //     scaledSize: new google.maps.Size(50, 50), // scaled size
    //     origin: new google.maps.Point(0,0), // origin
    //     anchor: new google.maps.Point(0, 0) // anchor
    // }

    //console.log(mapIcon);


    // marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';


    // google.maps.event.addListener(marker, 'click', function(){
    //     infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
    //     infoWindow.open($scope.map, marker);
    // });

    if (this.visitEmpId == null || this.visitEmpId == 'undefined' || this.visitEmpId == "") {
      ;
    }
    else {
      this.getEmpVisitDateAndMapLocations();
    }
    // this.lat = 6.05246325;
    // this.log = 9.01555559;

    // this.positions = [{
    //                 //"post_country": "Kyrgyzstan",
    //                 "lat": 28.694808,
    //                 "lng": 77.266775
    //             }];
    // for(var i = 0; i< this.positions.length;i++){
    //   this.lat = this.positions[i].lat;
    //   this.lng = this.positions[i].lng;
    // }

  }


  getEmpVisitDateAndMapLocations() {
    this.deleteRegMarkers();
    this.spinner.show();
    var json = {
      "visitEmpId": this.visitEmpId,
      "empId": sessionStorage.getItem('empId'),
      "empRole": sessionStorage.getItem('empRole')
    }
    this.ss.getEmpVisitDateAndMapLocations(json)
      .subscribe(
        (response) => {
          if (response.responseCode == Constant.responseCode) {
            this.visitDateList = response.wrappedList[0].visitDateList;
            this.mappedLocationList = response.wrappedList[0].regLocationList;
            this.addMappedLocationInMap();
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

  // viewOnMap(m){
  //   this.regMarker = new google.maps.Marker({
  //     position: new google.maps.LatLng(+m.lat,+m.lng),
  //     title: m.locName,
  //     animation: google.maps.Animation.BOUNCE
  //    // map: map
  //   });
  //   this.regMarker.setMap(this.map);
  // }

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

  addVisitLocationInMap(){
    var bounds = new google.maps.LatLngBounds();
    for(var v=0;v < this.visitlist.length;v++){
            
        var loc = new google.maps.LatLng(+(this.visitlist[v].lat),+(this.visitlist[v].lng));
       // console.log(loc);
        var place = this.visitlist[v].location;
        var infoView = this.visitlist[v].infoView;
       // var stat = this.visitlist[v].stat;
        bounds.extend(loc);
        this.addMarker(loc,place,infoView);
        this.addRoutePath(v,loc);
       // this.calculateDistanceCovered(v,(v+1));
        
    }
    this.showMarkers();
    this.map.fitBounds(bounds);
    this.addPathInMap();
    // this.createAndShowPolylines();
    this.spinner.hide();
  }
  calculateDistanceCovered(o,d){
   
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

  calculateAndDisplayRoute(directionsService,directionsDisplay){
    directionsService.route({
      origin: this.org,
      destination: this.dest,
      waypoints:this.waypt,
      optimizeWaypoints: true,
      travelMode: 'DRIVING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
          alert('Directions request failed due to ' + status);
      }
    });
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
  addPathInMap(){
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(this.map);
    directionsDisplay.setOptions( { suppressMarkers: true } );
    this.calculateAndDisplayRoute(directionsService,directionsDisplay);
  }
  deleteAllPathInMap(){
    //this.directionsDisplay.setMap(null);
    this.waypt = [];
  }

  getVisitList(vd){
    this.visitDate = vd;
 //   alert(vd);
 this.visitNo = 0;
 jQuery('.firstColorClass').removeClass('visitDateClass');
 jQuery('.secondColorClass').removeClass('visitDateClass');
 jQuery('#vdate_'+vd).addClass('visitDateClass');
 this.spinner.show();
 this.deleteMarkers();
 this.deleteAllPathInMap();
    var json = {
      "visitEmpId": this.visitEmpId,
      "visitDate": vd,
      "empId": sessionStorage.getItem('empId'),
      "empRole": sessionStorage.getItem('empRole')
    }
    this.ss.getVisitDetails(json)
      .subscribe(
        (response) => {
          if (response.responseCode == Constant.responseCode) {
            // this.visitDateList = response.wrappedList[0].visitDateList;
            this.visitlist = response.wrappedList;
            this.addVisitLocationInMap();
            
           
            // var bounds = new google.maps.LatLngBounds();
            // for(var m=0;m < this.visitlist.length;m++){
              
            //    var loc = new google.maps.LatLng(+(this.mappedLocationList[m].lat),+(this.mappedLocationList[m].lng));
            //    var place = this.mappedLocationList[m].location;
            //    bounds.extend(loc);
            //    this.addMarker(loc,place);
            //    this.addPolyLines(loc);
              
            //    //this.flightPlanCoordinates.push(loc);
            //   /* if(m == 0){
            //     this.map.setZoom(18);
            //     this.map.panTo(loc);
            //   }*/
              
              
            // }
            // this.showRegMarkers();
            // this.map.fitBounds(bounds);
           // this.createAndShowPolylines();
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
  /*
  getMappedLocation(vd) {
    this.spinner.show();
    this.deleteMarkers();
   // this.deletePolyLines();
    this.flightPlanCoordinates = [];
    var json = {
      "visitEmpId": this.visitEmpId,
      "visitDate": vd,
      "empId": sessionStorage.getItem('empId'),
      "empRole": sessionStorage.getItem('empRole')
    }
    this.ss.getMappedLocation(json)
      .subscribe(
        (response) => {
          if (response.responseCode == Constant.responseCode) {
            // this.visitDateList = response.wrappedList[0].visitDateList;
            this.mappedLocationList = response.wrappedList;
            var bounds = new google.maps.LatLngBounds();
            for(var m=0;m < this.mappedLocationList.length;m++){
              
               var loc = new google.maps.LatLng(+(this.mappedLocationList[m].lat),+(this.mappedLocationList[m].lng));
               var place = this.mappedLocationList[m].location;
               bounds.extend(loc);
               this.addMarker(loc,place,stat);
               this.addPolyLines(loc);
              
               //this.flightPlanCoordinates.push(loc);
               if(m == 0){
                this.map.setZoom(18);
                this.map.panTo(loc);
              }
              
              
            }
            this.showRegMarkers();
            this.map.fitBounds(bounds);
           // this.createAndShowPolylines();
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

  */

  addMarker(location,place,infoView) {
    var iconUrl = "";
    var aniType = google.maps.Animation.DROP;
    if(place == "start"){
      iconUrl =  'http://www.in3.co.in:4125/FieldForce/PortalApi/Files/start.png';
      aniType = google.maps.Animation.BOUNCE;
    }
    else if(place == "stop"){
      iconUrl =  'http://www.in3.co.in:4125/FieldForce/PortalApi/Files/stop.png';
      aniType = google.maps.Animation.BOUNCE;
    }
    else{
      iconUrl =  'http://www.in3.co.in:4125/FieldForce/PortalApi/Files/visit.png';

      this.visitNo = this.visitNo + 1;
    }
    var marker = new google.maps.Marker({
      position: location,
      title: place,
      icon: iconUrl,
      animation: aniType
    });
    if(place != "start" && place !="stop"){
      var infowindow = new google.maps.InfoWindow();
      google.maps.event.addListener(marker, 'click', (function(marker) {
      return function() {
        infowindow.setContent(infoView);
        infowindow.open(this.map, marker);
      }
      })(marker));
    }
    

    this.markers.push(marker);
   
  }

  addregMarker(loc,place,infoView){
    var marker = new google.maps.Marker({
      position: loc,
      title: place,
//icon: "http://in3.co.in:4125/FieldForce/PortalApi/Files/reg.jpg",
     // label: 'R',
      icon: 'http://www.in3.co.in:4125/FieldForce/PortalApi/Files/reg.png'
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

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  setMapOnAllReg(map){
    for (var i = 0; i < this.regMarkers.length; i++) {
      this.regMarkers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
  }

  clearRegMarkers() {
    this.setMapOnAllReg(null);
  }

  showMarkers() {
    this.setMapOnAll(this.map);
  }

  showRegMarkers(){
    this.setMapOnAllReg(this.map);
  }

  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }
  deleteRegMarkers() {
    this.clearRegMarkers();
    this.regMarkers = [];
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

}
