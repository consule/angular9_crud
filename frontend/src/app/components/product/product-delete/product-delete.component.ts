import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  product: Product;

  constructor(
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.productService.readById(id).subscribe(res => {
      this.product = res;
    })
  }

  deleteProduct() {
    return this.productService.delete(this.product.id).subscribe(() => {
      this.productService.showMessage('Excluído com Sucesso!');
      this.router.navigate(['/products'])
    });
  }

  cancel(): void {
    this.router.navigate(['/products']);
  }

}
