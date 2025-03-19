import { useRef, useEffect } from 'react';
import { IoMdClose } from "react-icons/io";
import ModalPortal from './ModalPortal';

const QuickViewModel = ({ orchid, onClose }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        document.body.style.overflow = 'hidden'; 

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [onClose]);

    if (!orchid) {
        return null;
    }

    return (
        <ModalPortal>
            <div id="default-modal" className="fixed top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center overflow-x-hidden overflow-y-auto bg-gray-500 bg-opacity-50">
                <div className="relative p-4 w-full max-w-lg max-h-full" ref={modalRef}>
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {orchid.name}
                            </h3>
                            <button
                                type="button"
                                className="text-red-600 bg-transparent hover:bg-red-200 hover:text-red-700 rounded-lg text-lg w-8 h-8 inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                onClick={onClose}
                            >
                                <IoMdClose />
                            </button>
                        </div>
                        <div className="p-4 md:p-5 space-y-4">
                            <img
                                className="w-full h-80 object-fit rounded-md mb-4 shadow-lg"
                                src={orchid.image[0]} 
                                alt={orchid.name}
                            />
                            <p className="text-base leading-relaxed text-black dark:text-gray-400">
                                Origin: <span className='text-red-500'>{orchid.origin}</span>
                            </p>
                            <p className="text-base leading-relaxed text-black dark:text-gray-400">
                                Category: <span className='text-red-500'>{orchid.category}</span>
                            </p>
                            <p className='text-base leading-relaxed text-black dark:text-gray-400'>
                                Description: <span className='text-red-500'>{orchid.description}</span>
                            </p>
                        </div>
                        <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                            <button
                                onClick={onClose}
                                type="button"
                                className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </ModalPortal>
    );
};

export default QuickViewModel;
