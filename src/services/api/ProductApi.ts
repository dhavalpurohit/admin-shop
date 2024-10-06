import { Product } from '../../types/product.ts';
import { urls } from '../Urls.ts';
import { ProductService } from '../http/ProductService';

export class ProductServices {
  static createSingleProduct(productDetails: Product) {
    return ProductService.post(urls.product.createSingleProduct, productDetails);
  }
}
