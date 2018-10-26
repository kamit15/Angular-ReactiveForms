import { Component, OnInit } from "@angular/core";
// import { FormGroup, FormControl} from "@angular/forms";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Customer } from "./customer";

@Component({
  selector: "app-customer",
  templateUrl: "./customer.component.html",
  styleUrls: ["./customer.component.css"]
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer: Customer = new Customer();

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    // this.customerForm = this.fb.group({
    //   firstName: "",
    //   lastName: { value: "n/a", disabled: true },
    //   email: "",
    //   sendCatalog: true
    // });
    this.customerForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.maxLength(50)]],
      email: ["", [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]],
      sendCatalog: true
    });
    // this.customerForm = new FormGroup({
    //   firstName: new FormControl(),
    //   lastName: new FormControl(),
    //   email: new FormControl(),
    //   sendCatalog: new FormControl(true)
    // });
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
