import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {environment} from '../../environment/environment';
import {Observable, tap} from 'rxjs';
import {User} from '../models/user';
import {catchError} from 'rxjs/operators';
import {Authenticate} from '../models/authenticate';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(
		private http: HttpClient,
		private readonly router: Router,
	) {}

	public getUserProfile(): Observable<User> {
		return this.http.get<User>(`${environment.backendUrl}/user/me`);
	}

	public storeTokens(accessToken: string, refreshToken: string): void {
		sessionStorage.setItem('access_token', accessToken);
		sessionStorage.setItem('refresh_token', refreshToken);
	}

	public getToken(): string {
		return <string>sessionStorage.getItem('access_token');
	}

	public getRefreshToken(): string {
		return <string>sessionStorage.getItem('refresh_token');
	}

	public isLoggedIn(): boolean {
		return !!this.getToken();
	}

	public logout() {
		this.http.post(`${environment.backendUrl}/auth/logout`, {}).subscribe(
			() => {
				this.destroyToken();
				this.router.navigate(['/login']);
			}
		);
	}

	private destroyToken(): void {
		sessionStorage.removeItem('access_token');
		sessionStorage.removeItem('refresh_token');
	}

	refreshToken(): Observable<any> {
		const refreshToken = sessionStorage.getItem('refresh_token');

		if(!refreshToken) {
			this.logout();
		}

		const headers = new HttpHeaders({
			'Authorization': `Bearer ${refreshToken}`,
			'Content-Type': 'application/json'
		});
		return this.http.post<Authenticate>(`${environment.backendUrl}/auth/refresh-token`, {}, {headers}).pipe(
			tap((tokens: Authenticate) => {
				sessionStorage.setItem('access_token', tokens.access_token);
				sessionStorage.setItem('refresh_token', tokens.refresh_token);
			}),
			catchError((error) => {
				this.logout();
				throw error;
			})
		);

	}
}
