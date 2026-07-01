import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductService, CreateProductDto, UpdateProductDto } from '../../../../services/product-service';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-product-update-modal',
  imports: [
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-update-modal.html',
  styleUrl: './product-update-modal.css',
})
export class ProductUpdateModal implements OnInit {

  private readonly _builder = inject(FormBuilder);

  private readonly _productService = inject(ProductService);

  private readonly _ref = inject(DynamicDialogRef);

  private readonly _config = inject(DynamicDialogConfig);

  protected form: FormGroup | null = null;

  ngOnInit(): void {
    const product: UpdateProductDto | null | undefined = this._config.data?.product;
    if (product === null || product === undefined) {
      this.onClose();
      return;
    }
    this.form = this._builder.group({
      id: [product.id, [Validators.required]],
      name: [product.name, [Validators.required]],
      unit_of_measurement: [product.unit_of_measurement, [Validators.required]],
      price: [product.price, [Validators.required, Validators.min(0.0000000001)]],
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
    const product: UpdateProductDto = this.form.getRawValue() as UpdateProductDto;
    this._productService.updateProduct(product)
      .then(() => this.onClose(true));
  }

  protected onClose(result: boolean = false): void {
    this._ref.close(result);
  }

}
