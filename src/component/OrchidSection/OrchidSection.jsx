// import OrchidPresentation from './OrchidPresentation'
import { orchids } from '../../assets/data'
import OrchidCard from '../OrchidCard/OrchidCard'

const OrchidSection = () => {
  return (
    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 py-16'>
      {orchids.map((orchid, index) => (
        <OrchidCard
          key={index}
          id={orchid.Id}
          image={orchid.image}
          name={orchid.name}
          origin={orchid.origin}
          category={orchid.category}
          description={orchid.description}
          />
      ))}
    </div>
  )
}

export default OrchidSection