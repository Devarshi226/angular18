import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { StudentService } from '../Service/student.service';
import {MatIconModule, MatIconRegistry} from '@angular/material/icon';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatTableModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class HomeComponent implements OnInit{
  userForm!: FormGroup;
  displayedColumns: string[] = ['firstName', 'lastName','email', 'action'];
  dataSource! : MatTableDataSource<any>;
  tableData: any;
  selectedUser: any;


  // http = inject(HttpClient);

  constructor(private fb: FormBuilder, private service: StudentService, private iconRegistry: MatIconRegistry) {
    this.dataSource = new MatTableDataSource<any>();
  //   this.iconRegistry.addSvgIcon('edit', svgIconDefinition);
  // this.iconRegistry.addSvgIcon('delete', svgIconDefinition2); 
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    this.fetchData();
  }

  fetchData() {
    this.service.getUser().subscribe((data: any) => {
      this.tableData = data;
      this.dataSource.data = this.tableData;
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;

      if (this.selectedUser) { // Update existing user
        this.service.updateUser(this.selectedUser.id, formData)
          .subscribe(() => {
            this.fetchData();
            this.userForm.reset();
            // this.selectedUser = null;
          });
      } else { // Add new user
        this.service.addUser(formData).subscribe(() => {
          this.fetchData();
          this.userForm.reset();
        });
      }
    }
  }
 
  // onSubmit() {
  //   if (this.userForm.valid) {
  //     console.log('Form Submitted!', this.userForm.value);
  //     this.service.addUser(this.userForm.value).subscribe(() => {
  //       this.fetchData();  // Refresh table data
  //       this.userForm.reset();  // Reset the form    
  //   }
  // )}
  // }

  onEdit(row : any){
    this.selectedUser = row;
    this.userForm.patchValue({
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
    });

  }

  onDelete(id :any){
    this.service.deleteUser(id).subscribe(() => {
      this.fetchData();
    });
  }

}

