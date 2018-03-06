import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'control-messages',
  templateUrl: './formvalidation.component.html',
  styleUrls: ['./formvalidation.component.css']
})
export class FormvalidationComponent implements OnInit {
  rForm: FormGroup;
  post:any;
  description:string = '';
  name:string = '';
  titleAlert:string = 'This field is required';
  emailAlert:string = 'This field is required';

  ngOnInit() {
    this.rForm.get('validate').valueChanges.subscribe(
      (validate) => {
          if (validate == '1') {
              this.rForm.get('name').setValidators([Validators.required, Validators.minLength(3)]);
              this.rForm.get('email').setValidators([Validators.required, Validators.minLength(3)]);
              this.titleAlert = 'You need to specify at least 3 characters';
              this.emailAlert = 'You need to specify at least 3 characters email';
          } else {
              this.rForm.get('name').setValidators(Validators.required);
          }
          this.rForm.get('name').updateValueAndValidity();

      });
  }

 constructor(private fb: FormBuilder) {

   this.rForm = fb.group({
     'name' : [null, Validators.required],
     'description' : [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],
     'email' : [null, Validators.required],
     'validate' : ''
   });

 }
 addPost(post) {

   this.description = post.description;
   this.name = post.name;
 }

}
