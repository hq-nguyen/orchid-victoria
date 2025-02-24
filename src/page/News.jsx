// NewsPage.jsx
import { Helmet } from 'react-helmet';
import {data} from '../assets/data';

const NewsPage = () => {
    const newsArticles = [
        {
            id: 1,
            title: "New Orchid Species Discovered in Borneo",
            date: "2025-02-12",
            content: "A team of botanists has discovered a new species of orchid in the rainforests of Borneo. The orchid, named Bulbophyllum mirabile, is notable for its unique coloration and fragrance...",
            imageUrl: data.news_1, // Placeholder image URL
            source: "The Orchid Journal"
        },
        {
            id: 2,
            title: "Orchid Conservation Efforts Gain Momentum",
            date: "2025-02-05",
            content: "Conservation organizations are reporting increased success in their efforts to protect endangered orchid species. New strategies, including habitat preservation and community involvement, are proving effective...",
            imageUrl: data.news_2,
            source: "Orchid Conservation Society"
        },
        {
            id: 3,
            title: "Tips for Growing Orchids at Home",
            date: "2025-01-28",
            content: "Learn how to successfully grow orchids in your home with these expert tips. From watering techniques to lighting requirements, we cover everything you need to know to cultivate these beautiful plants...",
            imageUrl: data.news_3,
            source: "Orchid Enthusiast Magazine"
        },
        {
            id: 4,
            title: "Rare Ghost Orchid Spotted in Florida Everglades",
            date: "2025-01-15",
            content: "A rare ghost orchid has been sighted in the Florida Everglades, delighting botanists and nature enthusiasts. The ghost orchid, known for its ethereal beauty, is a rare find due to its elusive nature...",
            imageUrl: data.news_4,
            source: "Florida Wildflower Foundation"
        },
        {
            id: 5,
            title: "Orchid Show Returns to New York Botanical Garden",
            date: "2025-01-08",
            content: "After a two-year hiatus, the annual orchid show at the New York Botanical Garden is back in full bloom. Visitors can enjoy a stunning display of orchids from around the world, including rare and exotic species...",
            imageUrl: data.news_5,
            source: "New York Botanical Garden"
        },
        {
            id: 6,
            title: "Orchid Experts Share Insights at International Symposium",
            date: "2024-12-20",
            content: "Leading orchid experts from around the world gathered at the International Orchid Symposium to share their latest research and discoveries. Topics ranged from orchid taxonomy to conservation strategies...",
            imageUrl: data.news_6,
            source: "Orchid Research Institute"
        }
    ];

    return (
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <Helmet>
                <title>Orchid News - Stay Updated on the World of Orchids</title>
                <meta name="description" content="Read the latest news and updates about orchids, including new discoveries, conservation efforts, and growing tips." />
            </Helmet>

            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-8">Orchid News</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"> {/* Updated grid layout */}
                {newsArticles.map((article) => (
                    <div key={article.id} className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
                        {/* Image */}
                        <img src={article.imageUrl} alt={article.title} className="w-full h-64 object-cover" />

                        {/* Title and Description */}
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{article.title}</h2>
                            <p className="text-gray-700 dark:text-gray-400">{article.content.substring(0, 150)}...</p> {/* Shortened description */}
                        </div>

                        {/* Date, Source, and Buttons */}
                        <div className="px-6 py-4 flex flex-col">
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                {new Date(article.date).toLocaleDateString()} | Source: {article.source}
                            </p>
                            <div className="flex justify-between">
                                <button className="inline-block bg-primary-500 text-rose-500 hover:bg-primary-700 dark:text-white font-bold py-2 px-4 rounded">Read More</button> 
                                <button className="bg-rose-600 hover:bg-rose-500 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-bold py-2 px-4 rounded">Share</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsPage;
