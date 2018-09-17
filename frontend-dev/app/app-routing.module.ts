import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { QbotComponent} from './qbot/qbot.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeleteAccountComponent } from './delete-account/delete-account.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { CertificationComponent } from './certification/certification.component';

import { CanActivateViaAuthGuardInterceptor } from './interceptors/can-activate-via-auth-guard.interceptor';

const routes: Routes = [
    { path: 'qbot', component: QbotComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [CanActivateViaAuthGuardInterceptor] },
    { path: 'profile/changepassword', component: ChangePasswordComponent, canActivate: [CanActivateViaAuthGuardInterceptor] },
    { path: 'profile/deleteaccount', component: DeleteAccountComponent, canActivate: [CanActivateViaAuthGuardInterceptor] },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'certification', component: CertificationComponent }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
