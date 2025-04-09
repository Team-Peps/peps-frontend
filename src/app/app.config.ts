import {ApplicationConfig, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from '@angular/common/http';
import {DATE_PIPE_DEFAULT_OPTIONS} from '@angular/common';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideHttpClient(),
		provideRouter(routes),
		{
			provide: LOCALE_ID,
			useValue: 'fr-FR'
		}
	]
};
