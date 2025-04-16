import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SeparatorComponent} from '../../core/components/separator/separator.component';
import {Ambassador} from '../../models/ambassador';
import {AmbassadorService} from '../../services/ambassador.service';
import {AmbassadorCardComponent} from '../../core/components/ambassador-card/ambassador-card.component';
import {Title} from '@angular/platform-browser';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-ambassadors',
	imports: [
		SeparatorComponent,
		AmbassadorCardComponent,
		TranslatePipe
	],
  templateUrl: './ambassadors.component.html',
})
export class AmbassadorsComponent implements OnInit {

	  constructor(
		private readonly ambassadorService: AmbassadorService,
		private readonly titleService: Title,
		protected readonly translate: TranslateService
	  ) {}

	@ViewChild('slider', { static: true }) sliderRef!: ElementRef;

	ambassadors: Ambassador[] = [];

	ngOnInit(): void {
		this.titleService.setTitle(this.translate.instant('page.ambassadors.title'));
		this.loadAmbassadors();
	}

	loadAmbassadors(): void {
		this.ambassadorService.getAllAmbassadors().subscribe({
			next: (ambassadors) => {
				this.ambassadors = ambassadors;
			},
			error: (error) => {
				console.error('Error fetching ambassadors:', error);
			}
		});
	}

	scrollSlider(direction: 1 | -1) {
		const slider = this.sliderRef.nativeElement as HTMLElement;

		const cardWidth = slider.querySelector('div')?.clientWidth || 300;
		const gap = 16;
		const scrollAmount = cardWidth + gap;

		slider.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
	}
}
