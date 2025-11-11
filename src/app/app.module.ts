import { Import } from './../../node_modules/@angular/compiler-cli/src/ngtsc/reflection/src/host.d';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { ListTasksComponent } from './Components/list-tasks/list-tasks.component';
import { RegisterComponent } from './Components/register/register.component';
import { AddListComponent } from './Components/add-list/add-list.component';
import { ListDetailComponent } from './Components/list-detail/list-detail.component';
import { AddTaskComponent } from './Components/add-task/add-task.component';
import { HomeComponent } from './Components/home/home.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { ListEffects } from './state/effects/list.effect';
import { reducers } from './state/reducers';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserEffects } from './state/effects/user.effect';
import { TaskEffects } from './state/effects/task.effect';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListTasksComponent,
    RegisterComponent,
    AddListComponent,
    ListDetailComponent,
    AddTaskComponent,
    HomeComponent,
    NavBarComponent,
    SidebarComponent,
    LandingPageComponent
  ],
  imports: [
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ListEffects, UserEffects, TaskEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: false
    }),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
