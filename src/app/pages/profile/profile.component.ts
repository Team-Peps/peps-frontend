import {Component, OnInit} from '@angular/core';
import {AuthService} from '@services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
	user: any;
	error: string | null = null;

	constructor(
		private readonly authService: AuthService
	) {}

	ngOnInit(): void {
		this.authService.getUserProfile().subscribe({
			next: (data) => {
				this.user = data;
			},
			error: (error) => {
				this.error = error.error.message ?? 'Failed to load user profile';
			}
		});
	}

	logout() {
		this.authService.logout();
	}
}
