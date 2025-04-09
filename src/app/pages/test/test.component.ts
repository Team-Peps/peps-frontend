import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {ButtonComponent} from '../../core/components/buttons/button/button.component';
import {ButtonSmallComponent} from '../../core/components/buttons/button-small/button-small.component';
import {ButtonSimpleComponent} from '../../core/components/buttons/button-simple/button-simple.component';
import {DropdownButtonComponent} from '../../core/components/buttons/dropdown-button/dropdown-button.component';
import {CheckboxComponent} from '../../core/components/checkbox/checkbox.component';
import {LogoComponent} from '../../core/components/logo/logo.component';
import {MaxButtonComponent} from '../../core/components/buttons/max-button/max-button.component';
import {HeadbandTwitchComponent} from '../../core/components/headband-twitch/headband-twitch.component';
import {ToggleComponent} from '../../core/components/toggle/toggle.component';
import {TitleComponent} from '../../core/components/title/title.component';
import {MatchRowComponent} from '../../core/components/match-row/match-row.component';
import {NewsCardComponent} from '../../core/components/news-card/news-card.component';
import {SliderComponent} from '../../core/components/slider/slider.component';
import { Game } from '../../models/game';

@Component({
  selector: 'app-test',
  imports: [
	  ButtonComponent,
	  ButtonSmallComponent,
	  ButtonSimpleComponent,
	  DropdownButtonComponent,
	  CheckboxComponent,
	  LogoComponent,
	  MaxButtonComponent,
	  HeadbandTwitchComponent,
	  ToggleComponent,
	  TitleComponent,
	  MatchRowComponent,
	  NewsCardComponent,
	  SliderComponent,
  ],
  templateUrl: './test.component.html',
})
export class TestComponent {

	constructor(
		private readonly router: Router,
	) {
	}

	items = [
		{ label: 'Overwatch', action: () => this.toggleStatus(true), image: 'assets/icons/Overwatch_2_logo.svg' },
		{ label: 'Marvel Rivals', action: () => this.toggleStatus(false), image: 'assets/icons/Marvel_Rivals_logo.svg' },
	];

	itemsSlider = [
		{ index: 0, link: "", images: { sm:'/assets/images/img1-mobile.png', lg:'assets/images/img1.png'} },
		{ index: 1, link: "", images: { sm:'/assets/images/img1-mobile.png', lg:'assets/images/img1.png'} },
		{ index: 2, link: "", images: { sm:'/assets/images/img1-mobile.png', lg:'assets/images/img1.png'} },
	];

	checked = false;

	toggleStatus(isActive: boolean) {
		console.log('Status changé vers', isActive);
	}

	toggleCheck() {
		console.log('Check changé');
	}

	protected readonly Game = Game;
}
