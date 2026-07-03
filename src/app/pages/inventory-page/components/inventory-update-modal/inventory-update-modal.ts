import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StockService, StockWithProductDto, UpdateStockDto } from '../../../../services/stock-service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductDto } from '../../../../services/product-service';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-inventory-update-modal',
  imports: [
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './inventory-update-modal.html',
  styleUrl: './inventory-update-modal.css',
})
export class InventoryUpdateModal implements OnInit {

  private readonly _builder = inject(FormBuilder);

  private readonly _stockService = inject(StockService);

  private readonly _ref = inject(DynamicDialogRef);

  private readonly _config = inject(DynamicDialogConfig);

  protected readonly product = signal<ProductDto | null>(null);

  protected form: FormGroup | null = null;

  ngOnInit(): void {
    const stock: StockWithProductDto | null | undefined = this._config.data?.stock;
    if (stock === null || stock === undefined) {
      this.onClose();
      return;
    }
    this.product.set(stock.product);
    this.form = this._builder.group({
      id: [stock.id, [Validators.required]],
      quantity: [stock.quantity, [Validators.required, Validators.min(0.0000000001)]],
    });
  }

  protected onSubmit(): void {
    if (this.form === null) {
      this.onClose();
      return;
    }
    if (this.form.invalid) {
      this.form.markAllAsDirty();
      return;
    }
    const stock: UpdateStockDto = this.form.getRawValue() as UpdateStockDto;
    this._stockService.updateStock(stock)
      .then(() => this.onClose(true));
  }

  protected onClose(result: boolean = false): void {
    this._ref.close(result);
  }

  protected get selectedProductName() {
    return this.product()?.name ?? '';
  }

}
