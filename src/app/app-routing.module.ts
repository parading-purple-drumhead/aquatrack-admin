import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)},
  { path: '', loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule), canActivate: [AuthGuardService]},
  { path: 'floors', loadChildren: './tab1/floors/floors.module#FloorsPageModule' },
  { path: 'taps', loadChildren: './tab1/floors/taps/taps.module#TapsPageModule' },
  // { path: 'tabs', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  { path: 'tab2', loadChildren: './tab2/tab2.module#Tab2PageModule' },
  { path: 'tab3', loadChildren: './tab3/tab3.module#Tab3PageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'forgotpw', loadChildren: './forgotpw/forgotpw.module#ForgotpwPageModule' },
  { path: 'otppage', loadChildren: './otppage/otppage.module#OtppagePageModule' },
  { path: 'resetpw', loadChildren: './resetpw/resetpw.module#ResetpwPageModule' },
  { path: 'aboutus', loadChildren: './aboutus/aboutus.module#AboutusPageModule' },
  { path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackPageModule' },   
  { path: 'add-user', loadChildren: './tab3/add-user/add-user.module#AddUserPageModule' },
  { path: 'user-info', loadChildren: './tab3/user-info/user-info.module#UserInfoPageModule' },


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
