import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface CategoryDropdownProps {
  selectedCategory?: string; // Selected category value
  onCategoryChange?: (category: string) => void; // Change handler function
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  const categories = useSelector(
    (state: RootState) => state.product?.categories?.categories,
  );

  // const productFilteredData = useSelector(
  //   (state: RootState) => state.product.productFilteredData,
  // );

  // const categories = productFilteredData?.categories?.map?.(
  //   (cat: { name: string; id: number, parent_id: any }) => ({
  //     name: cat.name, // Map `name`
  //     id: cat.id, // Keep `id` as is
  //     parent_id: cat.parent_id,
  //   }),
  // );

  const topLevelCategories = categories?.filter(
    (category: Category) => category.parent_id === '0',
  );

  return (
    <div className="relative">
      <label
        className="mb-3 block text-sm font-medium text-black dark:text-white"
        htmlFor="category"
      >
        Category
      </label>
      <select
        id="category"
        value={selectedCategory}
        onChange={(e) => onCategoryChange && onCategoryChange(e.target.value)}
        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      >
        <option value="">category</option>
        {topLevelCategories?.map((category: Category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
