export const urls = {
  product: {
    createSingleProduct: 'product-add-update',
    vendorFetchAllCategories: 'admin-vendor-fetch-all-categories',
    productsList: '/vendor-product-list',
    createBulkProduct: 'insert-product-details-from-excel',
    bulkProductXlsList: 'excel-upload-summary-list',
    productAddMultipleImages: 'product-images-add-multiple',
    productAttributeAddUpdate: 'product-attribute-add-update',
    productOptionAddUpdate: 'product-option-add-update',
  },
  colour: {
    fetchColorCodeMain:
      'fetch_color_code_main?color_code_id&search&page_number&page_size=100&orderBy',
  },
  brands:
    'fetch_product_brand?search=&product_brand_id=&page_number=&page_size=100&orderBy=z-a',
  user: {
    loginVendor: 'admin-vendor-login',
  },
  banner: {
    allBannerList: 'vendor-banner-list-for-all-banners',
    createBanner: 'vendor-banner-add-update',
  },
  samplefile: 'extract-excel-validation-data',

  orderList: 'vendor-order-display',
};
