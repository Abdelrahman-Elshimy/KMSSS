import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './layout/header/header.component';
import { BannerBoxComponent } from './home/banner-box/banner-box.component';
import { TabsBoxComponent } from './home/tabs-box/tabs-box.component';
import { HomeComponent } from './home/home.component';
import { NewsBoxComponent } from './home/news-box/news-box.component';
import { NewslatterComponent } from './layout/newslatter/newslatter.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LoginComponent } from './users/login/login.component';
import { RegisterComponent } from './users/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/ApiService';
import { EncryptionService } from './services/EncryptionService';
import { UserSessionService } from './services/UserSessionService';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { AIToolBoxComponent } from './shared/aitool-box/aitool-box.component';

import { CarouselModule } from 'primeng/carousel';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BannerBoxComponent,
    TabsBoxComponent,
    HomeComponent,
    NewsBoxComponent,
    NewslatterComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AIToolBoxComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastModule,
    AutoCompleteModule,
    CarouselModule
      ],
  providers: [
    ApiService,
    EncryptionService,
    UserSessionService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
