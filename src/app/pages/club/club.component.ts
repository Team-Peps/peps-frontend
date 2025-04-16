import {Component, OnInit} from '@angular/core';
import {SeparatorComponent} from '../../core/components/separator/separator.component';
import {ButtonComponent} from '../../core/components/buttons/button/button.component';
import {ButtonSmallComponent} from '../../core/components/buttons/button-small/button-small.component';
import {Title} from '@angular/platform-browser';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
	selector: 'app-club',
	imports: [
		SeparatorComponent,
		ButtonComponent,
		ButtonSmallComponent,
		TranslatePipe
	],
	templateUrl: './club.component.html',
	styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

	constructor(
		private readonly titleService: Title,
		protected readonly translate: TranslateService
	) {}

	ngOnInit(): void {
		this.titleService.setTitle(this.translate.instant('page.club.title'));
	}

	currentSlide = 0;
	slideWidth = 42;
	tabletWidth = 40
	mobileWidth = 30

	nextSlide() {
		if (this.currentSlide < 3) {
			this.currentSlide++;
		}
	}

	prevSlide() {
		if (this.currentSlide > 0) {
			this.currentSlide--;
		}
	}
}
