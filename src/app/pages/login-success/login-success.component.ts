import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-login-success',
  imports: [],
  templateUrl: './login-success.component.html',
})
export class LoginSuccessComponent implements OnInit {
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private authService: AuthService
	) {}

	ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			const accessToken = params['access_token'];
			const refreshToken = params['refresh_token'];

			if (accessToken && refreshToken) {
				this.authService.storeTokens(accessToken, refreshToken);
				this.router.navigate(['/profile']);
			} else {
				this.router.navigate(['/login']);
			}
		});
	}
}
