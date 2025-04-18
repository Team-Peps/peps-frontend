import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '@/environments/environment';
import {Observable} from 'rxjs';
import {Member} from '../models/member/member';
import {Cacheable, LocalStorageStrategy} from 'ts-cacheable';

@Injectable({
	providedIn: 'root'
})
export class MemberService {

	constructor(
		private http: HttpClient
	) {}

	@Cacheable({
		maxAge: 12 * 60 * 60 * 1000,
		storageStrategy: LocalStorageStrategy,
		cacheKey: 'membersByGame',
		maxCacheCount: 2
	})
	getActiveMembers(game: String): Observable<Record<string, Member[]>> {
		return this.http.get<Record<string, Member[]>>(`${environment.backendUrl}/member/game/` + game + '/active');
	}

	@Cacheable({
		maxAge: 12 * 60 * 60 * 1000,
		storageStrategy: LocalStorageStrategy,
		cacheKey: 'membersByGameAndType',
		maxCacheCount: 20
	})
	getMemberById(id: string): Observable<Member> {
		return this.http.get<Member>(`${environment.backendUrl}/member/${id}`);
	}
}
