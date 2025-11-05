import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { HomeComponent } from './Components/home/home.component';
import { ListTasksComponent } from './Components/list-tasks/list-tasks.component';
import { AddTaskComponent } from './Components/add-task/add-task.component';
import { AddListComponent } from './Components/add-list/add-list.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ListDetailComponent } from './Components/list-detail/list-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/landing', pathMatch: 'full'},
  { path: 'landing', component: LandingPageComponent},
  { path: 'home', component: HomeComponent},
  { path: 'list-tasks', component: ListTasksComponent},
  { path: 'add-task/:id', component: AddTaskComponent},
  { path: 'add-list', component: AddListComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'list-detail/:id', component: ListDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
