import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreateProductDto, ProductService } from '../../../../services/product-service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';

@Component({
  selector: 'app-product-creation-modal',
  imports: [
    InputTextModule,
    FloatLabelModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './product-creation-modal.html',
  styleUrl: './product-creation-modal.css',
})
export class ProductCreationModal {

  private readonly _builder = inject(FormBuilder);

  private readonly _productService = inject(ProductService);

  private readonly _ref = inject(DynamicDialogRef);

  protected readonly form = this._builder.group({
    name: ['', [Validators.required]],
    unit_of_measurement: ['', [Validators.required]],
    price: [0.00, [Validators.required, Validators.min(0.0000000001)]],
  });

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsDirty();
      return;
    }
    const product: CreateProductDto = this.form.getRawValue() as CreateProductDto;
    this._productService.createProduct(product)
      .then(() => this.onClose(true));
  }

  protected onClose(result: boolean = false): void {
    this._ref.close(result);
  }

}
