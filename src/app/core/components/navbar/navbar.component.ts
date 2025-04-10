import {Component, OnInit} from '@angular/core';
import {HeadbandTwitchComponent} from '../headband-twitch/headband-twitch.component';
import {MatchService} from '../../../services/match.service';
import {Match} from '../../../models/match';
import {DropdownButtonComponent} from '../buttons/dropdown-button/dropdown-button.component';
import {ButtonSimpleComponent} from '../buttons/button-simple/button-simple.component';
import {NgClass} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'peps-navbar',
	imports: [
		HeadbandTwitchComponent,
		DropdownButtonComponent,
		ButtonSimpleComponent,
		NgClass

	],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit {

	constructor(
		private readonly matchService: MatchService,
		private readonly router: Router,
	) {}

	currentMatch: Match | null = null;

	showTwitchBanner: boolean = true;
	isHomePage: boolean = false;
	isMobileMenuOpen: boolean = false;

	itemsDropdownLang = [
		{ label: 'FR', action: () => {}, image: 'assets/icons/flags/flag_fr.svg' },
	];

	itemsDropdownGames = [
		{ label: 'Overwatch', action: () => {}, image: 'assets/icons/Overwatch_2_logo.svg' },
		{ label: 'Marvel Rivals', action: () => {}, image: 'assets/icons/Marvel_Rivals_logo.svg' },
	];

	ngOnInit(): void {

		this.router.events.subscribe(event => {
			if (event instanceof NavigationEnd) {
				this.isHomePage = this.router.url === '/home' || this.router.url === '/';
				this.showTwitchBanner = sessionStorage.getItem('hideTwitchBanner') !== 'true';
			}
		});
		if(this.router.url === '/home' || this.router.url === '/') {
			this.matchService.getCurrentMatch().subscribe({
				next: (match) => {
					this.currentMatch = match;
				},
				error: (error) => {
					console.error('Error fetching current match:', error);
				}
			});
		}
    }

	closeTwitchBanner() {
		this.showTwitchBanner = false;
		sessionStorage.setItem('hideTwitchBanner', 'true');
	}

	toggleMobileMenu() {
		this.isMobileMenuOpen = !this.isMobileMenuOpen;
		if (this.isMobileMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	resetMobileMenu() {
		this.isMobileMenuOpen = false;
		document.body.style.overflow = '';
	}

	toNews() {
		this.router.navigate(['/news']);
		this.resetMobileMenu();
	}
}
