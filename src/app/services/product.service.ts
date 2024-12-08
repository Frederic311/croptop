import { Injectable } from '@angular/core';
import { Product } from '../domain/product';

@Injectable({
    providedIn: 'root', // Fournit ce service au niveau racine de l'application
})
export class ProductService {

    constructor() {}

    // Simule une méthode asynchrone pour récupérer des données "mini" produits
    getProductsMini(): Promise<Product[]> {
        const products: Product[] = [
            { code: 'P001', name: 'Product 1', category: 'Category A', quantity: 10, inventoryStatus: 'INSTOCK', rating: 4 },
            { code: 'P002', name: 'Product 2', category: 'Category B', quantity: 5, inventoryStatus: 'LOWSTOCK', rating: 3 },
            { code: 'P003', name: 'Product 3', category: 'Category C', quantity: 0, inventoryStatus: 'OUTOFSTOCK', rating: 5 },
            { code: 'P004', name: 'Product 4', category: 'Category A', quantity: 8, inventoryStatus: 'INSTOCK', rating: 4 },
            { code: 'P005', name: 'Product 5', category: 'Category B', quantity: 2, inventoryStatus: 'LOWSTOCK', rating: 2 },
        ];
        
        return Promise.resolve(products); // Renvoie une promesse simulant des données de produit
    }
}
