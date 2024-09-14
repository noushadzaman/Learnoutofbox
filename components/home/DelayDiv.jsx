'use client';

import { motion } from 'framer-motion'

const DelayDiv = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 500 }}
            whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                    duration: 1
                }
            }}
            viewport={{ once: true }}
        >
            {children}
        </motion.div>
    );
};

export default DelayDiv;