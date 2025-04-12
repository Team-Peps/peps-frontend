import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environment/environment';
import {Partner} from '../models/partner';

@Injectable({
	providedIn: 'root'
})
export class PartnerService {

	constructor(
		private http: HttpClient
	) {	}

	getPartners(): Observable<Partner[]> {
		return this.http.get<Partner[]>(`${environment.backendUrl}/partner/active`);
	}

}
