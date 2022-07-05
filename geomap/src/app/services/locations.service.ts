import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Geolocation } from '../model/geolocation.model';


@Injectable({
  providedIn: 'root'
})
export class LocationsService {
 	constructor(private http: HttpClient) { }
    // Fetching  all locations
	list_locations() {
	return this.http
		.get<Geolocation[]>(environment.host + 'api/geolocation/list');
	}
}
