import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { SohoButtonModule, SohoComponentsModule, SohoLocaleModule } from 'ids-enterprise-ng';

import { AppComponent } from './app.component';
import { SohoLocaleInitializerModule } from './locale/soho-locale-initializer.module';
import { HeaderComponent } from './header/header.component';
import { PersonalizeMenuComponent } from './personalize-menu/personalize-menu.component';
import { CheckoutPageComponent } from './checkout-page/checkout-page.component';
import { HttpClientModule } from '@angular/common/http';
import { TruncatePipe } from "../shared/truncate.pipe";
import { ProductComponent } from './product/product.component';
import { FormsModule } from '@angular/forms';
import { AnalyticsComponent } from './analytics/analytics.component';
import { CustomersComponent } from './customers/customers.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { FinanceComponent } from './finance/finance.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [

    { path: 'sell', component: CheckoutPageComponent },
    { path: 'product', component: ProductComponent },
    { path: 'analytics', component: AnalyticsComponent },
    { path: 'customers', component: CustomersComponent },
    { path: 'user-info/:name', component: UserInfoComponent },
    { path: 'finance', component: FinanceComponent },
]

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        PersonalizeMenuComponent,
        CheckoutPageComponent,
        TruncatePipe,
        ProductComponent,
        AnalyticsComponent,
        CustomersComponent,
        UserInfoComponent,
        FinanceComponent
    ],
    providers: [
        {
            provide: LOCALE_ID,
            useValue: 'en-US'
        }
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        SohoLocaleModule,
        SohoButtonModule,
        SohoLocaleInitializerModule,
        SohoComponentsModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
    ]
})
export class AppModule { }
