import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environment/environment';
import {Observable} from 'rxjs';
import {Member} from '../models/member/member';

@Injectable({
	providedIn: 'root'
})
export class MemberService {

	constructor(
		private http: HttpClient
	) {}

	getMembers(game: String): Observable<Record<string, Member[]>> {
		return this.http.get<Record<string, Member[]>>(`${environment.backendUrl}/member/game/` + game);
	}
}
