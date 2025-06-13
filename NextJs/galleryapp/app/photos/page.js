'use client';
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import styles from "./photoes.module.css";

export default function Gallery() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [images, setImages] = useState([]);
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const [currentImageIndex, setCurrentImageIndex] = useState(-1);
    const [isSliderOpen, setIsSliderOpen] = useState(false);

    const categories = [
        { id: 'all', name: 'All Photos' },
        { id: 'nature', name: 'Nature' },
        { id: 'urban', name: 'Urban' },
        { id: 'portraits', name: 'Portraits' },
        { id: 'events', name: 'Events' },
    ];

    const fetchUploadedPhotos = async (category) => {
        try {
            const query = category === 'all' ? '' : `?category=${category}`;
            const res = await fetch(`/api/uploads${query}`);
            const data = await res.json();
            setUploadedPhotos(data.images || []);
        } catch (error) {
            console.error("Error fetching uploaded photos:", error);
        }
    };

    const fetchImages = async (category = 'random') => {
        try {
            const query = category === 'all' ? 'random' : category;
            const res = await fetch(`/api/pexels?query=${query}`);
            const data = await res.json();
            setImages(data.photos || []);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        fetchImages(activeCategory);
        fetchUploadedPhotos(activeCategory);
    }, [activeCategory]);

    const allImages = [
        ...uploadedPhotos.map(item => ({
            type: 'uploaded',
            src: item.url,
            category: item.category
        })),
        ...images.map(image => ({
            type: 'pexels',
            src: image.src?.large || image.src?.original || '',
            category: activeCategory
        }))
    ];

    const openSlider = useCallback((index) => {
        setCurrentImageIndex(index);
        setIsSliderOpen(true);
        document.body.style.overflow = 'hidden';
    }, []);

    const closeSlider = useCallback(() => {
        setIsSliderOpen(false);
        document.body.style.overflow = 'auto';
    }, []);

    const goToPrev = useCallback((e) => {
        e.stopPropagation();
        setCurrentImageIndex(prev => (prev - 1 + allImages.length) % allImages.length);
    }, [allImages.length]);

    const goToNext = useCallback((e) => {
        e.stopPropagation();
        setCurrentImageIndex(prev => (prev + 1) % allImages.length);
    }, [allImages.length]);

    // Handle keyboard navigation
    useEffect(() => {
        if (!isSliderOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeSlider();
            } else if (e.key === 'ArrowLeft') {
                setCurrentImageIndex(prev => (prev - 1 + allImages.length) % allImages.length);
            } else if (e.key === 'ArrowRight') {
                setCurrentImageIndex(prev => (prev + 1) % allImages.length);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isSliderOpen, closeSlider, allImages.length]);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Photo Gallery</h1>
                <p className={styles.subtitle}>Discover our visual collection</p>
                <div className={styles.categories}>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`${styles.categoryButton} ${activeCategory === category.id ? styles.active : ''}`}
                            onClick={() => setActiveCategory(category.id)}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>
            </header>

            <div className={styles.gallery}>
                {/* Uploaded Photos */}
                {uploadedPhotos.map((item, index) => (
                    <div
                        key={`uploaded-${index}`}
                        className={styles.galleryItem}
                        onClick={() => openSlider(index)}
                    >
                        <div className={styles.imageContainer}>
                            {item.url && (
                                <Image
                                    src={item.url}
                                    alt={`Uploaded Image ${index}`}
                                    width={300}
                                    height={200}
                                    className={styles.image}
                                />
                            )}
                            <div className={styles.imageOverlay}>
                                <div className={styles.imageInfo}>
                                    <span className={styles.imageCategory}>{item.category}</span>
                                    <button
                                        className={styles.deleteButton}
                                        onClick={async (e) => {
                                            e.stopPropagation();
                                            const filename = item.url.split("/").pop();
                                            await fetch(`/api/uploads?filename=${filename}`, { method: "DELETE" });
                                            fetchUploadedPhotos(activeCategory);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Pexels Images */}
                {images.map((image, index) => {
                    const src = image?.src?.medium || image?.src?.original || null;
                    return (
                        <div
                            key={`pexels-${image.id || index}`}
                            className={styles.galleryItem}
                            onClick={() => openSlider(uploadedPhotos.length + index)}
                        >
                            <div className={styles.imageContainer}>
                                {src && (
                                    <Image
                                        src={src}
                                        alt={`Gallery image ${image.id || index}`}
                                        width={300}
                                        height={200}
                                        className={styles.image}
                                    />
                                )}
                                <div className={styles.imageOverlay}>
                                    <div className={styles.imageInfo}>
                                        <span className={styles.imageCategory}>{activeCategory}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Image Slider */}
            {isSliderOpen && (
                <div className={styles.sliderOverlay} onClick={closeSlider}>
                    <div className={styles.sliderContainer} onClick={e => e.stopPropagation()}>
                        <button className={styles.closeButton} onClick={closeSlider}>
                            &times;
                        </button>

                        <div className={styles.sliderContent}>
                            <button
                                className={styles.navButton}
                                onClick={goToPrev}
                                aria-label="Previous image"
                            >
                                &lt;
                            </button>

                            <div className={styles.sliderImageWrapper}>
                                {allImages[currentImageIndex] && (
                                    <img
                                        src={allImages[currentImageIndex].src}
                                        alt={`Gallery image ${currentImageIndex}`}
                                        className={styles.sliderImage}
                                    />
                                )}
                                <div className={styles.imageInfoBar}>
                                    <span className={styles.imageCategory}>
                                        {allImages[currentImageIndex]?.category || 'Unknown'}
                                    </span>
                                    <span className={styles.imageCounter}>
                                        {currentImageIndex + 1} / {allImages.length}
                                    </span>
                                </div>
                            </div>

                            <button
                                className={styles.navButton}
                                onClick={goToNext}
                                aria-label="Next image"
                            >
                                &gt;
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}