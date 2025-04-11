import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SeparatorComponent} from '../../core/components/separator/separator.component';
import {Ambassador} from '../../models/ambassador';
import {AmbassadorService} from '../../services/ambassador.service';
import {AmbassadorCardComponent} from '../../core/components/ambassador-card/ambassador-card.component';

@Component({
  selector: 'app-ambassadors',
	imports: [
		SeparatorComponent,
		AmbassadorCardComponent
	],
  templateUrl: './ambassadors.component.html',
})
export class AmbassadorsComponent implements OnInit {

	  constructor(
		private readonly ambassadorService: AmbassadorService,
	  ) { }

	@ViewChild('slider', { static: true }) sliderRef!: ElementRef;

	ambassadors: Ambassador[] = [];

	ngOnInit(): void {
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

		// scroll by the width of 1 card + gap
		const cardWidth = slider.querySelector('div')?.clientWidth || 300;
		const gap = 16; // px, comme gap-x-4
		const scrollAmount = cardWidth + gap;

		slider.scrollBy({ left: scrollAmount * direction, behavior: 'smooth' });
	}
}
