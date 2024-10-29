import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import OrderTable from './Table';

const Order = () => {
  return (
    <>
      <Breadcrumb pageName="Order Management" />
      <div className="flex flex-col gap-10">
        <OrderTable />
      </div>
    </>
  );
};

export default Order;
