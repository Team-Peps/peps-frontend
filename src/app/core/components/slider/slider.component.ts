import {
	AfterViewInit,
	Component,
	ElementRef,
	Input,
	OnInit,
	ViewChild
} from '@angular/core';
import { NgClass } from '@angular/common';
import { Slider } from '../../../models/slider';
import {environment} from '../../../../environment/environment';

@Component({
	selector: 'peps-slider',
	imports: [NgClass],
	templateUrl: './slider.component.html',
})
export class SliderComponent implements OnInit, AfterViewInit {

	@Input() sliders: Slider[] = [];

	@ViewChild('sliderTrack') sliderTrack!: ElementRef;

	minioBaseUrl = environment.minioBaseUrl;

	currentIndex: number = 0;
	autoSlideInterval: any;

	ngOnInit(): void {
		if (this.sliders.length > 0) {
			this.startAutoSlide();
		}
	}

	ngAfterViewInit(): void {
		this.updateSliderPosition();
	}

	startAutoSlide(): void {
		this.clearAutoSlide();
		this.autoSlideInterval = setInterval(() => {
			this.nextSlide(false);
		}, 5000);
	}

	clearAutoSlide(): void {
		if (this.autoSlideInterval) {
			clearInterval(this.autoSlideInterval);
			this.autoSlideInterval = null;
		}
	}

	prevSlide(): void {
		this.clearAutoSlide();
		this.currentIndex =
			this.currentIndex > 0 ? this.currentIndex - 1 : this.sliders.length - 1;
		this.updateSliderPosition();
		this.startAutoSlide();
	}

	nextSlide(reset: boolean = true): void {
		if (reset) this.clearAutoSlide();

		this.currentIndex =
			this.currentIndex < this.sliders.length - 1 ? this.currentIndex + 1 : 0;
		this.updateSliderPosition();

		if (reset) this.startAutoSlide();
	}

	goToSlide(index: number): void {
		this.clearAutoSlide();
		this.currentIndex = index;
		this.updateSliderPosition();
		this.startAutoSlide();
	}

	updateSliderPosition(): void {
		const offset = -this.currentIndex * window.innerWidth;
		if (this.sliderTrack?.nativeElement) {
			this.sliderTrack.nativeElement.style.transform = `translateX(${offset}px)`;
		}
	}
}
