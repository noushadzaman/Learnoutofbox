'use client'

import BannerBrainImg from "../../public/Brain.png";
import { motion } from 'framer-motion';
import Image from 'next/image';

const BannerBrain = () => {
    return (
        <motion.div
            className="w-[350px] h-[300px] mx-auto md:w-[600px] md:h-[500px] lg:w-[600px] lg:h-[500px] flex justify-center items-center"
            animate={{
                opacity: 1,
                y: [0, -20, 0],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: "easeInOut"
            }}
        >
            <Image
                className='max-w-[400px]'
                src={BannerBrainImg}
                alt={"banner-img"}
                width={2000}
                height={2000}
            />
            {/* <Image
                className="w-[250px] h-[250px] mx-auto md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px]"
                src={BannerBrainImg}
                alt={"banner-img"}
                width={2000}
                height={2000}
            /> */}
        </motion.div>
    );
};

export default BannerBrain;