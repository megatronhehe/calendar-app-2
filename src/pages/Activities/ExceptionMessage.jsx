import React from "react";

import { motion } from "framer-motion";

import { PiCircleDashedLight } from "react-icons/pi";

const ExceptionMessage = ({ message, fetching = false }) => {
	return (
		<motion.p
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			className="flex items-center justify-center h-full gap-4 text-xl text-center text-gray-500"
		>
			{fetching && <PiCircleDashedLight className="animate-spin" />}
			{message}
		</motion.p>
	);
};

export default ExceptionMessage;
