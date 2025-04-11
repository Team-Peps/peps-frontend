import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environment/environment';
import {Ambassador} from '../models/ambassador';

@Injectable({
	providedIn: 'root'
})
export class AmbassadorService {

	constructor(
		private http: HttpClient
	) {}

	getAllAmbassadors(): Observable<Ambassador[]> {
		return this.http.get<Ambassador[]>(`${environment.backendUrl}/ambassador`);
	}

}
