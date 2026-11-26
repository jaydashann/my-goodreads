import { Button } from "./ui/button";

type CardProps = { image: string | null };

const Card = ({ image }: CardProps) => {
  return (
    <div className="w-fit max-w-full overflow-hidden rounded-xl shadow-md">
      {image ? (
        <img className="block h-auto max-w-full" src={image} />
      ) : (
        <div>NO COVER</div>
      )}
    </div>
  );
};

export default Card;
