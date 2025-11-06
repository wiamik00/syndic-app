import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Template } from './template/template';
import { Residents } from './residents/residents';
import { AddResident } from './add-resident/add-resident';
import { EditResident } from './edit-resident/edit-resident';
import { Home } from './home/home';
import { Profile } from './profile/profile';
import { Dashboard } from './dashboard/dashboard';

const routes: Routes = [
  { path: '', component:  Template },
  { path: 'admin', component: Template,
    children: [
      { path: 'residents', component: Residents },
      { path: 'add-resident', component: AddResident },
      { path: 'edit-resident/:id', component: EditResident },
      { path: 'home', component: Home },
      { path: 'profile', component: Profile },
      { path: 'dashboard', component: Dashboard },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
