import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from 'react-slick';
import { fetchOrchids } from '../../service/api.orchid';
import OrchidCard from '../OrchidCard/OrchidCard';

const OrchidsShowCase = () => {
    const [orchids, setOrchids] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        AOS.init({ duration: 800, once: true });

        const getOrchids = async () => {
            try {
                const response = await fetchOrchids();
                const specialOrchids = response.filter(orchid => orchid.special).slice(0, 12);
                setOrchids(specialOrchids);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orchids:', error);
                setLoading(false);
            }
        };
        getOrchids();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } }
        ]
    };

    return (
        <div className="py-8">
            <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-700 my-8 py-12 px-4 sm:px-6 lg:px-8 rounded-lg shadow-lg">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-extrabold text-primary dark:text-blue-800 tracking-tight sm:text-4xl" data-aos="fade-down">
                        Featured Orchids Showcase
                    </h2>
                    <p className="mt-3 max-w-2xl mx-auto text-xl dark:text-white text-gray-600" data-aos="fade-up">
                        Discover our most rare and exceptional orchid specimens
                    </p>
                </div>
                {loading ? (
                    <div className="flex justify-center">
                        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-primary" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <Slider {...settings}>
                        {orchids.map((orchid, index) => (
                            <div key={index} className='px-2' data-aos="zoom-in">
                                <OrchidCard {...orchid} />
                            </div>
                        ))}
                    </Slider>
                )}
            </div>

        </div>
    );
};

export default OrchidsShowCase;