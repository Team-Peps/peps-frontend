import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Toast} from '../models/toast';

@Injectable({ providedIn: 'root' })
export class ToastService {

	private toastsSubject = new BehaviorSubject<Toast[]>([]);
	toasts$ = this.toastsSubject.asObservable();

	private counter = 0;
	private lastToastMessage = '';
	private lastToastTimestamp = 0;
	private toastCooldown = 1000;

	show(message: string, type: Toast['type'] = 'info', duration: number = 3000) {
		const now = Date.now();

		if (message === this.lastToastMessage && now - this.lastToastTimestamp < this.toastCooldown) {
			return;
		}

		this.lastToastMessage = message;
		this.lastToastTimestamp = now;

		const id = this.counter++;
		const toast: Toast = { id, message, type, duration };

		const current = this.toastsSubject.value;
		this.toastsSubject.next([...current, toast]);

		setTimeout(() => {
			this.dismiss(id);
		}, duration);
	}

	dismiss(id: number) {
		const current = this.toastsSubject.value.filter(t => t.id !== id);
		this.toastsSubject.next(current);
	}
}
