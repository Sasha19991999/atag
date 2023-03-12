import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InteractiveViewerComponent } from './pages/interactive-viewer/interactive-viewer.component';
import { ProductFeaturesComponent } from './pages/product-features/product-features.component';

const routes: Routes = [
  { path: 'interactive-viewer', component: InteractiveViewerComponent },
  { path: '**', component: ProductFeaturesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
