import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {HeadbandTwitchComponent} from '../headband-twitch/headband-twitch.component';
import {MatchService} from '../../../services/match.service';
import {Match} from '../../../models/match/match';
import {DropdownButtonComponent} from '../buttons/dropdown-button/dropdown-button.component';
import {ButtonSimpleComponent} from '../buttons/button-simple/button-simple.component';
import {NgClass} from '@angular/common';
import {NavigationEnd, Router} from '@angular/router';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import { marker as _ } from '@colsen1991/ngx-translate-extract-marker';
import {Subscription} from 'rxjs';

@Component({
  selector: 'peps-navbar',
	imports: [
		HeadbandTwitchComponent,
		DropdownButtonComponent,
		ButtonSimpleComponent,
		NgClass,
		TranslatePipe
	],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent implements OnInit, OnDestroy {

	constructor(
		private readonly matchService: MatchService,
		private readonly router: Router,
		protected readonly translate: TranslateService,
		private readonly cdr: ChangeDetectorRef
	) {	}

	currentMatch: Match | null = null;

	showTwitchBanner: boolean = true;
	isHomePage: boolean = false;
	isMobileMenuOpen: boolean = false;

	itemsDropdownLang = [
		{ label: 'FR', action: () => this.useLanguage('fr'), image: 'assets/icons/flags/flag_fr.svg' },
		{ label: 'EN', action: () => this.useLanguage('en'), image: 'assets/icons/flags/flag_en.svg' },
	];

	itemsDropdownGames: { label: any; action: () => void; image: string }[] = [];
	langChangeSub!: Subscription;

	ngOnInit(): void {
		this.initDropdown()
		this.langChangeSub = this.translate.onLangChange.subscribe(() => {
			this.initDropdown();
		});
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

	ngOnDestroy(): void {
		if (this.langChangeSub) {
			this.langChangeSub.unsubscribe();
		}
	}

	useLanguage(lang: string) {
		this.translate.use(lang);
		localStorage.setItem('lang', lang);
		this.cdr.detectChanges();
	}

	initDropdown(): void {
		this.itemsDropdownGames = [
			{
				label: this.translate.instant('navbar.team.overwatch'),
				action: () => this.toOverwatch(),
				image: 'assets/icons/Overwatch_2_logo.svg',
			},
			{
				label: this.translate.instant('navbar.team.marvel-rivals'),
				action: () => this.toMarvelRivals(),
				image: 'assets/icons/Marvel_Rivals_logo.svg',
			}
		];
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

	toAmbassadors() {
		this.router.navigate(['/ambassadors']);
		this.resetMobileMenu();
	}

	toPartners() {
		this.router.navigate(['/partners']);
		this.resetMobileMenu();
	}

	toMatches() {
		this.router.navigate(['/matchs']);
		this.resetMobileMenu();
	}

	toClub() {
		this.router.navigate(['/club']);
		this.resetMobileMenu();
	}

	toOverwatch() {
		this.router.navigate(['/roster/overwatch']);
		this.resetMobileMenu();
	}

	toMarvelRivals() {
		this.router.navigate(['/roster/marvel-rivals']);
		this.resetMobileMenu();
	}
}
