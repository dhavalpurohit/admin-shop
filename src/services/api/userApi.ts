import { urls } from '../Urls.ts';
import { UserService } from '../http/userService.ts';
// import { ProductService } from '../http/ProductService';

export class ProductServices {
  static loginVendor() {
    return UserService.post(urls.user.loginVendor);
  }
}
