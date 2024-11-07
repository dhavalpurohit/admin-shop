import { urls } from '../Urls.ts';
import { CommonService } from '../http/commonService.ts';

export class OrderServices {
  static orderList(data: object) {
    return CommonService.post(urls.orderList, data);
  }
}
