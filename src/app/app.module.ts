import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ObjectViewerComponent } from './object-viewer/object-viewer.component';
import { InteractiveViewerComponent } from './pages/interactive-viewer/interactive-viewer.component';
import { ProductFeaturesComponent } from './pages/product-features/product-features.component';

@NgModule({
  declarations: [
    AppComponent,
    ObjectViewerComponent,
    InteractiveViewerComponent,
    ProductFeaturesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
