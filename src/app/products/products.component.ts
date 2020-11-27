import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { IProduct } from './products';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  //variables
  pageTitle='Lista de Productos';
  imageWidth=50;
  imageMargin=2;
  showImagen=false;
  errorMessage='';
  _listFilter='';
  filteredProducts: IProduct[]=[];
  products: IProduct[];

  //metodos
  get listFilter():string {
    return this._listFilter;
  }


  constructor(private productService:ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products=products;
      },
      error: err => this.errorMessage=err
    });
  }

}
