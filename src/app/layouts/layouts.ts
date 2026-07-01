import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-layouts',
  imports: [
    MenubarModule,
    RouterOutlet
  ],
  templateUrl: './layouts.html',
  styleUrl: './layouts.css',
})
export class Layouts {

  protected readonly menubarItems: MenuItem[] = [
    { label: 'Inicio', routerLink: '/home' },
    { label: 'Productos', routerLink: '/products' }
  ];

}
