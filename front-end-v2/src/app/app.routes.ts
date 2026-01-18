import {Routes} from '@angular/router';
import {HomeComponent} from './home/home';
import {BarberComponent} from './barber/barber';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'barbers', component: BarberComponent},
    // {path: 'book', component: CalendarComponent},
    // {path: 'about', component: AboutComponent},
    // {path: 'login', component: LoginComponent},
    // {path: 'team', component: TeamComponent},
    // {path: 'services', component: AppointmentServicesComponent},
];
