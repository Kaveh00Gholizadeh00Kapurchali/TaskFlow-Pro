import { Routes } from '@angular/router';

import { MainPage } from './main-page/main-page';
import { CreateTask } from './create-task/create-task';
import { Dummy } from './dummy/dummy';
import { CreateUser } from './create-user/create-user';
import { Login } from './login/login';

import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {path:'', component: MainPage, canActivate:[authGuard]},
    {path:'tasks/add', component: CreateTask, canActivate:[authGuard]},
   // {path:'tasks/manage', component: ManageTask, caActivate:[authGuard]},
    {path:'dummy', component: Dummy},
    {path:'users/add', component: CreateUser},
    {path:'login' , component: Login},
];
