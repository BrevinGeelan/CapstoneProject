
export async function GetAllProducts() {
    try {
        const response = await fetch ("https://fakestoreapi.com/products");
        const result = await response.json();
        return result
    } catch (error) {
        console.error(error);
        throw error
    }
}