import {Component, OnInit} from '@angular/core';
import {TitleComponent} from '../../core/components/title/title.component';
import {PartnerService} from '../../services/partner.service';
import {Partner} from '../../models/partner';
import {PartnerCardComponent} from '../../core/components/partner-card/partner-card.component';
import {ButtonComponent} from '../../core/components/buttons/button/button.component';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {environment} from '../../../environment/environment';

@Component({
  selector: 'app-partners',
	imports: [
		TitleComponent,
		PartnerCardComponent,
		ButtonComponent,
	],
  templateUrl: './partners.component.html',
})
export class PartnersComponent implements OnInit {

	constructor(
		private readonly partnerService: PartnerService,
		private sanitizer: DomSanitizer
) {	}

	partners: Partner[] = [];
	video: string = 'CLIP_SPONSO.mp4';
	isPlaying = false;
	minioBaseUrl = environment.minioBaseUrl;

	ngOnInit(): void {
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
