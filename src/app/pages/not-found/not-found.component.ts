import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
})
export class NotFoundComponent implements OnInit {
	constructor(
		private readonly titleService: Title,
	) {}

	ngOnInit(): void {
		this.titleService.setTitle('Team Peps - Page introuvable');
	}
}
