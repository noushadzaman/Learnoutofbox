import Confetti from 'react-confetti'

export const Celebration = () => {

    return (
        <Confetti
            width={window.innerWidth || 300}
            height={window.innerHeight || 200}
            recycle={false}
        />
    )
}