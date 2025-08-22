// js/config.js
// Archivo de configuración para datos globales

export const API_CONFIG = {
    // No terminado
    API_URL: 'https://api.example.com',
};

export const PAGINATION_CONFIG = {
    PAGE_SIZE: 10,
};

export const MOCK_DATA = {
    products: Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        name: `Producto de Prueba ${i + 1}`,
        price: (Math.random() * 500 + 10).toFixed(2),
        image: `https://picsum.photos/300/220?random=${i}`,
        category: i % 2 === 0 ? "electronics" : "jewelery",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        stock: Math.floor(Math.random() * 200) + 1 
    })),
    categories: ["electronics", "jewelery", "mens's clothing", "women's clothing"],
};