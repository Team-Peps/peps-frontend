import { Component } from '@angular/core';
import {ToastService} from '@services/toast.service';
import {AsyncPipe, NgClass} from '@angular/common';

@Component({
  selector: 'peps-toast-container',
	imports: [
		NgClass,
		AsyncPipe
	],
  templateUrl: './toast-container.component.html',
})
export class ToastContainerComponent {
	constructor(
		public toastService: ToastService
	) {}

}
