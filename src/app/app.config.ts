import {ApplicationConfig, importProvidersFrom, LOCALE_ID, provideZoneChangeDetection} from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import {HttpClient} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import {TokenInterceptorService} from './services/token-interceptor.service';

const httpLoaderFactory: (http: HttpClient) => TranslateHttpLoader = (http: HttpClient) => {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		provideHttpClient(
			withInterceptorsFromDi()
		),
		provideRouter(
			routes,
			withInMemoryScrolling({
				scrollPositionRestoration: 'enabled',
			})
		),
		{
			provide: LOCALE_ID,
			useValue: 'fr-FR'
		},
		importProvidersFrom(
			[TranslateModule.forRoot({
				loader: {
					provide: TranslateLoader,
					useFactory: httpLoaderFactory,
					deps: [HttpClient]
				}
			})]
		),
		{
			provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true
		}
	]
};
