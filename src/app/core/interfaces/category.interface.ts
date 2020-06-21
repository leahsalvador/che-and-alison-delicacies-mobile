import { ProductCategory } from './../enums/product-category.enum';
export interface CategoryModel{
    id: ProductCategory;
    category: string;
    active: boolean;
    products ?: any[];
}