import { Routes } from "@angular/router";

const childRoutes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home-page/home-page').then(m => m.HomePage),
        title: 'Inicio'
    },
    {
        path: 'products',
        loadComponent: () => import('./pages/product-page/product-page').then(m => m.ProductPage),
        title: 'Productos'
    },
    {
        path: 'inventories',
        loadComponent: () => import('./pages/inventory-page/inventory-page').then(m => m.InventoryPage),
        title: 'Inventarios'
    },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/layouts').then(m => m.Layouts),
        loadChildren: () => childRoutes
    },
    {
        path: '**',
        redirectTo: '/home',
        pathMatch: 'full'
    }
];
