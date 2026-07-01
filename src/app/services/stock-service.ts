import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

export interface CreateStockDto {
  product_id: number;
  quantity: number;
}

export interface StockDto {
  id: number;
  product_id: number;
  quantity: number;
}

export interface UpdateStockDto {
  id: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class StockService {

  public createStock(stock: CreateStockDto) {
    return invoke<StockDto>('create_stock', { payload: stock });
  }

  public getStocks() {
    return invoke<StockDto[]>('get_stocks');
  }

  public updateStock(stock: UpdateStockDto) {
    return invoke<StockDto>('update_stock', { payload: stock });
  }

  public deleteStock(id: number) {
    return invoke<void>('delete_stock', { id });
  }

}
