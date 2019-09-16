export interface Product {
    no?: number; // id used for tablulation and pagination
    $key?: string; // Product key
    title: string;
    price: number;
    category: string;
    imageUrl: string;
}