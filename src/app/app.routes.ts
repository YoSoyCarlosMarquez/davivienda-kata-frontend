import { Routes } from '@angular/router';
import { Login } from './login/login';
import { Register } from './register/register';
import { Home } from './home/home';
import { Create } from './surveys/create/create';
import { List } from './surveys/list/list';
import { Show } from './surveys/show/show';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: 'show-survey', component: Show },
    { path: 'home', component: Home, children: [
        { path: '', component: List },
        { path: 'list-survey', component: List },
        { path: 'create-survey', component: Create },
    ] },
];
