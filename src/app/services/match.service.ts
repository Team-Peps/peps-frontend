import { environment } from "../../environment/environment";
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Match, MatchGroupByDate} from '../models/match';
import {Cacheable, LocalStorageStrategy} from 'ts-cacheable';
import {Page} from '../models/page';
import {Game} from '../models/game';

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

	@Cacheable({
		maxAge: 6 * 60 * 60 * 1000,
		storageStrategy: LocalStorageStrategy
	})
	get5UpcomingMatches(): Observable<MatchGroupByDate[]> {
		return this.http.get<MatchGroupByDate[]>(`${environment.backendUrl}/match/upcoming/5`);
	}

	@Cacheable({
		maxAge: 6 * 60 * 60 * 1000,
		storageStrategy: LocalStorageStrategy
	})
	getUpcomingMatches(page: number, filter: string[]): Observable<Page<MatchGroupByDate>> {
		return this.http.get<Page<MatchGroupByDate>>(`${environment.backendUrl}/match/upcoming?page=${page}&filter=${filter}`);
	}

	@Cacheable({
		maxAge: 6 * 60 * 60 * 1000,
		storageStrategy: LocalStorageStrategy,
	})
	getResultMatches(page: number, filter: string[]): Observable<Page<MatchGroupByDate>> {
		return this.http.get<Page<MatchGroupByDate>>(`${environment.backendUrl}/match/result?page=${page}&filter=${filter}`);
	}

	@Cacheable({
		maxAge: 6 * 60 * 60 * 1000,
		storageStrategy: LocalStorageStrategy
	})
	getUpcomingMatchesByGame(game: Game): Observable<MatchGroupByDate[]> {
		return this.http.get<MatchGroupByDate[]>(`${environment.backendUrl}/match/upcoming/game/${game}`);
	}
}
