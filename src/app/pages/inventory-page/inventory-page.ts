import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { StockService, StockWithProductDto } from '../../services/stock-service';
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
export class InventoryPage implements OnInit, OnDestroy {

  private readonly _stockService = inject(StockService);

  private readonly _dialogService = inject(DialogService);

  private readonly _selectedStock = signal<StockWithProductDto | null>(null);

  private readonly _subscriptions: Subscription[] = [];

  protected readonly stocks = signal<StockWithProductDto[]>([]);

  protected readonly menubarItems = computed<MenuItem[]>(() => {
    const isEmpty = this._isSelectedStockEmpty;
    return [
      { label: 'Agregar stock' },
      { label: 'Editar', disabled: isEmpty },
      { label: 'Eliminar', disabled: isEmpty }
    ];
  });

  ngOnInit(): void {
    this.loadStocks();
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  private loadStocks(): void {
    this._stockService.getStocks()
      .then(result => this.stocks.set(result));
  }

  protected onSelectedStockChange(stock: StockWithProductDto): void {
    this._selectedStock.set(stock);
  }

  private get _isSelectedStockEmpty(): boolean {
    return this._selectedStock() === null;
  }

}
