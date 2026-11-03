import { Routes } from '@angular/router';

import { MainPage } from './main-page/main-page';
import { CreateTask } from './create-task/create-task';
import { TaskManagement } from './task-management/task-management';
import { Dummy } from './dummy/dummy';
import { CreateUser } from './create-user/create-user';
import { Login } from './login/login';

import { authGuard } from './core/guards/auth-guard';
import { managementGuard } from './core/guards/management-guard';

export const routes: Routes = [
    {path:'', component: MainPage, canActivate:[authGuard]},
    {path:'tasks/add', component: CreateTask, canActivate:[authGuard]},
    {path:'tasks/list', component: TaskManagement, canActivate:[managementGuard]},
    {path:'dummy', component: Dummy},
    {path:'users/add', component: CreateUser},
    {path:'login' , component: Login},
];
