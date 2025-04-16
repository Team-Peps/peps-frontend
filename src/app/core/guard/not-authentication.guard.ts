import {Injectable} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class NotAuthenticatedGuard implements CanActivate, CanActivateChild {

	constructor(
		private readonly authService: AuthService,
		private readonly router: Router
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if(!this.authService.isAuthenticated()){
			return true;
		}
		this.router.navigate(['/'], { queryParams: { returnUrl: state.url } });
		return false;
	}

	canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.canActivate(childRoute, state);
	}
}
