import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CreateStockDto, StockService } from '../../../../services/stock-service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductDto, ProductService } from '../../../../services/product-service';
import { CascadeSelectModule } from 'primeng/cascadeselect';

@Component({
  selector: 'app-inventory-creation-modal',
  imports: [
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    CascadeSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './inventory-creation-modal.html',
  styleUrl: './inventory-creation-modal.css',
})
export class InventoryCreationModal implements OnInit {

  private readonly _builder = inject(FormBuilder);

  private readonly _stockService = inject(StockService);

  private readonly _productService = inject(ProductService);

  private readonly _ref = inject(DynamicDialogRef);

  protected readonly products = signal<ProductDto[]>([]);

  protected readonly form = this._builder.group({
    product_id: [0, [Validators.required, Validators.min(1)]],
    quantity: [0, [Validators.required, Validators.min(0.0000000001)]],
  });

  ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts(): void {
    this._productService.getProductsWithoutStock()
      .then((products) => this.products.set(products));
  }

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsDirty();
      return;
    }
    const stock: CreateStockDto = this.form.getRawValue() as CreateStockDto;
    this._stockService.createStock(stock)
      .then(() => this.onClose(true));
  }

  protected onClose(result: boolean = false): void {
    this._ref.close(result);
  }

}
