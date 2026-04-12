import { Routes,RouterModule } from '@angular/router';
import { NgModule } from "@angular/core";
import{RootComponent} from '../Dashboard1/root/root.component'
import { CasesComponent } from '../case Archive/cases/cases.component';
import { RootAnalyticsComponent } from '../Analytics/root-analytics/root-analytics.component';
export const routes:  Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('../Dashboard1/root/root.component').then(m => m.RootComponent),
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('../Dashboard1/home/home.component').then(m => m.HomeComponent) },
      { path: 'cases', loadComponent: () => import('../case Archive/root2/root2.component').then(m => m.Root2Component) },
      { path: 'cases/open/:id',  loadComponent: () => import('../Dashboard1/opencase/case-detail/case-detail.component').then(m => m.CaseDetailComponent) },
      { path: 'cases/details/:id', loadComponent: () => import('../Dashboard1/View Details/case-detils-view/case-detils-view.component').then(m => m.CaseDetilsViewComponent) },
      { path: 'paramedic',  loadComponent: () => import('../Paramedics/roor-par/roor-par.component').then(m => m.RoorParComponent)},
      {path: 'paramedics/add',loadComponent: () => import('../Paramedics/Add Paramedics/web-cases-card-add/web-cases-card-add.component').then(m => m.WebCasesCardAddComponent)},
      { path: 'web-cases-cardprofile/open/:id',loadComponent: () =>import('../Paramedics/Paramedic Profile/web-cases-cardprofile/web-cases-cardprofile.component') .then(m => m.WebCasesCardprofileComponent)},
      { path: 'analytics', loadComponent: () => import('../Analytics/root-analytics/root-analytics.component').then(m => m.RootAnalyticsComponent) },
      { path: 'settings', loadComponent: () => import('../Settings/root-settings/root-settings.component').then(m => m.RootSettingsComponent) },
      { path: 'emergency', loadComponent: () => import('../Dashboard1/EmergencyActionButton/web-emergency-action-button/web-emergency-action-button.component').then(m => m.WebEmergencyActionButtonComponent) },
      {path: 'notifications',loadComponent: () => import('../Dashboard1/Not/notifications/notifications.component').then(m => m.NotificationsComponent)},
    ]
  },
 // { path: '**', redirectTo: 'auth/login' }
];




// {path:'Deshpord',component:RootComponent,title:'Deshpord'},
    // {path:'paramedic',component:CasesComponent,title:'paramedic'},
    //  {
  //   path: "",
  //   component: RootComponent,
  // },


