// js/ui.js
const productsList = document.getElementById('productsList');
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const errorMessage = document.getElementById('errorMessage');
const filterSelect = document.getElementById('categorySelect'); 
const createSelect = document.getElementById('productCategory');
const productModal = document.getElementById('productModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const createModal = document.getElementById('createModal');
const createModalTitle = document.getElementById('createModalTitle');
const createForm = document.getElementById('createForm');
const successMessage = document.getElementById('successMessage');
const createErrorMessage = document.getElementById('errorMessage');

//Renderiza la lista de productos en la interfaz de usuario.

export const renderProducts = (products, onProductClick) => {
    productsList.innerHTML = '';

    if (products.length === 0) {
        productsList.innerHTML = '<p style="text-align: center; color: var(--gray-500); grid-column: 1 / -1; padding: var(--space-8) 0;">No se encontraron productos que coincidan con la búsqueda.</p>';
        return;        
    }

    products.forEach(product => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.setAttribute('role', 'gridcell');
        card.dataset.id = product.id; // Añadimos el ID para referencia
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

//Renderiza las opciones de categoría en el select.

export const renderCategories = (categories) => {

    // --- Rellenar filtro principal ---
    if (filterSelect) {
        filterSelect.innerHTML = '<option value="">Todas las categorías</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
            filterSelect.appendChild(option);
        });
    }

    // --- Rellenar modal ---
    if (createSelect) {
        createSelect.innerHTML = '<option value="">Seleccionar categoría</option>';
        categories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1);
            createSelect.appendChild(option);
        });
    }

};

//Muestra y oculta estados de la UI

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

//Muestra el modal con los detalles de un producto.
export const showProductModal = (product) => {
    modalTitle.textContent = product.name;
    modalBody.innerHTML = `
        <img src="${product.image}" alt="${product.name}" style="width:220px; height:220px; border-radius:12px; margin: 0 auto 1rem; display: block;" onerror="this.onerror=null;this.src='https://placehold.co/600x400/E5E7EB/9CA3AF?text=No+Imagen';">
        <p><strong>ID:</strong> ${product.id}</p>
        <p><strong>Precio:</strong> $${parseFloat(product.price).toFixed(2)}</p>
        <p><strong>Stock:</strong> ${product.stock} unidades</p>
        <p><strong>Categoría:</strong> ${product.category}</p>
        <p><strong>Creado el:</strong> ${new Date(product.createdAt).toLocaleDateString()}</p>
        <p><strong>Marca:</strong> ${product.brand}</p>
    `;
    productModal.classList.remove('hidden');

};

//Muestra un mensaje de éxito en el modal de creación.
export const showSuccessMessage = () => {
    successMessage.classList.remove('hidden');
    createErrorMessage.classList.add('hidden'); // Asegurarse de que el de error esté oculto
};

//Muestra un mensaje de error en el modal de creación.
export const showCreateErrorMessage = () => {
    createErrorMessage.classList.remove('hidden');
    successMessage.classList.add('hidden'); // Asegurarse de que el de éxito esté oculto
};

//Oculta todos los mensajes de estado en el modal de creación.
export const hideCreateMessages = () => {
    successMessage.classList.add('hidden');
    createErrorMessage.classList.add('hidden');
};

//Muestra el modal de creación de producto 
export const showCreateModal = () => {
    createModalTitle.textContent = 'Crear Nuevo Producto';
    createForm.reset();
    document.querySelectorAll('.field-error').forEach(el => el.classList.add('hidden'));
    hideCreateMessages(); // Ocultar mensajes al abrir el modal
    createModal.classList.remove('hidden');
};

//Oculta un modal

export const hideModal = (modalElement) => {
    modalElement.classList.add('hidden');
};

//Valida el formulario de creación de producto.
// Evitar "e", "+", "-"
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('keydown', e => {
            if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
        });

    });

});

export const validateForm = () => {
    let isValid = true;
    const fields = ['productName', 'productPrice', 'productStock', 'productImage', 'productCategory'];

    // Definir reglas de validación por tipo de input
    const validationRules = {
        text: [
            { check: input => input.validity.valueMissing, msg: 'Este campo es obligatorio.' },
            { check: input => input.validity.tooShort, msg: input => `Debe tener al menos ${input.minLength} caracteres.` },            
        ],
        number: [
            { check: input => input.validity.valueMissing, msg: 'Este campo es obligatorio.' },
            { check: input => parseFloat(input.value) < 0, msg: 'El valor no puede ser negativo.' },            
        ],
        url: [
            { check: input => input.validity.valueMissing, msg: 'Este campo es obligatorio.' },
            { check: input => input.validity.typeMismatch, msg: 'Por favor, introduce una URL válida.' },
            { check: input => !/^https?:\/\/[\w.-]+(\.[\w\.-]+)+[/#?]?.*$/.test(input.value), 
              msg: 'Por favor, introduce una URL válida que comience con http:// o https://'
            },
        ],
    };

    fields.forEach(fieldId => {
        const input = document.getElementById(fieldId);
        const errorElement = document.getElementById(`${fieldId.replace('product', '').toLowerCase()}-error`);

        // Reset
        errorElement.textContent = '';
        errorElement.classList.add('hidden');

        const rules = validationRules[input.type] || validationRules.text;
        for (let rule of rules) {
            if (rule.check(input)) {
                errorElement.textContent = typeof rule.msg === 'function' ? rule.msg(input) : rule.msg;
                errorElement.classList.remove('hidden');
                isValid = false;
                break; // solo mostrar primer error
            }
        }
        
    });

    return isValid;
};


