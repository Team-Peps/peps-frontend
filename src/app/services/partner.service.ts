import { HttpClient } from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../environment/environment';
import {Partner} from '../models/partner';
import {Cacheable, LocalStorageStrategy} from 'ts-cacheable';

@Injectable({
	providedIn: 'root'
})
export class PartnerService {

	constructor(
		private http: HttpClient
	) {	}

	@Cacheable({
		maxAge: 5 * 24 * 60 * 60 * 1000,
		storageStrategy: LocalStorageStrategy,
		cacheKey: 'partners'
	})
	getPartners(): Observable<Partner[]> {
		return this.http.get<Partner[]>(`${environment.backendUrl}/partner/active`);
	}

}
