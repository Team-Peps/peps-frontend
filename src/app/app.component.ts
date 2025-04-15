import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {NavbarComponent} from './core/components/navbar/navbar.component';
import {FooterComponent} from './core/components/footer/footer.component';
import {ToastContainerComponent} from './core/components/toast-container/toast-container.component';

@Component({
	selector: 'app-root',
	imports: [RouterOutlet, NavbarComponent, FooterComponent, ToastContainerComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Team Peps';
}
