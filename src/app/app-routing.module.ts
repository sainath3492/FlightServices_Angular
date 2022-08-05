import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent} from './login/login.component';
import { SearchBookingComponent} from './search-booking/search-booking.component';
import { AirlinesComponent} from './airlines/airlines.component';
import { CreateairlineComponent} from './createairline/createairline.component';
import { InventoryComponent} from './inventory/inventory.component';
import { AirlineListComponent} from './airline-list/airline-list.component';
import { CouponAddComponent} from './coupon-add/coupon-add.component';
import { FlightsearchComponent} from './flightsearch/flightsearch.component';
import { BookticketComponent} from './bookticket/bookticket.component';
import { TicketDetailsComponent} from './ticket-details/ticket-details.component';
import { RegisterComponent} from './register/register.component';

const routes: Routes = [

  {
    path:'',
    component:LoginComponent
    
  },
  {
    path:'SearckBook',
    component:SearchBookingComponent
    
  },
  {
    path:'Airlines',
    component:AirlinesComponent
    
  },
  {
    path:'AirlineCreate',
    component:CreateairlineComponent
    
  }
  ,
  {
    path:'Inventory/:id/:AirlineName',
    component:InventoryComponent
    
  }
  ,
  {
    path:'FlightList/:id',
    component:AirlineListComponent
    
  },
  {
    path:'Coupon',
    component:CouponAddComponent
    
  }
  ,
  {
    path:'FlightSearch',
    component:FlightsearchComponent
    
  }
  ,
  {
    path:'TicketDetails/:id',
    component:TicketDetailsComponent
    
  }
  ,
  {
    path:'Register',
    component:RegisterComponent
    
  }
  ,
  {
    path:'BookTicket/:flightid/:from/:to/:onward_JourneyDate/:onward_Price/:triptype/:airline_Name',
    component:BookticketComponent
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
