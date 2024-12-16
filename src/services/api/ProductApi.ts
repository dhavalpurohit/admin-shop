import { Product } from '../../types/product.ts';
import { urls } from '../Urls.ts';
import { CommonService } from '../http/commonService.ts';

export class ProductServices {
  static createSingleProduct(productDetails: Product) {
    return CommonService.post(urls.product.createSingleProduct, productDetails);
  }
  static vendorFetchAllCategories(productIds: object) {
    return CommonService.post(
      urls.product.vendorFetchAllCategories,
      productIds,
    );
  }

  static fetchColorCodeMain() {
    return CommonService.get(urls.colour.fetchColorCodeMain);
  }

  static fetchProductBrands() {
    return CommonService.get(urls.brands);
  }
  static productSearchList(data: object) {
    return CommonService.post(urls.product.productsList, data);
  }
  static fetchProductSampleFile() {
    return CommonService.get(urls.samplefile);
  }

  static createBulkProduct(data: object) {
    return CommonService.post(urls.product.createBulkProduct, data);
  }

  static bulkProductXlsList() {
    return CommonService.post(urls.product.bulkProductXlsList);
  }

  static productAddMultipleImages(data: object) {
    return CommonService.post(urls.product.productAddMultipleImages, data);
  }

  static productAttributeAddUpdate(data: object) {
    return CommonService.post(urls.product.productAttributeAddUpdate, data);
  }

  static productOptionAddUpdate(data: object) {
    return CommonService.post(urls.product.productOptionAddUpdate, data);
  }
}
