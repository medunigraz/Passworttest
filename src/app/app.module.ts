
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent }  from './app.component';

import {ConfigService} from './config/config.service';

//Module für https://github.com/NG-ZORRO/ng-zorro-antd
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgZorroAntdModule,
        BrowserAnimationsModule
    ],
    declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent],

    providers: [
      ConfigService,
      { provide: NZ_I18N, useValue: en_US }
    ]
})

export class AppModule { }
