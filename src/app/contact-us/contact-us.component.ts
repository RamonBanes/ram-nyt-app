import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { debounceTime, Observable } from 'rxjs';
import { ComponentCanDeactivate } from './contact-us.guard';


interface ContactUsFormErrorMess 
{
  fname : string
  lname : string
  summary : string
  message : string
}

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit, ComponentCanDeactivate {
fname : any
lname : any
summary : any
message : any
contactUsForm!: FormGroup;
errorMessage: string = '';

errMessage : ContactUsFormErrorMess = {
  fname : '',
  lname : '',
  summary : '',
  message : ''
  }

  constructor(private fb: FormBuilder,
      private _snackBar: MatSnackBar
    ) { }
 
private validationMessages = [
    {
      fname : {required: "Input First Name.",
              maxLength: 'First Name must be less than 100 characters.'
              }
    },
    {
      lname : {required: "Input Last Name.", maxLength: 'Last Name must be less than 100 characters.'}
    },
    {
      summary : {required: "Input Title/Sumary.", maxLength: 'Title/Sumary must be less than 100 characters.'}
    },
    {
      message : {required: "Input Message.", maxLength: 'Message must be less than 1000 characters.'}
    }
  ]

  ngOnInit(): void {

    this.contactUsForm = this.fb.group({
      fname: ['', [Validators.required, Validators.maxLength(100)]],
      lname: ['', [Validators.required, Validators.maxLength(100)]],
      summary: ['', [Validators.required, Validators.maxLength(100)]],
      message: ['', [Validators.required, Validators.maxLength(1000)]]
    })

    const fnameCntrl = this.contactUsForm.get('fname')!;
    fnameCntrl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(fnameCntrl)
    );

    const lnameCntrl = this.contactUsForm.get('lname')!;
    lnameCntrl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(lnameCntrl)
    );

    const summaryCntrl = this.contactUsForm.get('summary')!;
    summaryCntrl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(summaryCntrl)
    );

    const messageCntrl = this.contactUsForm.get('message')!;
    messageCntrl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      value => this.setMessage(messageCntrl)
    );

  }

  openSnackBar() {
    this.contactUsForm.reset();
    this._snackBar.open('Thank You!', 'Cancel');
  }

  setMessage(c: AbstractControl): void {
    const formGroup = c.parent?.controls;
    const controlName: string = Object.keys(formGroup!).find(name => c === formGroup![name as keyof typeof formGroup])!;
    this.errMessage[controlName as keyof typeof this.errMessage] = '';
    if ((c.touched || c.dirty) && c.errors) {
       Object.keys(c.errors).map(
        key => {
          this.validationMessages.forEach(field => {                 
            Object.keys(field).forEach(messageKey => {
              if (messageKey == controlName){
                Object.values(field).forEach(messageValue => {          
                  this.errMessage[controlName as keyof typeof this.errMessage] = messageValue[key as keyof typeof this.validationMessages];
                })
              }
            })          
          })         
        }).join(' ');
    }
  }
  
  canDeactivate(): Observable<boolean> | boolean {
    if(this.contactUsForm.dirty){
        return false;
    }
    return true;
    }
}
