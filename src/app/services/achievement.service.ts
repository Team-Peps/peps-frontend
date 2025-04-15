import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cacheable, LocalStorageStrategy} from 'ts-cacheable';
import {Observable} from 'rxjs';
import {environment} from '../../environment/environment';
import {Game} from '../models/game';
import {Achievement} from '../models/achievement';

@Injectable({
	providedIn: 'root'
})
export class AchievementService {

	constructor(
		private http: HttpClient
	) {}

	@Cacheable({
		maxAge: 7 * 24 * 60 * 60 * 1000,
		storageStrategy: LocalStorageStrategy,
		cacheKey: 'allAchievementsByGame',
		maxCacheCount: 2
	})
	getAllAchievementByGame(game: Game): Observable<Achievement[]> {
		return this.http.get<Achievement[]>(`${environment.backendUrl}/achievement/game/${game}`);
	}

}
