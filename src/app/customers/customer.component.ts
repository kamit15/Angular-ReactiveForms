import { Component, OnInit } from "@angular/core";
// import { FormGroup, FormControl} from "@angular/forms";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { Customer } from "./customer";

function ratingRange(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value != undefined && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return { range: true };
  }
  return null;
}

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
      email: [
        "",
        [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+")]
      ],
      phone: "",
      notification: "email",
      rating: ["", ratingRange],
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

  setNotification(notifyVia: string): void {
    const phoneControl = this.customerForm.get("phone");
    console.log(notifyVia);
    if (notifyVia === "text") {
      phoneControl.setValidators([
        Validators.required,
        Validators.minLength(3)
      ]);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}
