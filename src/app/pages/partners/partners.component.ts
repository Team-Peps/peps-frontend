import {Component, OnInit} from '@angular/core';
import {TitleComponent} from '../../core/components/title/title.component';
import {PartnerService} from '../../services/partner.service';
import {Partner} from '../../models/partner';
import {PartnerCardComponent} from '../../core/components/partner-card/partner-card.component';
import {ButtonComponent} from '../../core/components/buttons/button/button.component';
import {DomSanitizer, SafeResourceUrl, Title} from '@angular/platform-browser';
import {environment} from '../../../environment/environment';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-partners',
	imports: [
		TitleComponent,
		PartnerCardComponent,
		ButtonComponent,
		TranslatePipe,
	],
  templateUrl: './partners.component.html',
})
export class PartnersComponent implements OnInit {

	constructor(
		private readonly partnerService: PartnerService,
		private sanitizer: DomSanitizer,
		private readonly titleService: Title,
		private readonly translate: TranslateService,
	) {	}

	partners: Partner[] = [];
	video: string = 'CLIP_SPONSO.mp4';
	isPlaying = false;
	minioBaseUrl = environment.minioBaseUrl;

	ngOnInit(): void {
		this.titleService.setTitle(this.translate.instant('page.partners.title'));
		this.loadPartners();
    }

	loadPartners(): void {
		this.partnerService.getPartners().subscribe({
			next: (partners) => {
				this.partners = partners;
			},
			error: (error) => {
				console.error('Error fetching partners:', error);
			}
		});
	}

	toContactEmail() {
		const email = 'contact.teampeps@gmail.com\n';
		window.location.href = `mailto:${email}`;
	}

	get embedUrl(): SafeResourceUrl {
		const url = this.minioBaseUrl + 'videos/' + this.video;
		return this.sanitizer.bypassSecurityTrustResourceUrl(url);
	}

	play() {
		this.isPlaying = true;
	}
}
