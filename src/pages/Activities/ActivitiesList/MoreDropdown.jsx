import React from "react";

import { PiCheckLight, PiXLight } from "react-icons/pi";

import { motion } from "framer-motion";

const MoreDropdown = ({ checkAllActivities, uncheckAllActivities }) => {
	return (
		<motion.ul
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			className="absolute flex flex-col gap-1 p-1 text-sm text-gray-200 bg-gray-800 rounded-lg w-28 -left-24 -bottom-14"
		>
			<li className="w-full">
				<button
					onClick={checkAllActivities}
					className="flex items-center justify-between w-full px-2 py-1 bg-gray-700 rounded-md"
				>
					check all
					<PiCheckLight />
				</button>
			</li>
			<li className="w-full">
				<button
					onClick={uncheckAllActivities}
					className="flex items-center justify-between w-full px-2 py-1 bg-gray-700 rounded-md"
				>
					uncheck all
					<PiXLight />
				</button>
			</li>
		</motion.ul>
	);
};

export default MoreDropdown;
