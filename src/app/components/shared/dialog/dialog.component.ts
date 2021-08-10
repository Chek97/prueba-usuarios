import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';
import { SuccessDialogComponent } from '../success-dialog/success-dialog.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private _userService: UserService,
    public dialog: MatDialog){
    
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
    window.location.reload();
  }

  delete(id: string){
    this._userService.deleteUser({identification_number: id})
      .subscribe((data: any) => {
        this.openSuccess(data.message);
      });
    
  }

  openSuccess(message: string){
    this.dialog.open(SuccessDialogComponent, {
      data: {title: 'Usuario Borrado', content: message, action: 'OK' }
    });
  }
}
