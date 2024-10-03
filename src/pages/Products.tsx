import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableTwo from '../components/Tables/TableTwo';

const Products = () => {
  return (
    <>
      <Breadcrumb pageName="Product Management" />
      <div className="flex flex-col gap-10">
        <TableTwo />
      </div>
    </>
  );
};

export default Products;
