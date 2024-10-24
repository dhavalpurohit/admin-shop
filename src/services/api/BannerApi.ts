import { urls } from '../Urls.ts';
import { CommonService } from '../http/commonService.ts';

export class BannerServices {
  static allBannerList(data: object) {
    return CommonService.post(urls.banner.allBannerList, data);
  }
}
