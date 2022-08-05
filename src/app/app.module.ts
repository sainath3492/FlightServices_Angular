import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AirlinesComponent } from './airlines/airlines.component';
import { InventoryComponent } from './inventory/inventory.component';
import {MatTableModule} from '@angular/material/table';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { DataSource } from '@angular/cdk/table';
import {MatInputModule} from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{FormsModule, ReactiveFormsModule} from '@angular/forms'
import { MatNativeDateModule } from '@angular/material/core';
import { CreateairlineComponent } from './createairline/createairline.component';
import { FlightsearchComponent } from './flightsearch/flightsearch.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SearchBookingComponent } from './search-booking/search-booking.component';
import { BookingticketComponent } from './bookingticket/bookingticket.component';
import { UsermenuComponent } from './usermenu/usermenu.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { AirlineListComponent } from './airline-list/airline-list.component';
import { CouponAddComponent } from './coupon-add/coupon-add.component';
import { BookticketComponent } from './bookticket/bookticket.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { RegisterComponent } from './register/register.component';
import { RoundBookComponent } from './round-book/round-book.component';






@NgModule({
  declarations: [
    AppComponent,
    AirlinesComponent,
    InventoryComponent,
    CreateairlineComponent,
    FlightsearchComponent,
    SearchBookingComponent,
    BookingticketComponent,
    UsermenuComponent,
    LoginComponent,
    AirlineListComponent,
    CouponAddComponent,
    BookticketComponent,
    TicketDetailsComponent,
    RegisterComponent,
    RoundBookComponent
   
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatToolbarModule,
    HttpClientModule,
    ReactiveFormsModule
    
    
  ],
  
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
