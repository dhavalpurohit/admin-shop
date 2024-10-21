import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface SubCategoryDropdownProps {
  selectedSubCategory?: string; // Selected sub-category value
  onSubCategoryChange?: (subCategory: string) => void; // Change handler function
  category?: string; // Current selected category to filter sub-categories
}

// const subCategoriesMap: Record<string, { name: string; value: string }[]> = {
//   electronics: [
//     { name: 'Mobile Phones', value: 'mobile_phones' },
//     { name: 'Laptops', value: 'laptops' },
//     { name: 'Cameras', value: 'cameras' },
//   ],
//   fashion: [
//     { name: 'Clothing', value: 'clothing' },
//     { name: 'Footwear', value: 'footwear' },
//     { name: 'Accessories', value: 'accessories' },
//   ],
//   home_garden: [
//     { name: 'Furniture', value: 'furniture' },
//     { name: 'Kitchen', value: 'kitchen' },
//     { name: 'Gardening', value: 'gardening' },
//   ],
//   health_beauty: [
//     { name: 'Skincare', value: 'skincare' },
//     { name: 'Makeup', value: 'makeup' },
//     { name: 'Haircare', value: 'haircare' },
//   ],
//   sports: [
//     { name: 'Fitness Equipment', value: 'fitness_equipment' },
//     { name: 'Sports Apparel', value: 'sports_apparel' },
//     { name: 'Outdoor Gear', value: 'outdoor_gear' },
//   ],
// };

const SubCategoryDropdown: React.FC<SubCategoryDropdownProps> = ({
  selectedSubCategory,
  onSubCategoryChange,
  category,
}) => {

  console.log("selected category " , category);
  const categories = useSelector(
    (state: RootState) => state.product?.categories?.categories,
  );
  const subCategories = categories?.filter(
    (categorymap : Category) => categorymap.parent_id === category
  );
  return (
    <div className="relative">
      <label
        className="mb-3 block text-sm font-medium text-black dark:text-white"
        htmlFor="subCategory"
      >
        Sub-Category
      </label>
      <select
        id="subCategory"
        value={selectedSubCategory}
        onChange={(e) => onSubCategoryChange && onSubCategoryChange(e.target.value)}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
        disabled={!category} // Disable if no category is selected
      >
        <option value="">sub-category</option>
        {subCategories?.map((subCategory : Category) => (
          <option key={subCategory.id} value={subCategory.id}>
            {subCategory.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SubCategoryDropdown;
