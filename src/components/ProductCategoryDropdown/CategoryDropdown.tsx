import React from 'react';

interface CategoryDropdownProps {
  selectedCategory?: string; // Selected category value
  onCategoryChange?: (category: string) => void; // Change handler function
}

const categories = [
  { name: 'Electronics', value: 'electronics' },
  { name: 'Fashion', value: 'fashion' },
  { name: 'Home & Garden', value: 'home_garden' },
  { name: 'Health & Beauty', value: 'health_beauty' },
  { name: 'Sports', value: 'sports' },
  // Add more categories as needed
];

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
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
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryDropdown;
