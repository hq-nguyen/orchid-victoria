import { orchids } from '../assets/data';
import OrchidCard from '../components/OrchidCard/OrchidCard';

const SpecialOrchid = () => {
    const specialOrchids = orchids.filter(orchid => orchid.isSpecial);

    return (
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 py-16'>
            {specialOrchids.map((orchid, index) => (
                <OrchidCard
                    key={index}
                    id={orchid.Id}
                    image={orchid.image}
                    name={orchid.name}
                    origin={orchid.origin}
                    isSpecial={orchid.isSpecial}
                    rating={orchid.rating}
                    category={orchid.category}
                    description={orchid.description}
                />
            ))}
        </div>
    );
};

export default SpecialOrchid;
