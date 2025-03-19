import { useState, useEffect } from 'react';
import { getCategories } from '../../service/api.category';
import LoadingComponent from '../Loading/Loading';

const CategorySection = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await getCategories();
                setCategories(categoriesData.slice(0, 4)); // Get only the first 4 categories
                setLoading(false);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return <LoadingComponent text="Loading categories..." />;
    }

    return (
        <section className="py-8 bg-gray-50 dark:bg-gray-800">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl mb-8 font-extrabold text-primary dark:text-blue-800 tracking-tight sm:text-4xl">
                    Explore Orchid Categories
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="bg-white dark:bg-gray-700 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
                        >
                            <img
                                className="w-full h-48 object-cover object-center"
                                src={category.image}
                                alt={category.name}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white text-center">
                                    {category.name}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;
