import React, { useEffect } from 'react';
import './Disney.css';
import { FaHatCowboy, FaBowlingBall } from 'react-icons/fa';

const DisneyBackground = () => {
    useEffect(() => {
        // Create magical particles
        const particleCount = 40;
        const body = document.body;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');

            // Random properties
            const size = Math.random() * 10 + 5;
            const posX = Math.random() * 100;
            const delay = Math.random() * 15;
            const duration = Math.random() * 10 + 15;

            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${posX}vw`;
            particle.style.animationDelay = `${delay}s`;
            particle.style.animationDuration = `${duration}s`;

            // Random shape
            if (Math.random() > 0.7) {
                particle.style.borderRadius = '0';
                particle.style.transform = `rotate(${Math.random() * 360}deg)`;
            }

            // Random color
            const colors = [
                'rgba(255, 255, 255, 0.7)',
                'rgba(255, 215, 0, 0.6)',
                'rgba(255, 99, 71, 0.6)' // #ff6347
            ];
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

            body.appendChild(particle);
            const prevX = document.body.style.overflowX;
            const prevY = document.body.style.overflowY;
            document.body.style.overflowX = "hidden";
            document.body.style.overflowY = "hidden";
            return () => {
                document.body.style.overflowX = prevX;
                document.body.style.overflowY = prevY;
            };
        }

        // Create twinkling stars
        const starCount = 80;

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.classList.add('star');

            // Random properties
            const size = Math.random() * 3 + 1;
            const posX = Math.random() * 100;
            const posY = Math.random() * 100;
            const delay = Math.random() * 5;
            const duration = Math.random() * 3 + 2;

            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${posX}vw`;
            star.style.top = `${posY}vh`;
            star.style.animationDelay = `${delay}s`;
            star.style.animationDuration = `${duration}s`;

            // Occasionally use the accent color
            if (Math.random() > 0.8) {
                star.style.backgroundColor = '#ff6347';
            }

            body.appendChild(star);
        }

        // Create falling sparkles
        const sparkleCount = 30;
        const sparkleSymbols = ['❆', '✢', '✧', '✦', '✶', '✷', '✸', '✹', '✺', '✻'];

        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.classList.add('sparkle');

            // Random properties
            const symbol = sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)];
            const posX = Math.random() * 100;
            const delay = Math.random() * 8;
            const duration = Math.random() * 5 + 8;
            const size = Math.random() * 20 + 10;

            sparkle.textContent = symbol;
            sparkle.style.left = `${posX}vw`;
            sparkle.style.animationDelay = `${delay}s`;
            sparkle.style.animationDuration = `${duration}s`;
            sparkle.style.fontSize = `${size}px`;

            // Random color
            const colors = [
                '#ffffff',
                '#fffacd',
                '#ffd700',
                '#ff6347' // accent color
            ];
            sparkle.style.color = colors[Math.floor(Math.random() * colors.length)];

            body.appendChild(sparkle);
        }

        // Cleanup function
        return () => {
            const particles = document.querySelectorAll('.particle');
            particles.forEach(p => p.remove());

            const stars = document.querySelectorAll('.star');
            stars.forEach(s => s.remove());

            const sparkles = document.querySelectorAll('.sparkle');
            sparkles.forEach(s => s.remove());
        };
    }, []);

    return (
        <div className="disney-background">
            <div className="castle"></div>

            <div className="disney-character mickey">
                <FaHatCowboy className="icon" />
            </div>
            <div className="disney-character minnie">
                <FaBowlingBall className="icon" />
            </div>
            <div className="disney-character castle-icon">
                {/* <FaCastle className="icon" /> */}
            </div>
        </div>
    );
};

export default DisneyBackground;