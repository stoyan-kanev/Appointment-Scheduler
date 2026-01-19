import {Routes} from '@angular/router';
import {HomeComponent} from './home/home';
import {BarberComponent} from './barber/barber';
import {ContactUsComponent} from './contact-us/contact-us';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'barbers', component: BarberComponent},
    {path: 'contact-us', component: ContactUsComponent},
    // {path: 'about', component: AboutComponent},
    // {path: 'login', component: LoginComponent},
    // {path: 'team', component: TeamComponent},
    // {path: 'services', component: AppointmentServicesComponent},
];
