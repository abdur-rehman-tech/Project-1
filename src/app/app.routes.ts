import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { ToolsList } from './pages/tools/tools-list/tools-list';
import { ToolDetail } from './pages/tools/tool-detail/tool-detail';
import { ToolsAdmin } from './pages/admin/tools-admin/tools-admin';
import { Login } from './pages/auth/login/login';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './pages/guards/auth.guard';


export const routes: Routes = [
  { path: '', component: Home },

  { path: 'tools', component: ToolsList },
  { path: 'tools/:id', component: ToolDetail },

  { path: 'admin/tools', component: ToolsAdmin },

  { path: 'login', component: Login },

  { path: '**', component: NotFound },

  { path: 'admin/tools', component: ToolsAdmin, canActivate: [authGuard] }

];
