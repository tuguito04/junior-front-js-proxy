// js/paginator.js
// Lógica para el control de la paginación

const pagination = document.getElementById('pagination');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');

let currentPage = 1;
let totalProducts = 0;
let pageSize = 10;

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

export const resetPaginator = () => {
    currentPage = 1;
    updatePaginator(0);
};

export const getCurrentPage = () => currentPage;