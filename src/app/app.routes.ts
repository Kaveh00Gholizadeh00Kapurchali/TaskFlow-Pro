import { Routes } from '@angular/router';

import { MainPage } from './main-page/main-page';
import { CreateTask } from './create-task/create-task';
import { TaskManagement } from './task-management/task-management';
import { Dummy } from './dummy/dummy';
import { CreateUser } from './create-user/create-user';
import { Login } from './login/login';
import { UserManagement } from './user-management/user-management';

import { authGuard } from './core/guards/auth-guard';
import { managementGuard } from './core/guards/management-guard';
import { adminGuard } from './core/guards/admin-guard';

export const routes: Routes = [
    {path:'', component: MainPage, canActivate:[authGuard]},
    {path:'tasks/add', component: CreateTask, canActivate:[authGuard, managementGuard]},
    {path:'tasks/list', component: TaskManagement, canActivate:[managementGuard]},
    {path:'users/manage', component:UserManagement, canActivate:[adminGuard]},
    {path:'dummy', component: Dummy},
    {path:'users/add', component: CreateUser},
    {path:'login' , component: Login},
];
