import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
	imports: [
		TranslatePipe
	],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent implements OnInit {
	constructor(
		private readonly titleService: Title,
		private readonly translate: TranslateService,
	) {}

	ngOnInit(): void {
		this.titleService.setTitle(this.translate.instant('page.not-found.title'));
	}
}
