import { Helmet } from 'react-helmet'; 
import { orchids } from '../assets/data'; 
import { Link } from 'react-router-dom';

const AboutUs = () => {
    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>About Us - World of Orchids</title>
                <meta name="description" content="Learn about the world of orchids.  A comprehensive list of orchid species and information." />
            </Helmet>

            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-8">About Us</h1>

            <div className="prose text-black dark:prose-invert max-w-none mb-8">
                <p>Welcome to our comprehensive resource dedicated to the fascinating world of orchids! Our mission is to provide enthusiasts, researchers, and anyone curious about these exquisite flowers with a wealth of information. From the most common varieties to the rarest species, we aim to cover every aspect of orchid biology, cultivation, and conservation.</p>

                <h2>Orchids Around the World</h2>
                <p>Explore our list of orchids, showcasing the incredible diversity of this plant family:</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {orchids.map((orchid) => (
                    <div key={orchid.Id} className="bg-white dark:bg-gray-800 shadow rounded-lg p-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{orchid.name}</h3>
                        <img src={orchid.image} alt={orchid.name} className="w-full h-48 object-cover rounded-md mb-2" />
                        <p className="text-gray-700 dark:text-gray-400">Origin: {orchid.origin}</p>
                        <p className="text-gray-700 dark:text-gray-400">Category: {orchid.category}</p>
                        <p className="text-gray-700 dark:text-gray-400">{orchid.description && orchid.description.substring(0, 100) + '...'}</p> {/* Shortened description */}
                    </div>
                ))}
            </div>

            <div className="prose dark:prose-invert max-w-none mt-8">
                <p>We are constantly expanding our database. If you have any suggestions or information to contribute, please do not hesitate to <Link to="/contact">contact us</Link>!</p>
            </div>
        </div>
    );
};

export default AboutUs;
