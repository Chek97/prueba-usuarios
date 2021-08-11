import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { SuccessDialogComponent } from '../shared/success-dialog/success-dialog.component';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: any;
  url: any = "assets/user.png";
  form: FormGroup;

  constructor(private _activeRoute: ActivatedRoute, 
    private _userService: UserService, 
    private fb: FormBuilder,
    private router: Router,
    public dialog: MatDialog) {
    //create form controls
    this.form = this.createForm();
    //request for the user to edit
    this._activeRoute.params
      .subscribe(param => {
        this.getUser(param['id']);
      });
  }

  ngOnInit(): void { }

  //Get the specific user
  getUser(id: string) {
    this._userService.getUsers()
      .subscribe((resp: any) => {
        resp.personList.forEach((userElement: User) => {
          if (userElement.identification_number === id) {
            this.user = userElement;
            this.loadData(this.user);
          }
        });
      });
  }

  //define form controls and validations
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

  //preload form data with user data
  loadData(user: User) {
    this.form.setValue({
      first_name: user.first_name,
      last_name: user.last_name,
      age: user.age,
      identification_number: user.identification_number,
      mail: user.mail,
      avatar: user.avatar
    });
  }

  //make the request for edit user
  edit() {
    if (this.form.invalid) {
      return Object.values(this.form.controls).forEach(control => {
        control.markAsTouched();
      });
    }
    this._userService.editUser(this.form.value)
      .subscribe((data: any) => {
        this.openSuccess(data.message);
      });
  }

  redirect(){
    this.router.navigate(['dashboard']);
  }

  openSuccess(message: string){
    this.dialog.open(SuccessDialogComponent, {
      data: {title: 'Usuario Actualizado', content: message, action: 'OK' }
    });
  }

  onFileChange(event: any){
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
  
      reader.onload = (event: ProgressEvent) => {
        this.url = (<FileReader>event.target).result;
        this.user.avatar = (<FileReader>event.target).result;
      }
  
      reader.readAsDataURL(event.target.files[0]);
    }
  }

}
