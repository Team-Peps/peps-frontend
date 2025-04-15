import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Slider} from '../models/slider';
import {environment} from '../../environment/environment';
import {Cacheable, LocalStorageStrategy} from 'ts-cacheable';

@Injectable({
	providedIn: 'root'
})
export class SliderService {

	constructor(
		private http: HttpClient
	) {}

	@Cacheable({
		maxAge: 2 * 24 * 60 * 60 * 1000,
		storageStrategy: LocalStorageStrategy,
		cacheKey: 'sliders',
	})
	getAllActiveSlider(): Observable<Slider[]> {
		return this.http.get<Slider[]>(`${environment.backendUrl}/slider/active`);
	}
}
