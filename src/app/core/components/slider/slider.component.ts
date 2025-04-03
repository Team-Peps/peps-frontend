import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  selector: 'peps-slider',
	imports: [
		NgClass

	],
  templateUrl: './slider.component.html',
})
export class SliderComponent implements OnInit, AfterViewInit {

	@Input() items: { index: number, link: string; images: { sm:string, lg:string } }[] = [];

	@ViewChild('sliderTrack') sliderTrack!: ElementRef;

	currentIndex: number = 0;
	autoSlideInterval: any;

	ngOnInit(): void {
		this.startAutoSlide();
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
		}
	}

	prevSlide(): void {
		this.clearAutoSlide();
		if (this.currentIndex > 0) {
			this.currentIndex--;
		} else {
			this.currentIndex = this.items.length - 1;
		}
		this.updateSliderPosition();
		this.startAutoSlide();
	}

	nextSlide(reset: boolean = true): void {
		if (reset) this.clearAutoSlide();

		if (this.currentIndex < this.items.length - 1) {
			this.currentIndex++;
		} else {
			this.currentIndex = 0;
		}
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
		this.sliderTrack.nativeElement.style.transform = `translateX(${offset}px)`;
	}

}
