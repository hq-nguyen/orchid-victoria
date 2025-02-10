import PropTypes from 'prop-types';

const Ribbon = ({ isSpecial }) => {
    if (!isSpecial) return null;
    return (
        <div className="absolute z-40 top-[16px] w-[160px] text-center -left-[44px] bg-green-600 text-white px-[20px] py-[5px] text-md -rotate-45 shadow-md font-semibold">
            Special
        </div>
    )
};

Ribbon.propTypes = {
    isSpecial: PropTypes.bool.isRequired,

};
export default Ribbon