import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { MantraDeviceComponent } from './mantra-device/mantra-device.component';
import { MorpoDeviceComponent } from './morpo-device/morpo-device.component';
import { StartekDeviceComponent } from './startek-device/startek-device.component';
@NgModule({
  declarations: [
    AppComponent,
    MantraDeviceComponent,
    MorpoDeviceComponent,
    StartekDeviceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    provideAnimations(), // required animations providers
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

