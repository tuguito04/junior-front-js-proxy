// js/api.js

import {API_CONFIG} from './config.js';

//Obtiene una lista de productos paginada desde la API con opciones de búsqueda y filtrado.
export const fetchProducts = async (query = '', category = '', page = 1, pageSize) => {
    const url = new URL(`${API_CONFIG.API_URL}/products`)

    url.searchParams.append('page', page);
    url.searchParams.append('pageSize', pageSize);

    if (query) {
        url.searchParams.append('query', query);
    }
    if (category) {
        url.searchParams.append('category', category);        
    }
    
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Error al cargar los productos de la API.');
    }
    return await response.json();
};

//Obtiene las categorías desde la API.
export const fetchCategories = async () => {
    const url = `${API_CONFIG.API_URL}/categories`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Error al cargar las categorías de la API.');
    }
    return await response.json();
    
};

//Crea un nuevo producto enviándolo a la API.
export const createProduct = async (newProductData) => {
    const url = `${API_CONFIG.API_URL}/products`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProductData)
    });
    if (!response.ok) {
        throw new Error('Error al crear el producto.');
    }
    return await response.json();
};