import { useState, useEffect } from 'react';

export const Transition = ({ onComplete }: { onComplete: () => void }) => {
    const [active, setActive] = useState(false);

    useEffect(() => {
        setActive(true);
        const timer = setTimeout(onComplete, 2100); // Время анимации перед переходом
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`transition-overlay ${active ? 'active' : ''}`}>
            <div className="evil-text">МНЕ ПОХУЙ</div>
        </div>
    );
};


export default Transition;
