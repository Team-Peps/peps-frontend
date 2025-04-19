import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@services/auth.service';
import {LoaderComponent} from '@components/loader/loader.component';

@Component({
	selector: 'app-login-success',
	imports: [
		LoaderComponent
	],
	templateUrl: './login-success.component.html',
})
export class LoginSuccessComponent implements OnInit {
	constructor(
		private readonly route: ActivatedRoute,
		private readonly router: Router,
		private readonly authService: AuthService
	) {}

	ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			const accessToken = params['access_token'];
			const refreshToken = params['refresh_token'];

			if (accessToken && refreshToken) {
				this.authService.storeTokens(accessToken, refreshToken);
				this.router.navigate(['/profile']);
			} else {
				this.router.navigate(['/']);
			}
		});
	}
}
