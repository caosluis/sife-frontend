import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }
  configErrores: MatSnackBarConfig = {
    duration: 15000,
    horizontalPosition: 'right',
    verticalPosition: 'top'
  }


  success(msg) {
    this.config['panelClass'] = ['notification', 'success-snackbar'];
    this.snackBar.open(msg, '',this.config);
  }

  warn(msg) {
    this.config['panelClass'] = ['notification', 'warn-snackbar'];
    this.snackBar.open(msg, '', this.config);
  }
  error(msg) {
    this.configErrores['panelClass'] = ['notification', 'error-snackbar'];
    this.snackBar.open(msg, '', this.configErrores);
  }
}
