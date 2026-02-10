import {Routes} from '@angular/router';
import {HomeComponent} from './home/home';
import {BarberComponent} from './barber/barber';
import {ContactUsComponent} from './contact-us/contact-us';
import {AboutUsComponent} from './about-us/about-us';
import {BookNowComponent} from './book-now/book-now';
import {BarberPanelComponent} from './barber-dashboard/barber-dashboard';
import {BarberLoginComponent} from './barber-login/barber-login';
import {barberGuard} from './barber-login/guards';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'barbers', component: BarberComponent},
    {path: 'contact-us', component: ContactUsComponent},
    {path: 'about', component: AboutUsComponent},
    {path: 'book-now', component: BookNowComponent},
    { path: 'barber-panel', component: BarberPanelComponent, canActivate: [barberGuard] },
    { path: 'barber-login', component: BarberLoginComponent },

    // {path: 'login', component: LoginComponent},
    // {path: 'team', component: TeamComponent},
    // {path: 'services', component: AppointmentServicesComponent},
];
