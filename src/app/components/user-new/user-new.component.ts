import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SuccessDialogComponent } from '../shared/success-dialog/success-dialog.component';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

  form: FormGroup;
  url: any = "assets/user.png";

  constructor(private fb: FormBuilder, private _userService: UserService, private router: Router, public dialog: MatDialog){
    //Create form controls
    this.form = this.createForm();
  }

  ngOnInit(): void {
  }

  //Define form controls and validations
  createForm() {
    return this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(50)]],
      last_name: ['', [Validators.required, Validators.maxLength(50)]],
      age: [''],
      identification_number: ['', Validators.required],
      mail: ['', Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')],
      avatar: ['', Validators.required]
    });
  }

  get invalidName() {
    return this.form.get('first_name')?.invalid && this.form.get('first_name')?.touched;
  }

  get invalidLastName() {
    return this.form.get('last_name')?.invalid && this.form.get('last_name')?.touched;
  }
  get invalidIdentification() {
    return this.form.get('identification_number')?.invalid && this.form.get('identification_number')?.touched;
  }

  get invalidAvatar() {
    return this.form.get('avatar')?.invalid && this.form.get('avatar')?.touched;
  }

  get invalidMail() {
    return this.form.get('mail')?.invalid && this.form.get('mail')?.touched;
  }

  //Make the request for create user
  save() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    //console.log(this.form.value);
    this._userService.addUser(this.form.value)
      .subscribe((data: any) => {
        this.openSuccess(data.message);
      });
  }

  redirect(){
    this.router.navigate(['dashboard']);
  }

  openSuccess(message: string){
    this.dialog.open(SuccessDialogComponent, {
      data: {title: 'Usuario Creado', content: message, action: 'OK' }
    });
  }

  onFileChange(event: any){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
