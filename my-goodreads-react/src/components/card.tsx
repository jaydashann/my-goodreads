type CardProps = { image: string | null };

const Card = ({ image }: CardProps) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
            {image ? ( 
                <img className="w-full" src={image} />
            ) : (
                <div>NO COVER</div>
            )}
        </div>
    );
};

export default Card;