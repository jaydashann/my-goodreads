import * as React from "react";

const Star = ({ fill = 0, size = 30, ...props }) => {
    return (
        <div
            className="relative cursor-pointer"
            style={{ width: size, height: size }}
            {...props}
        >
            {/* empty star */}
            <svg
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="white"
                stroke="black"
                strokeWidth="1.5"
                strokeLinejoin="round"
            >
                <path d="M12 2.5L14.9 8.4L21.4 9.3L16.7 13.9L17.8 20.4L12 17.3L6.2 20.4L7.3 13.9L2.6 9.3L9.1 8.4Z" />
            </svg>

            {/* filled star */}
            <div
                className="absolute inset-0 overflow-hidden pointer-events-none"
                style={{ width: `${Math.max(0, Math.min(fill, 1)) * 100}%` }}
            >
                <svg
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="#FFD700"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    style={{ maxWidth: "none" }}
                >
                    <path d="M12 2.5L14.9 8.4L21.4 9.3L16.7 13.9L17.8 20.4L12 17.3L6.2 20.4L7.3 13.9L2.6 9.3L9.1 8.4Z" />
                </svg>
            </div>
        </div>
    );
};

const StarRating = ({ 
    value, 
    onChange, 
    totalStars = 5, 
    precision = 0.25, 
    size = 25 }) => {

    const [hoverValue, setHoverValue] = React.useState(null);
    const displayValue = hoverValue ?? value;

    const getFill = (index) => {
        const diff = displayValue - index;
        return Math.max(0, Math.min(diff, 1))
    };

    const handleMouseMove = (e, index) => {
        const { left, width } = e.currentTarget.getBoundingClientRect();
        const percent = (e.clientX - left) / width;

        const raw = index + percent;

        const snapped = Number((Math.round(raw / precision) * precision).toFixed(2));
        const clampped = Math.max(0, Math.min(snapped, totalStars));

        setHoverValue(clampped);
    };

    const handleClick = () => {
        onChange?.(hoverValue ?? value)
    };

    return (
        <div className="flex flex-col items-center ml-2 mt-2 mb-4">
            <div className="flex items-center gap-2 bg-background w-62 h-11 px-4 py-3 rounded shadow-md">
                <div className="flex gap-2">
                    {...Array.from({ length: totalStars }, (_, index) => (
                        <Star
                            key={index}
                            size={size}
                            fill={getFill(index)}
                            onMouseMove={(e) => handleMouseMove(e, index)}
                            onMouseLeave={() => setHoverValue(null)}
                            onClick={handleClick}
                        />
                    ))}
                </div>
                <span className="text-sm text-primary">
                    {displayValue.toFixed(2)} / {totalStars}
                </span>
            </div>
        </div>
    )
};

export default StarRating;