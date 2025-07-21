import { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";

function Loader() {
    const [size, setSize] = useState(70); // Default size

    useEffect(() => {
        const updateSize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setSize(40); // Mobile (sm)
            } else if (width < 1024) {
                setSize(60); // Tablet (md)
            } else {
                setSize(80); // Desktop (lg+)
            }
        };

        updateSize(); // Initial check
        window.addEventListener("resize", updateSize); // On resize

        return () => window.removeEventListener("resize", updateSize); // Cleanup
    }, []);

    return (
        <div className="flex justify-center items-center h-screen bg-[#03071e]">
            <HashLoader color="#f97316" size={size} />
        </div>
    );
}

export default Loader;
