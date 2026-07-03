import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';
import { ProductDto } from './product-service';

export interface CreateStockDto {
  product_id: number;
  quantity: number;
}

export interface StockDto {
  id: number;
  product_id: number;
  quantity: number;
}

export interface StockWithProductDto {
  id: number;
  product_id: number;
  quantity: number;
  product: ProductDto;
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
    return invoke<StockWithProductDto[]>('get_stocks');
  }

  public updateStock(stock: UpdateStockDto) {
    return invoke<StockDto>('update_stock', { payload: stock });
  }

  public deleteStock(id: number) {
    return invoke<void>('delete_stock', { id });
  }

}
