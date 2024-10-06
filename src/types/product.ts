// export type Product = {
//   image: string;
//   name: string;
//   category: string;
//   price: number;
//   sold: number;
//   profit: number;
// };

export interface Product {
  user_id: string;
  id: string;
  name: string;
  sale_price: string;
  regular_price: string;
  category_id: string;
  product_url: string;
  vendor_product_id: string;
  vendor_id: string;
  brand_id: string;
  status: string;
  quantity: string;
  image: string;
  description: string;
  do_not_display: string;
  stock: string;
  keywords: string;
  weight: string;
  skuid: string;
  GST: string;
  HSNCode: string;
  CountryOfOrigin: string;
  StyleID: string;
}