import { Link } from 'react-router-dom';
import { data } from '../../assets/data';

const AboutUsSection = () => {
    return (
        <section className="bg-white dark:bg-gray-800 py-16">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Image Section */}
                <div className="rounded-lg overflow-hidden shadow-md">
                    <img
                        className="w-full h-auto object-cover"
                        src={data.garden}
                        alt="Orchid Greenhouse"
                    />
                </div>

                {/* Text Section */}
                <div className="text-gray-800 dark:text-white">
                    <h4 className="uppercase text-sm mb-2 text-gray-500 dark:text-gray-400">About Us</h4>
                    <h2 className="text-3xl font-semibold mb-4">Orchid Vitoria Garden</h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-6">
                        At our nursery in the heart of the New Forest, everything we grow gets months of loving
                        years of attention and six decades' worth of experience.
                    </p>
                    <Link
                        to="/about-us"
                        className="bg-rose-500 dark:bg-blue-500 hover:bg-rose-700 dark:hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                        About Us
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default AboutUsSection;
