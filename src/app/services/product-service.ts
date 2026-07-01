import { Injectable } from '@angular/core';
import { invoke } from '@tauri-apps/api/core';

export interface CreateProductDto {
  name: string;
  unit_of_measurement: string;
  price: number;
}

export interface ProductDto {
  id: number;
  name: string;
  unit_of_measurement: string;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  public createProduct(product: CreateProductDto) {
    return invoke<ProductDto>('create_product', { payload: product });
  }

  public getProducts() {
    return invoke<ProductDto[]>('get_products');
  }

}
