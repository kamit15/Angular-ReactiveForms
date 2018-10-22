import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Customer } from "./customer";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"]
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer: Customer = new Customer();

  ngOnInit(): void {
    this.customerForm = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      sendCatalog: new FormControl(true)
    });
  }

  save() {
    console.log(this.customerForm);
    console.log("Saved: " + JSON.stringify(this.customerForm.value));
  }

  populateTestDataUsingSet(): void {
    this.customerForm.setValue({
      firstName: "abc",
      lastName: "def",
      email: "abc@def.com",
      sendCatalog: false
    });
  }
  populateTestDataUsingPatch(): void {
    this.customerForm.patchValue({
      firstName: "xyz",
      email: "xyz@def.com"
    });
  }
}
