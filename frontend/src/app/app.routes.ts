import {Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {CalendarComponent} from './calendar/calendar.component';
import {AboutComponent} from './about/about.component';
import {HomeComponent} from './home/home.component';
import {TeamComponent} from './team/team.component';
import {AppointmentServicesComponent} from './appointment-services/appointment-services.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'book', component: CalendarComponent},
    {path: 'about', component: AboutComponent},
    {path: 'login', component: LoginComponent},
    {path: 'team', component: TeamComponent},
    {path: 'services', component: AppointmentServicesComponent},
];
