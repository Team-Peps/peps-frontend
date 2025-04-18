import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '@/environments/environment';
import {Ambassador} from '../models/ambassador';
import {Cacheable, LocalStorageStrategy} from 'ts-cacheable';

@Injectable({
	providedIn: 'root'
})
export class AmbassadorService {

	constructor(
		private http: HttpClient
	) {}

	@Cacheable({
		maxAge: 7 * 24 * 60 * 60 * 1000,
		storageStrategy: LocalStorageStrategy,
		cacheKey: 'allAmbassadors',
	})
	getAllAmbassadors(): Observable<Ambassador[]> {
		return this.http.get<Ambassador[]>(`${environment.backendUrl}/ambassador`);
	}

}
