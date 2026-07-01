import { Component, computed, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { StockDto } from '../../services/stock-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inventory-page',
  imports: [
    MenubarModule,
    TableModule
  ],
  providers: [
    DialogService
  ],
  templateUrl: './inventory-page.html',
  styleUrl: './inventory-page.css',
})
export class InventoryPage {

  private readonly _selectedStock = signal<StockDto | null>(null);

  private readonly _subscriptions: Subscription[] = [];

  protected readonly stocks = signal<StockDto[]>([]);

  protected readonly menubarItems = computed<MenuItem[]>(() => {
    const isEmpty = this._isSelectedStockEmpty;
    return [
      { label: 'Agregar stock' },
      { label: 'Editar', disabled: isEmpty },
      { label: 'Eliminar', disabled: isEmpty }
    ];
  });

  protected onSelectedStockChange(stock: StockDto): void {
    this._selectedStock.set(stock);
  }

  private get _isSelectedStockEmpty(): boolean {
    return this._selectedStock() === null;
  }

}
