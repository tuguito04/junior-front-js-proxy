// js/paginator.js
// Lógica para el control de la paginación

const pagination = document.getElementById('pagination');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

let currentPage = 1;
let totalProducts = 0;
let pageSize = 10;

// inicializar paginador
// configura eventos de los botones anterior y siguiente
export const initPaginator = (onPageChangeCallback) => {
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            onPageChangeCallback(currentPage);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(totalProducts / pageSize)) {
            currentPage++;
            onPageChangeCallback(currentPage);
        }
    });
};

// actualizar paginador
// actualiza la interfaz y el estado según total de productos
export const updatePaginator = (total, newPageSize) => {
    totalProducts = total;
    if (newPageSize) pageSize = newPageSize;
    const totalPages = Math.ceil(totalProducts / pageSize);
    
    pageInfo.textContent = `Página ${currentPage} de ${totalPages}`;
    prevBtn.disabled = (currentPage === 1);
    nextBtn.disabled = (currentPage >= totalPages);

    if (totalProducts > 0) {
        pagination.classList.remove('hidden');
    } else {
        pagination.classList.add('hidden');
    }
};

// reiniciar paginador
// reinicia la página actual a 1 y oculta paginación
export const resetPaginator = () => {
    currentPage = 1;
    updatePaginator(0);
};

// obtener página actual
// devuelve la página actual del paginador
export const getCurrentPage = () => currentPage;