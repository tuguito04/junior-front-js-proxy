// js/main.js
// Archivo principal de la aplicación

import { fetchProducts, fetchCategories, createProduct } from './api.js';
import { renderProducts, renderCategories, showLoading, hideLoading, showError, showProductModal, showCreateModal, hideModal, validateForm, showSuccessMessage, showCreateErrorMessage } from './ui.js';
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

//Carga y renderiza los productos en la página actual con filtros.

const loadAndRenderProducts = async (page = 1) => {
    showLoading();

    try {
        const query = searchInput.value;
        const category = categorySelect.value;
        const pagedResponse = await fetchProducts(query, category, page, PAGINATION_CONFIG.PAGE_SIZE);
        
        const productsToShow = pagedResponse.items;
        const totalItems = pagedResponse.total;

        hideLoading();
        renderProducts(productsToShow, showProductModal);
        updatePaginator(totalItems, PAGINATION_CONFIG.PAGE_SIZE);
        
    } catch (error) {
        showError('Error al cargar los productos. Por favor, asegúrate de que el backend esté en ejecución e inténtalo de nuevo.');
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

    const newProductData = {
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        stock: parseInt(document.getElementById('productStock').value, 10),
        image: document.getElementById('productImage').value,
        category: document.getElementById('productCategory').value,
        description: document.getElementById('productDescription').value,
        brand: "Unknown"
    };

    try {
        await createProduct(newProductData);
        hideLoading();
        showSuccessMessage(); // Mostrar mensaje de éxito
        // Retrasar el cierre del modal para que el usuario pueda ver el mensaje
        setTimeout(() => {
            hideModal(createModal);
            resetPaginator();
            loadAndRenderProducts();
        }, 2000); // 2 segundos
    } catch (error) {
        hideLoading();
        showCreateErrorMessage(); // Mostrar mensaje de error
        console.error('Error al crear el producto:', error);
        
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

