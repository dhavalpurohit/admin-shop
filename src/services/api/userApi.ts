import { urls } from '../Urls.ts';
import { CommonService } from '../http/commonService.ts';

export class UserServices {
  static loginVendor(data: object) {
    return CommonService.post(urls.user.loginVendor, data);
  }
}
