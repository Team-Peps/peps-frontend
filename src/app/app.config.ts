import {ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {HttpClient, provideHttpClient} from '@angular/common/http';
import {provideTranslateService, TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) => {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideHttpClient(),
		provideRouter(routes),
		{
			provide: LOCALE_ID,
			useValue: 'fr-FR'
		},
		importProvidersFrom([TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: httpLoaderFactory,
				deps: [HttpClient]
			}
		})])
	]
};
