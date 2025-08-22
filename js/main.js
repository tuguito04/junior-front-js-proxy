// js/main.js
// Archivo principal de la aplicación

import { fetchProducts, fetchCategories, createProduct } from './api.js';
import { renderProducts, renderCategories, showLoading, hideLoading, showError, showProductModal, showCreateModal, hideModal, validateForm } from './ui.js';
import { initPaginator, updatePaginator, resetPaginator, getCurrentPage } from './paginator.js';
import { PAGINATION_CONFIG } from './config.js';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categorySelect = document.getElementById('categorySelect');
const createBtn = document.getElementById('createBtn');
const retryBtn = document.getElementById('retryBtn');
const productModal = document.getElementById('productModal');
const createModal = document.getElementById('createModal');
const closeModalBtn = document.getElementById('closeModal');
const closeCreateModalBtn = document.getElementById('closeCreateModal');
const cancelCreateBtn = document.getElementById('cancelCreate');
const createForm = document.getElementById('createForm'); 

let allProducts = [];

/**
 * Carga y renderiza los productos en la página actual.
 * @param {number} page - La página a cargar.
 */
const loadAndRenderProducts = async (page = 1) => {
    showLoading();
    try {
        const query = searchInput.value.toLowerCase();
        const category = categorySelect.value;
        const filteredProducts = await fetchProducts(query, category);
        
        allProducts = filteredProducts;
        
        const startIndex = (page - 1) * PAGINATION_CONFIG.PAGE_SIZE;
        const endIndex = startIndex + PAGINATION_CONFIG.PAGE_SIZE;
        const productsToShow = allProducts.slice(startIndex, endIndex);

        hideLoading();
        renderProducts(productsToShow, showProductModal);
        updatePaginator(allProducts.length, PAGINATION_CONFIG.PAGE_SIZE);

    } catch (error) {
        showError('Error al cargar los productos. Por favor, inténtalo de nuevo.');
        console.error('Error en loadAndRenderProducts:', error);
    }
};

const handleSearchAndFilter = () => {
    resetPaginator();
    loadAndRenderProducts();
};

const handleCreateProduct = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
        return; 
    }

    // Obtener los datos del formulario
    const newProductData = {
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value, 10),
        image: document.getElementById('productImage').value,
        category: document.getElementById('productCategory').value,
        description: document.getElementById('productDescription').value,
    };

    try {
        // Simular la creación del producto en la API
        await createProduct(newProductData);
        hideModal(createModal);
        // Recargar los productos para mostrar el nuevo
        resetPaginator();
        loadAndRenderProducts();
        // Opcional: mostrar un mensaje de éxito
    } catch (error) {
        // Manejo de errores en la creación
        console.error('Error al crear el producto:', error);
        // Podrías mostrar un mensaje de error en el modal
    }
};

const init = async () => {
    // Inicializar el paginador
    initPaginator((newPage) => loadAndRenderProducts(newPage));

    // Cargar y renderizar categorías
    try {
        const categories = await fetchCategories();
        renderCategories(categories);
    } catch (error) {
        console.error('Error al cargar las categorías:', error);
    }

    // Cargar los productos iniciales
    loadAndRenderProducts(getCurrentPage());

    // Asignar event listeners
    searchBtn.addEventListener('click', handleSearchAndFilter);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSearchAndFilter();
        }
    });
    categorySelect.addEventListener('change', handleSearchAndFilter);
    createBtn.addEventListener('click', showCreateModal);
    retryBtn.addEventListener('click', () => loadAndRenderProducts(getCurrentPage()));
    closeModalBtn.addEventListener('click', () => hideModal(productModal));
    closeCreateModalBtn.addEventListener('click', () => hideModal(createModal));
    cancelCreateBtn.addEventListener('click', () => hideModal(createModal));

    // Nuevo event listener para el formulario de creación
    createForm.addEventListener('submit', handleCreateProduct);
};

// Iniciar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', init);