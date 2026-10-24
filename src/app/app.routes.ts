import { Routes } from '@angular/router';

import { MainPage } from './main-page/main-page';
import { CreateTask } from './create-task/create-task';


export const routes: Routes = [
    {path:'', component: MainPage},
    {path:'tasks/add', component: CreateTask},
   // {path:'tasks/manage', component: ManageTask}
    
];
