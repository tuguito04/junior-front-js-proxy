// js/api.js
// Funciones para manejar la lógica de datos (API)

import { MOCK_DATA } from './config.js';

const MOCK_API_DELAY = 1000;

/**
 * Simula la obtención de productos de una API.
 * @param {string} query - El término de búsqueda.
 * @param {string} category - La categoría a filtrar.
 * @returns {Promise<Array<Object>>} Un array de productos filtrados.
 */
export const fetchProducts = (query = '', category = '') => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                let products = MOCK_DATA.products;
                if (query) {
                    products = products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
                }
                if (category) {
                    products = products.filter(p => p.category === category);
                }
                resolve(products);
            } catch (error) {
                reject(new Error('Error al cargar los productos de prueba.'));
            }
        }, MOCK_API_DELAY);
    });
};

/**
 * Simula la obtención de categorías de una API.
 * @returns {Promise<Array<string>>} Un array de categorías.
 */
export const fetchCategories = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(MOCK_DATA.categories);
            } catch (error) {
                reject(new Error('Error al cargar las categorías de prueba.'));
            }
        }, MOCK_API_DELAY);
    });
};

/**
 * Simula la creación de un nuevo producto en la "base de datos".
 * @param {Object} newProductData - Los datos del nuevo producto.
 * @returns {Promise<Object>} El producto creado con un ID asignado.
 */
export const createProduct = (newProductData) => {
    return new Promise((resolve) => {
        setTimeout(() => {            
            const newProduct = {
                id: MOCK_DATA.products.length + 1,
                ...newProductData
            };
            MOCK_DATA.products.unshift(newProduct); 
            resolve(newProduct);
        }, MOCK_API_DELAY);
    });
};