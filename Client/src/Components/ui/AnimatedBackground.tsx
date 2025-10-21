// AnimatedBackground.tsx
import React, { useEffect, useState } from "react";

interface AnimatedObject {
    id: number;
    size: number;
    x: number;
    y: number;
    speedX: number;
    speedY: number;
}

const generateObject = (id: number): AnimatedObject => {
    const size = Math.random() * 20 ; // taille entre 10px et 30px
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    const speedX = (Math.random() - 0.5) * 1.5; // vitesse X
    const speedY = (Math.random() - 0.5) * 1.5; // vitesse Y
    return { id, size, x, y, speedX, speedY };
};

const AnimatedBackground: React.FC = () => {
    const [objects, setObjects] = useState<AnimatedObject[]>([]);

    useEffect(() => {
        const objs = Array.from({ length: 20 }, (_, i) => generateObject(i));
        setObjects(objs);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setObjects((prev) =>
                prev.map((obj) => {
                    let newX = obj.x + obj.speedX;
                    let newY = obj.y + obj.speedY;

                    // rebondir aux bords
                    if (newX < -obj.size) newX = window.innerWidth;
                    if (newX > window.innerWidth) newX = -obj.size;
                    if (newY < -obj.size) newY = window.innerHeight;
                    if (newY > window.innerHeight) newY = -obj.size;

                    return { ...obj, x: newX, y: newY };
                })
            );
        }, 16); // ~60fps
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            {objects.map((obj) => (
                <div
                    key={obj.id}
                    className="absolute bg-blue-200 rounded-full"
                    style={{
                        width: obj.size,
                        height: obj.size,
                        transform: `translate(${obj.x}px, ${obj.y}px)`,
                    }}
                ></div>
            ))}
        </div>
    );
};

export default AnimatedBackground;
