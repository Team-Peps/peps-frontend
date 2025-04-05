import { Component } from '@angular/core';
import {ButtonSimpleComponent} from '../buttons/button-simple/button-simple.component';
import {DropdownButtonComponent} from '../buttons/dropdown-button/dropdown-button.component';
import {NgClass} from '@angular/common';
import {HeadbandTwitchComponent} from '../headband-twitch/headband-twitch.component';

@Component({
  selector: 'peps-navbar',
	imports: [
		ButtonSimpleComponent,
		DropdownButtonComponent,
		NgClass,
		HeadbandTwitchComponent
	],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {

	isMobileMenuOpen: boolean = false;

	itemsDropdownLang = [
		{ label: 'FR', action: () => {}, image: 'assets/icons/flags/flag_fr.svg' },
	];

	itemsDropdownGames = [
		{ label: 'Overwatch', action: () => {}, image: 'assets/icons/Overwatch_2_logo.svg' },
		{ label: 'Marvel Rivals', action: () => {}, image: 'assets/icons/Marvel_Rivals_logo.svg' },
	];

	toggleMobileMenu() {
		this.isMobileMenuOpen = !this.isMobileMenuOpen;
	}
}
