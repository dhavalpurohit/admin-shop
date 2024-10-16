import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import BannerTable from './Table';

const Banner = () => {
  return (
    <>
      <Breadcrumb pageName="Banner Management" />
      <div className="flex flex-col gap-10">
        <BannerTable />
      </div>
    </>
  );
};

export default Banner;
