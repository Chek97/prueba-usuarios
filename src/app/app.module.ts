import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { app_routing } from './app.routes';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './components/shared/shared.module';
import { DialogComponent } from './components/shared/dialog/dialog.component';
import { SuccessDialogComponent } from './components/shared/success-dialog/success-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    UserNewComponent,
    UserEditComponent
  ],
  entryComponents: [DialogComponent, SuccessDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    app_routing,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
