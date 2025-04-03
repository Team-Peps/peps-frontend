import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgClass, UpperCasePipe} from '@angular/common';

@Component({
  selector: 'peps-dropdown-button',
	imports: [
		UpperCasePipe,
		NgClass
	],
  templateUrl: './dropdown-button.component.html',
})
export class DropdownButtonComponent implements OnInit, OnDestroy {

	  constructor() {}

	@Input() text: string = '';
	@Input() items: { label: string; action: () => void; image?: string }[] = [];
	@Input() isMobileNavbar = false;

	isOpen = false;
	isMobile = false;

	select(action: () => void) {
		action();
	}

	ngOnInit() {
		this.isMobile = window.innerWidth < 1024;
		window.addEventListener('resize', this.updateDeviceMode.bind(this));
	}

	ngOnDestroy() {
		window.removeEventListener('resize', this.updateDeviceMode.bind(this));
	}

	updateDeviceMode() {
		this.isMobile = window.innerWidth < 1024;
		if (!this.isMobile) this.isOpen = false;
	}

	handleClick() {
		if (this.isMobile) this.isOpen = !this.isOpen;
	}

}
