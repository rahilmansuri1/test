export const processProductResponse = (products) => {
    return products.map(product => {
        product.show = true;
        return product;
    })
} 