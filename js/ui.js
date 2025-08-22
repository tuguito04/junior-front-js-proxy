// js/ui.js
// Funciones para la manipulación del DOM y la interfaz de usuario

const productsList = document.getElementById('productsList');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const errorMessage = document.getElementById('errorMessage');
const categorySelect = document.getElementById('categorySelect');
const productModal = document.getElementById('productModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const createModal = document.getElementById('createModal');
const createModalTitle = document.getElementById('createModalTitle');
const createForm = document.getElementById('createForm');

/**
 * Renderiza la lista de productos en la interfaz de usuario.
 * @param {Array<Object>} products - El array de productos a mostrar.
 * @param {Function} onProductClick - La función de callback para cuando se hace clic en un producto.
 */
export const renderProducts = (products, onProductClick) => {
    productsList.innerHTML = '';
    if (products.length === 0) {
        productsList.innerHTML = '<p style="text-align: center; color: var(--gray-500);">No se encontraron productos que coincidan con la búsqueda.</p>';
        return;
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.setAttribute('role', 'gridcell');
        card.dataset.id = product.id; 
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" onerror="this.onerror=null;this.src='https://placehold.co/400x220/E5E7EB/9CA3AF?text=No+Imagen';">
            <div class="card-content">
                <h3>${product.name}</h3>
                <p class="category">${product.category}</p>
                <p class="price">$${parseFloat(product.price).toFixed(2)}</p>
            </div>
        `;
        card.addEventListener('click', () => onProductClick(product));
        productsList.appendChild(card);
    });
};

/**
 * Renderiza las opciones de categoría en el select.
 * @param {Array<string>} categories - El array de categorías.
 */
export const renderCategories = (categories) => {
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
        categorySelect.appendChild(option);
    });
};

/** Muestra y oculta estados de la UI */
export const showLoading = () => {
    loadingState.classList.remove('hidden');
    errorState.classList.add('hidden');
    productsList.innerHTML = '';
};

export const hideLoading = () => {
    loadingState.classList.add('hidden');
};

export const showError = (message) => {
    errorState.classList.remove('hidden');
    errorMessage.textContent = message;
    loadingState.classList.add('hidden');
    productsList.innerHTML = '';
};

/**
 * Muestra el modal con los detalles de un producto.
 * @param {Object} product - El objeto del producto a mostrar.
 */
export const showProductModal = (product) => {
    modalTitle.textContent = product.name;
    modalBody.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width:100%; height:auto; border-radius:12px; margin-bottom:1rem;" onerror="this.onerror=null;this.src='https://placehold.co/600x400/E5E7EB/9CA3AF?text=No+Imagen';">
        <p><strong>ID:</strong> ${product.id}</p>
        <p><strong>Precio:</strong> $${parseFloat(product.price).toFixed(2)}</p>
        <p><strong>Stock:</strong> ${product.stock} unidades</p>
        <p><strong>Categoría:</strong> ${product.category}</p>
        <p><strong>Descripción:</strong> ${product.description || 'Sin descripción'}</p>
    `;
    productModal.classList.remove('hidden');
};

/** Muestra el modal de creación de producto */
export const showCreateModal = () => {
    createModalTitle.textContent = 'Crear Nuevo Producto';
    createForm.reset();
    document.querySelectorAll('.field-error').forEach(el => el.classList.add('hidden'));
    createModal.classList.remove('hidden');
};

/** Oculta un modal */
export const hideModal = (modalElement) => {
    modalElement.classList.add('hidden');
};

/**
 * Valida el formulario de creación de producto.
 * @returns {boolean} True si el formulario es válido, false en caso contrario.
 */
export const validateForm = () => {
    let isValid = true;
    const fields = ['productName', 'productPrice', 'productStock', 'productImage', 'productCategory'];    
    
    fields.forEach(fieldId => {
        const errorElement = document.getElementById(`${fieldId.replace('product', '').toLowerCase()}-error`);
        errorElement.classList.add('hidden');
    });

    fields.forEach(fieldId => {
        const input = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId.replace('product', '').toLowerCase()}-error`);

        if (input.required && !input.value.trim()) {
            errorElement.textContent = 'Este campo es obligatorio.';
            errorElement.classList.remove('hidden');
            isValid = false;
        } else if (input.type === 'number' && parseFloat(input.value) < 0) {
            errorElement.textContent = 'El valor no puede ser negativo.';
            errorElement.classList.remove('hidden');
            isValid = false;
        } else if (input.type === 'url' && !input.value.match(/^(http|https):\/\/[^ "]+$/)) {
             errorElement.textContent = 'Por favor, introduce una URL válida.';
             errorElement.classList.remove('hidden');
             isValid = false;
        }
    });

    return isValid;
};