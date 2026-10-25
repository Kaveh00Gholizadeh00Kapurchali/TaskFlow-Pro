import { Routes } from '@angular/router';

import { MainPage } from './main-page/main-page';
import { CreateTask } from './create-task/create-task';
import { Dummy } from './dummy/dummy';
import { CreateUser } from './create-user/create-user';

export const routes: Routes = [
    {path:'', component: MainPage},
    {path:'tasks/add', component: CreateTask},
   // {path:'tasks/manage', component: ManageTask},
    {path:'dummy', component: Dummy},
    {path:'users/add', component: CreateUser},
];
