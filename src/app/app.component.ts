import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from '@components/navbar/navbar.component';
import {FooterComponent} from '@components/footer/footer.component';
import {ToastContainerComponent} from '@components/toast-container/toast-container.component';
import {TranslateService} from '@ngx-translate/core';
import defaultLanguage from	'../../public/assets/i18n/fr.json';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, NavbarComponent, FooterComponent, ToastContainerComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {

	constructor(
		private readonly translate: TranslateService
	) {
		translate.setTranslation('fr', defaultLanguage);
		translate.addLangs(['fr', 'en']);
		translate.setDefaultLang('fr');

		const storedLang = localStorage.getItem('lang');
		const browserLang = translate.getBrowserLang();

		const langToUse = storedLang ?? (browserLang && translate.getLangs().includes(browserLang) ? browserLang : 'fr');

		translate.use(langToUse);
		localStorage.setItem('lang', langToUse);
	}
}
