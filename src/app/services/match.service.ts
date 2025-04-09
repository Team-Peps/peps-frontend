import { environment } from "../../environment/environment";
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Match, MatchGroupByDate} from '../models/match';
import {Cacheable, LocalStorageStrategy} from 'ts-cacheable';

@Injectable({
	providedIn: 'root'
})
export class MatchService {

	constructor(
		private http: HttpClient
	) {}

	@Cacheable({
		maxAge: 60 * 60 * 1000,
		storageStrategy: LocalStorageStrategy
	})
	getCurrentMatch(): Observable<Match> {
		return this.http.get<Match>(`${environment.backendUrl}/match/current`);
	}

	getUpcomingMatches(): Observable<MatchGroupByDate[]> {
		return this.http.get<MatchGroupByDate[]>(`${environment.backendUrl}/match/upcoming`);
	}
}
