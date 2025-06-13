"use client"
import React from 'react'
import styles from './Landing.module.css'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
function Landing({ images }) {
    return (
        <main className={styles.hero}>
            <motion.div
                className={styles.polaroid}
                initial={{ x: -300, rotate: -15, opacity: 0 }}
                animate={{ x: 0, rotate: -5, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.8 }}
            >
                <div className={styles.polaroidImage}>
                    <Image
                        src="/images/img5.jpg"
                        alt="Polaroid"
                        fill
                        className={styles.polaroidImg}
                    />
                </div>
                <p>Memories</p>
            </motion.div>

            <div className={styles.grid}>
                {images.map((url, index) => (
                    <motion.div
                        key={index}
                        className={styles.gridItem}
                        initial={{ opacity: 0, scale: 1.2 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 1.5,
                            delay: index * 0.1,
                            ease: "easeOut",
                        }}
                    >
                        <Image
                            src={url}
                            alt={`Image ${index}`}
                            fill
                            className={styles.image}
                            sizes="(max-width: 768px) 100vw, 33vw"
                        />
                    </motion.div>
                ))}
            </div>

            <motion.div
                className={styles.textOverlay}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                <h1>Capture Your World</h1>
                <p>Start your visual journey with our gallery</p>
                <motion.button
                    className={styles.btn}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Link href="/photos">Explore Gallery</Link>
                </motion.button>
            </motion.div>
        </main>
    )
}

export default Landing
