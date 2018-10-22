import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ReactiveFormsModule } from "@angular/forms";
import { CustomerComponent } from "./customers/customer.component";

@NgModule({
  declarations: [AppComponent, CustomerComponent],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
