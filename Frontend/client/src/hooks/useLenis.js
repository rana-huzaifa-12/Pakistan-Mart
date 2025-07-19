// src/hooks/useLenis.js
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

export const useLenis = () => {
    useEffect(() => {
        const lenis = new Lenis({
            smooth: true,
            lerp: 0.1, // Smoothness (lower is smoother)
            direction: 'vertical',
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => lenis.destroy();
    }, []);
};
