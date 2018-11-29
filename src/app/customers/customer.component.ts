import { Component, OnInit } from "@angular/core";
// import { FormGroup, FormControl} from "@angular/forms";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidatorFn
} from "@angular/forms";
import { Customer } from "./customer";

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | null {
  const emailControl = c.get("email");
  const confirmControl = c.get("confirmEmail");

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }
  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return { match: true };
}

function ratingRange(c: AbstractControl): { [key: string]: boolean } | null {
  if (c.value != undefined && (isNaN(c.value) || c.value < 1 || c.value > 5)) {
    return { range: true };
  }
  return null;
}
function ratingRangeParam(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (
      c.value != undefined &&
      (isNaN(c.value) || c.value < min || c.value > max)
    ) {
      return { range: true };
    }
    return null;
  };
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
      emailGroup: this.fb.group(
        {
          email: [
            "",
            [
              Validators.required,
              Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+")
            ]
          ],
          confirmEmail: ["", Validators.required]
        },
        { validator: emailMatcher }
      ),
      phone: "",
      notification: "email",
      //rating: ["", ratingRange],
      rating: ["", ratingRangeParam(1, 5)],
      sendCatalog: true
    });
    // this.customerForm = new FormGroup({
    //   firstName: new FormControl(),
    //   lastName: new FormControl(),
    //   email: new FormControl(),
    //   sendCatalog: new FormControl(true)
    // });

    //After Definition of root FormGroup otherwise customerForm reference is null
    this.customerForm
      .get("notification")
      .valueChanges.subscribe(value => console.log(value));
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
