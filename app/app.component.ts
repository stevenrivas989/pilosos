import { Component, OnInit, Inject } from '@angular/core';
import { OperationModel } from './model/operation.model';
import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { StudentsService } from './services/app.service';

export interface DialogData {
  nameStudent: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
    StudentsService
  ]
})

export class AppComponent implements OnInit {
  title = 'proyectFrontend';
  operation: string = "";
  listOperations: OperationModel[] = [];
  operationModel: OperationModel;
  operationSelected: any;
  number1: any;
  number2: any;
  resultOperationInt: number;
  operationSign: string;
  operationMath: boolean;
  buttonOperation: string;
  resultOperationExt: number;
  nameStudent: string;
  operationStudent: boolean;
  codStudent: number;
  listStudents: any[] = [];
  studentPoint:number;
  constructor(
    private matSnackBar: MatSnackBar,
    public dialog: MatDialog,
    private studentsService: StudentsService) {
  }

  ngOnInit() {
    this.operationModel = new OperationModel();
    this.pushListOperation();
    this.randomNumber();
    this.operationMath = false;
  }

  selectOperation() {
    if (typeof this.operationModel == "number") {
      switch (this.operationModel) {
        case 1:
          this.operation = ": SUMA"
          this.operationSign = "+"
          this.randomNumber();
          this.operationMath = true;
          this.buttonOperation = "Sumar"
          this.resultOperationInt = this.number1 + this.number2;
          break;

        case 2:
          this.operation = ": RESTA"
          this.operationSign = "-"
          this.randomNumber();
          this.operationMath = true;
          this.buttonOperation = "Restar";
          this.resultOperationInt = this.number1 - this.number2;
          break;

        default:
          this.operation = ""
          this.operationSign = "";
          this.operationMath = false;
          break;
      }
      console.log(this.operationMath);
    } else {
      this.operation = ""
      this.operationSign = "";
      this.operationMath = false;
    }
  }

  private pushListOperation() {
    var operationObj = new OperationModel();
    operationObj.value = 1;
    operationObj.description = "Suma"
    this.listOperations.push(operationObj);
    operationObj = new OperationModel();
    operationObj.value = 2;
    operationObj.description = "Resta"
    this.listOperations.push(operationObj);
  }

  selectStudentByCod(s) {
    console.log("V1")
    if (typeof s.value.codStudent == "number") {
      this.codStudent = s.value.codStudent;
      this.studentsService.listar(s.value.codStudent).subscribe(res => {
        console.log(res)
        if (Object.keys(res).length > 0) {
          this.operationStudent = true;
          let keys = Object.keys(res)
          Object.keys(keys).map(key => {
            let values =  res[key];
            this.nameStudent = values.NOMBRE;
            this.studentPoint = values.PUNTAJE;
            if(typeof this.nameStudent == "string"){
              this.nameStudent= this.nameStudent.toUpperCase();
            }
          });
        }
      }, err => {
        this.matSnackBar.open("Estudiante no encontrado", "Cerrar", {
          duration: 2000
        })
      })
    }
  }

  private randomNumber() {
    this.number1 = Math.round(Math.random() * 100);
    this.number2 = Math.round(Math.random() * 100);
  }

  operationForm(f) {
    if (typeof f.value.result == "number") {
      if (f.value.result == this.resultOperationInt) {
        this.matSnackBar.open("CORRECTO!", "Cerrar", {
          duration: 2000
        })
        this.studentPoint=Number(this.studentPoint)+1;
        this.selectOperation();
        this.codStudent
        this.studentsService.updatePoint(this.codStudent,this.studentPoint).subscribe(res=>{
          console.log(res);
        })
      } else {

        const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
          width: '300px',
          data: { nameStudent: this.nameStudent }
        });
      }
    } else {
      console.error("Error de tipo")
    }
  }
}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal.html',
  styleUrls: ['./app.component.css']
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    if (typeof this.data.nameStudent == "string") {
      this.data.nameStudent = this.data.nameStudent.toUpperCase();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}