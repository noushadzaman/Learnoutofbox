import Image from "next/image";

const StarRating = ({ rating }) => {
    const stars = new Array(rating).fill(0);

    return (
        <>
            {stars.map((star, idx) => <Image
                src={`/assets/star.svg`}
                key={idx}
                height={20}
                width={20}
                alt="Star"
            />)}
        </>
    );
};

export default StarRating;