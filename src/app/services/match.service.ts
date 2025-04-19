import {environment} from '@/environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Match} from '@models/match/match';
import {Cacheable, LocalStorageStrategy} from 'ts-cacheable';
import {Page} from '@models/page';
import {Game} from '@models/game';
import {MatchGroupByDate} from '@models/match/matchGroupByDate';

@Injectable({
	providedIn: 'root'
})
export class MatchService {

	constructor(
		private readonly http: HttpClient
	) {}

	@Cacheable({
		maxAge: 60 * 60 * 1000,
		storageStrategy: LocalStorageStrategy,
		cacheKey: 'currentMatch',
	})
	getCurrentMatch(): Observable<Match> {
		return this.http.get<Match>(`${environment.backendUrl}/match/current`);
	}

	@Cacheable({
		maxAge: 6 * 60 * 60 * 1000,
		storageStrategy: LocalStorageStrategy,
		cacheKey: '5upcomingMatches',
	})
	get5UpcomingMatches(): Observable<MatchGroupByDate[]> {
		return this.http.get<MatchGroupByDate[]>(`${environment.backendUrl}/match/upcoming/5`);
	}

	@Cacheable({
		maxAge: 6 * 60 * 60 * 1000,
		storageStrategy: LocalStorageStrategy,
		cacheKey: 'upcomingMatches',
		maxCacheCount: 10
	})
	getUpcomingMatches(page: number, filter: string[]): Observable<Page<MatchGroupByDate>> {
		return this.http.get<Page<MatchGroupByDate>>(`${environment.backendUrl}/match/upcoming?page=${page}&filter=${filter}`);
	}

	@Cacheable({
		maxAge: 6 * 60 * 60 * 1000,
		storageStrategy: LocalStorageStrategy,
		cacheKey: 'resultMatches',
		maxCacheCount: 10
	})
	getResultMatches(page: number, filter: string[]): Observable<Page<MatchGroupByDate>> {
		return this.http.get<Page<MatchGroupByDate>>(`${environment.backendUrl}/match/result?page=${page}&filter=${filter}`);
	}

	@Cacheable({
		maxAge: 6 * 60 * 60 * 1000,
		storageStrategy: LocalStorageStrategy,
		cacheKey: 'resultMatchesByGame',
		maxCacheCount: 2
	})
	getUpcomingMatchesByGame(game: Game): Observable<MatchGroupByDate[]> {
		return this.http.get<MatchGroupByDate[]>(`${environment.backendUrl}/match/upcoming/game/${game}`);
	}
}
