import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './core/components/navbar/navbar.component';
import {HeadbandTwitchComponent} from './core/components/headband-twitch/headband-twitch.component';
import {FooterComponent} from './footer/footer.component';

@Component({
  selector: 'app-root',
	imports: [RouterOutlet, NavbarComponent, HeadbandTwitchComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'peps-frontend';
}
