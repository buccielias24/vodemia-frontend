import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content='';

  constructor(private userService: UserService, private productService :ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      data =>{
        console.log(data);
      }
    );
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content=data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }

}
