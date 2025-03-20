import { useState, useEffect } from 'react';
import useOrchidStore from '../../store/OrchidStore';

const FilterBar = () => {
    const {
        setSelectedCategory,
        setSelectedColor,
        setOrchidType,
        setSortOption,
        selectedCategories,
        selectedColors,
        selectedType,
        sortOption,
        fetchCategories,
        categories,
    } = useOrchidStore();

    // Define all available colors
    const availableColors = ['pink', 'white', 'yellow', 'purple', 'red', 'brown'];

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId);
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const handleTypeChange = (type) => {
        setOrchidType(type === selectedType ? 'all' : type);
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    return (
        <div className="filter-bar space-y-6 sticky top-20">
            {/* Sort By Section */}
            <div className="sort-section">
                <h3 className="font-medium text-lg mb-2 text-black dark:text-white">Sort By</h3>
                <select
                    className="w-full p-1 border rounded-md bg-white text-black text-sm"
                    value={sortOption}
                    onChange={handleSortChange}
                >
                    <option value="featured">Featured Items</option>
                    <option value="a-z">Name (A-Z)</option>
                    <option value="z-a">Name (Z-A)</option>
                </select>
            </div>

            {/* Categories Section with Checkboxes */}
            <div className="mb-4">
                <h4 className="font-medium mb-2 text-black dark:text-white">Categories</h4>
                <div className="space-y-2">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="category-all"
                            checked={selectedCategories.length === 0}
                            onChange={() => setSelectedCategory([])}
                            className="mr-2"
                        />
                        <label htmlFor="category-all" className="text-sm text-black dark:text-white">All Categories</label>
                    </div>
                    {categories.map(category => (
                        <div key={category.id} className="flex items-center">
                            <input
                                type="checkbox"
                                id={`category-${category.id}`}
                                checked={selectedCategories.includes(category.id.toString())}
                                onChange={() => handleCategoryChange(category.id.toString())}
                                className="mr-2"
                            />
                            <label htmlFor={`category-${category.id}`} className="text-sm text-black dark:text-white">
                                {category.name}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Type Filter as buttons */}
            <div className="mb-4">
                <h4 className="font-medium mb-2 text-black dark:text-white">Type</h4>
                <div className="flex flex-wrap gap-2">
                    <button
                        className={`px-3 text-sm py-1 rounded ${selectedType === 'all'
                            ? 'bg-rose-500 dark:bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                        onClick={() => handleTypeChange('all')}
                    >
                        All
                    </button>
                    <button
                        className={`px-3 text-sm py-1 rounded ${selectedType === 'nature'
                            ? 'bg-rose-500 dark:bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                        onClick={() => handleTypeChange('nature')}
                    >
                        Natural
                    </button>
                    <button
                        className={`px-3 text-sm py-1 rounded ${selectedType === 'special'
                            ? 'bg-rose-500 dark:bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                            }`}
                        onClick={() => handleTypeChange('special')}
                    >
                        Special
                    </button>
                </div>
            </div>

            {/* Color Filter */}
            <div className="mb-4">
                <h4 className="font-medium mb-2 text-black dark:text-white">Colors</h4>
                <div className="flex flex-wrap gap-2">
                    {availableColors.map((color, index) => (
                        <div key={index} className="flex-col gap-2 mr-2 text-center">
                            <button
                                key={color}
                                className={`w-8 h-8 rounded-full border-2 border-gray-200 ${selectedColors.includes(color) ? 'ring-2 ring-offset-2 ring-accent' : ''
                                    }`}
                                style={{ backgroundColor: color }}
                                onClick={() => handleColorChange(color)}
                                aria-label={`Filter by ${color}`}
                                title={color.charAt(0).toUpperCase() + color.slice(1)}
                            />
                            <p className='text-black dark:text-white text-xs'>{color}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default FilterBar;