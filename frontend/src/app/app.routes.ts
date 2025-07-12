import {Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {CalendarComponent} from './home/calendar.component';
import {AboutComponent} from './about/about.component';

export const routes: Routes = [
    {path: 'reserve', component: CalendarComponent},
    {path: 'about', component: AboutComponent},
    {path: 'login', component: LoginComponent},
];
