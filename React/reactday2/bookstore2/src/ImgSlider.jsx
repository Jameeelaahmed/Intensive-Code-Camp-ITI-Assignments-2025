import { useState } from 'react';
import './App.css';

function ImageSlider() {
    const images = [
        '1.jpg',
        '2.jpg',
        '3.jpg',
        '4.jpg',
        '5.jpg',
    ];

    const [curInd, setCurInd] = useState(0);

    function handleGoToPrev() {
        if (curInd > 0) {
            setCurInd(curInd - 1);
        }
    }

    function handleGoToNext() {
        if (curInd < images.length - 1) {
            setCurInd(curInd + 1);
        }
    }

    return (
        <div className="container">
            <button
                onClick={handleGoToPrev}
                className="arrow left"
                disabled={curInd === 0}
            >
                ❮
            </button>

            <img
                src={images[curInd]}
                alt={`Slide ${curInd}`}
                className="image"
            />

            <button
                onClick={handleGoToNext}
                className="arrow right"
                disabled={curInd === images.length - 1}
            >
                ❯
            </button>
        </div>
    );
};

export default ImageSlider;
