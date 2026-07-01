import { Component, inject, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ProductDto, ProductService } from '../../services/product-service';

@Component({
  selector: 'app-product-page',
  imports: [
    MenubarModule,
    TableModule
  ],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage implements OnInit {

  private readonly _productService = inject(ProductService);

  private readonly _selectedProduct = signal<ProductDto | null>(null);

  protected readonly products = signal<ProductDto[]>([]);

  protected get menubarItems(): MenuItem[] {
    return [
      { label: 'Crear' },
      { label: 'Editar', disabled: this.isSelectedProductEmpty },
      { label: 'Eliminar', disabled: this.isSelectedProductEmpty }
    ];
  }

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this._productService.getProducts()
      .then(result => this.products.set(result));
  }

  protected onSelectedProductChange(product: ProductDto): void {
    this._selectedProduct.set(product);
    console.log(this._selectedProduct());
  }

  protected get isSelectedProductEmpty(): boolean {
    return this._selectedProduct() === null;
  }

}
