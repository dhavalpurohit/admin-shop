import { useEffect } from 'react';
import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import ProductTable from '../pages/AddProduct/ProductTable';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import {
  fetchColorCodeMain,
  vendorFetchAllCategories,
} from '../redux/slices/ProductSlice';

const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(
    (state: RootState) => state.product.categories,
  );
  const colourCodes = useSelector(
    (state: RootState) => state.product.ColorCodeMain,
  );
  useEffect(() => {
    !categories?.length && dispatch(vendorFetchAllCategories({ id: '0' }));
  }, []);
  useEffect(() => {
    if (!colourCodes) dispatch(fetchColorCodeMain());
  }, [colourCodes]);
  return (
    <>
      <Breadcrumb pageName="Product Management" />
      <div className="flex flex-col gap-10">
        <ProductTable />
      </div>
    </>
  );
};

export default Products;
