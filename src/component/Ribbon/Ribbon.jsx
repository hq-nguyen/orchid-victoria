import PropTypes from 'prop-types';

const Ribbon = ({
    isSpecial,
    ribbonColor = 'bg-green-600',
    textColor = 'text-white',
    ribbonWidth = 'w-[160px]',
    ribbonTop = 'top-[16px]',
    ribbonLeft = '-left-[44px]',
    ribbonFontSize = 'text-md'
}) => {
    if (!isSpecial) return null;

    return (
        <div className={`absolute z-40 ${ribbonTop} ${ribbonWidth} text-center ${ribbonLeft} ${ribbonColor} ${textColor} px-[20px] py-[5px] ${ribbonFontSize} -rotate-45 shadow-md font-semibold`}>
            Special
        </div>
    );
};

Ribbon.propTypes = {
    isSpecial: PropTypes.bool, // Now optional with a default value implied
    ribbonColor: PropTypes.string,
    textColor: PropTypes.string,
    ribbonWidth: PropTypes.string,
    ribbonTop: PropTypes.string,
    ribbonLeft: PropTypes.string,
    ribbonText: PropTypes.string,
    ribbonFontSize: PropTypes.string
};

export default Ribbon;
