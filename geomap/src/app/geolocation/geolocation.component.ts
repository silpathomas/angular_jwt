import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Geolocation } from '../model/geolocation.model';
import { AuthService } from '../services/auth.service';
import { LocationsService } from '../services/locations.service';


import { ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.css']
})
export class GeolocationComponent implements AfterViewInit {
  constructor(private locationsService: LocationsService){}
  @ViewChild("mapContainer", { static: false })
  gmap!: ElementRef;
  map!: google.maps.Map;
  lat = 23.8103;
  lng = 90.4125;
  errorMessage="";
  sucessMessage="";
  loadedLocation: Geolocation[] = [];
  //Coordinates to set the center of the map
  coordinates = new google.maps.LatLng(this.lat, this.lng);
  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8,
  };
  //Default Marker
  marker = new google.maps.Marker({
    position: this.coordinates,
    map: this.map,
    title: "Dhaka",
    animation:google.maps.Animation.DROP
  });
  ngAfterViewInit(): void {
    this.mapInitializer();
  }
  mapInitializer(): void {
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
     //Adding Click event to default marker
     this.marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: "Dhaka"
      });
      infoWindow.open(this.map, this.marker);
    });
  
    //Adding default marker to map
    this.marker.setMap(this.map);
    this.fetch_locations();
  }
  private fetch_locations() {
    this.locationsService.list_locations().subscribe({
      next: (result: any) => {
        this.loadedLocation = result;
        console.log(this.loadedLocation)
        this.loadAllMarkers()
        
      },
      error: (err: any) => {
        this.errorMessage = err.error.details;
        },
        complete: () => {
          console.log('complete');
          }
        });
      } 
      loadAllMarkers() {
      this.loadedLocation.forEach(markerInfo => {
      //Creating a new marker object
      const marker = new google.maps.Marker({
          position: new google.maps.LatLng( markerInfo.Latitude,markerInfo.Longitude),
          map: this.map,
          title: markerInfo.Name
      });
      // //Add click event to open info window on marker
              // marker.addListener("click", () => {
              //   infoWindow.open(this.map, marker);
              // });
              // const infoWindow = new google.maps.InfoWindow();
              // marker.addListener("click", () => {
              //   infoWindow.close();
              //   infoWindow.setContent(marker.getTitle());
              //   infoWindow.open(marker.getMap(), marker);
              // });


      //Adding marker to google map
      console.log(marker)
      marker.setMap(this.map);
    });
  }

  
}

