import {AuthService} from '../../services/auth.service';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, RouterStateSnapshot} from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate, CanActivateChild {

	constructor(
		private readonly authService: AuthService
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if(this.authService.isAuthenticated()) {
			return true;
		} else {
			this.authService.logout();
			return false;
		}
	}

	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.canActivate(childRoute, state);
	}
}
