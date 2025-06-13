'use client';
import { useRef, useState, useEffect } from "react";
import styles from './uploadphoto.module.css';

const categories = [
    { id: 'nature', name: 'Nature' },
    { id: 'urban', name: 'Urban' },
    { id: 'portraits', name: 'Portraits' },
    { id: 'events', name: 'Events' },
];

export default function UploadForm({ onUpload }) {
    const fileInput = useRef();
    const [category, setCategory] = useState(categories[0].id);
    const [fileName, setFileName] = useState('No file chosen');
    const [uploadStatus, setUploadStatus] = useState(null); // 'success', 'error', 'uploading'
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        let timer;
        if (uploadStatus === 'success') {
            timer = setTimeout(() => setUploadStatus(null), 3000);
        }
        return () => clearTimeout(timer);
    }, [uploadStatus]);

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFileName(e.target.files[0].name);
            setUploadStatus(null); // Clear any previous status
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const file = fileInput.current.files[0];
        if (!file) return;

        setIsUploading(true);
        setUploadStatus('uploading');

        try {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("category", category);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (res.ok && data.url) {
                // Reset form
                setFileName('No file chosen');
                setCategory(categories[0].id);
                fileInput.current.value = '';

                // Show success
                setUploadStatus('success');
                if (onUpload) onUpload(data.url);
            } else {
                throw new Error(data.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            setUploadStatus('error');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            {/* Status Messages */}
            {uploadStatus === 'success' && (
                <div className={styles.successMessage}>
                    <span>✓ Upload successful!</span>
                </div>
            )}

            {uploadStatus === 'error' && (
                <div className={styles.errorMessage}>
                    <span>Upload failed. Please try again.</span>
                    <button
                        type="button"
                        className={styles.closeButton}
                        onClick={() => setUploadStatus(null)}
                    >
                        ×
                    </button>
                </div>
            )}

            <div className={styles.uploadContainer}>
                <label className={styles.fileLabel}>
                    <input
                        type="file"
                        ref={fileInput}
                        accept="image/*"
                        onChange={handleFileChange}
                        className={styles.hiddenInput}
                        disabled={isUploading}
                    />
                    <div className={styles.fileButton}>
                        <span>Choose File</span>
                    </div>
                    <span className={styles.fileName}>{fileName}</span>
                </label>
            </div>

            <div className={styles.selectContainer}>
                <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className={styles.categorySelect}
                    disabled={isUploading}
                >
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <button
                type="submit"
                className={styles.uploadButton}
                disabled={isUploading}
            >
                {isUploading ? 'Uploading...' : 'Upload Photo'}
                <span className={styles.buttonGlow}></span>
            </button>
        </form>
    );
}