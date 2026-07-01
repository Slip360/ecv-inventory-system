import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { ProductDto, ProductService } from '../../services/product-service';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductCreationModal } from './components/product-creation-modal/product-creation-modal';
import { Subscription } from 'rxjs';
import { ProductUpdateModal } from './components/product-update-modal/product-update-modal';

@Component({
  selector: 'app-product-page',
  imports: [
    MenubarModule,
    TableModule
  ],
  providers: [
    DialogService
  ],
  templateUrl: './product-page.html',
  styleUrl: './product-page.css',
})
export class ProductPage implements OnInit, OnDestroy {

  private readonly _productService = inject(ProductService);

  private readonly _dialogService = inject(DialogService);

  private readonly _selectedProduct = signal<ProductDto | null>(null);

  private readonly _subscriptions: Subscription[] = [];

  protected readonly products = signal<ProductDto[]>([]);

  protected readonly menubarItems = computed<MenuItem[]>(() => {
    const isEmpty = this.isSelectedProductEmpty;
    return [
      { label: 'Crear', command: () => this.onCreate() },
      { label: 'Editar', command: () => this.onUpdate(), disabled: isEmpty },
      { label: 'Eliminar', disabled: isEmpty }
    ];
  })

  ngOnInit(): void {
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  private loadProducts(): void {
    this._productService.getProducts()
      .then(result => this.products.set(result));
  }

  protected onCreate(): void {
    const ref = this._dialogService.open(ProductCreationModal, { header: 'Crear producto' });
    if (ref === null || ref === undefined) return;
    const subscription = ref.onClose.subscribe({
      next: (result: boolean) => {
        if (!result) return;
        this.loadProducts();
      }
    });
    this._subscriptions.push(subscription);
  }

  protected onUpdate(): void {
    const product = this._selectedProduct();
    if (product === null) return;
    const ref = this._dialogService.open(ProductUpdateModal, { header: 'Actualizar producto', data: { product } });
    if (ref === null || ref === undefined) return;
    const subscription = ref.onClose.subscribe({
      next: (result: boolean) => {
        if (!result) return;
        this.loadProducts();
      }
    });
    this._subscriptions.push(subscription);
  }

  protected onSelectedProductChange(product: ProductDto): void {
    this._selectedProduct.set(product);
  }

  protected get isSelectedProductEmpty(): boolean {
    return this._selectedProduct() === null;
  }

}
