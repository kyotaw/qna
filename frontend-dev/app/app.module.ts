import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    MatGridListModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatInputModule,
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout'; 
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table'
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { ClipboardModule } from 'ngx-clipboard';

import { KairaiApiService } from './services/kairai-api.service';
import { UserService } from './services/user.service';
import { QnAService } from './services/qna.service';

import { JwtIterceptor } from './interceptors/jwt.interceptor';
import { CanActivateViaAuthGuardInterceptor } from './interceptors/can-activate-via-auth-guard.interceptor';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { MainToolbarComponent } from './main-toolbar/main-toolbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { CertificationComponent } from './certification/certification.component';
import { QbotComponent } from './qbot/qbot.component';
import { QnAListComponent } from './qnalist/qnalist.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        SignupComponent,
        MainToolbarComponent,
        ProfileComponent,
        ChangePasswordComponent,
        DeleteAccountComponent,
        CertificationComponent,
        QbotComponent,
        QnAListComponent,
        UploadComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatCardModule,
        MatDividerModule,
        MatIconModule,
        MatProgressBarModule,
        MatTableModule,
        MatTooltipModule,
        MatGridListModule,
        MatToolbarModule,
        MatSidenavModule,
        MatListModule,
        MatInputModule,
        FlexLayoutModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule, 
        ClipboardModule,
        AppRoutingModule,
  ],
  exports: [
  ],
  providers: [
      KairaiApiService,
      UserService,
      QnAService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: JwtIterceptor,
        multi: true
      },
      CanActivateViaAuthGuardInterceptor,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
