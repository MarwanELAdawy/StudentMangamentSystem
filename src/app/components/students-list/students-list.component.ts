import { Component, OnInit, ViewChild } from '@angular/core';
import { student } from '../../model/student';
import { ApiService } from './../../shared/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {
  StudentData: any = [];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['_id', 'student_name', 'student_email', 'section', 'action'];

  constructor(private studentApi: ApiService) {
    this.studentApi.GetStudents().subscribe(data => {
      this.StudentData = data;
      this.dataSource = new MatTableDataSource(this.StudentData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
   }

  ngOnInit(): void {
  }
  deleteStudent(index: number, e){
    if (window.confirm('Are you sure')){
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.studentApi.DeleteStudent(e._id).subscribe();
    }
  }
}
