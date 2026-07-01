import { Component, inject } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { invoke } from "@tauri-apps/api/core";
import { ProductService } from "./services/product-service";

@Component({
  selector: "app-root",
  imports: [RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {

  private readonly _productService = inject(ProductService);

  greetingMessage = "";

  greet(event: SubmitEvent, name: string): void {
    event.preventDefault();
    const product = { name: name, unit_of_measurement: 'kg', price: 100 };

    this._productService.createProduct(product);

    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    invoke<string>("greet", { name }).then((text) => {
      this.greetingMessage = text;
    });
  }
}
