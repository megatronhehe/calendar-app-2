import React, { useState } from "react";

import { PiCheckLight, PiXLight, PiCircleDashedLight } from "react-icons/pi";

import { motion } from "framer-motion";

const MoreDropdown = ({
	checkAllActivities,
	uncheckAllActivities,
	setSelectedActivity,
	isLoading,
}) => {
	const [selectedOption, setSelectedOption] = useState("");

	return (
		<motion.ul
			initial={{ opacity: 0, y: -10 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -10 }}
			className="absolute flex flex-col gap-1 p-1 text-sm text-gray-200 bg-gray-800 rounded-lg w-28 -left-24 -bottom-14"
		>
			<li className="w-full">
				<button
					disabled={isLoading.marking}
					onClick={() => {
						checkAllActivities();
						setSelectedActivity("all");
						setSelectedOption("check");
					}}
					className="flex items-center justify-between w-full px-2 py-1 bg-gray-700 rounded-md"
				>
					{isLoading.marking && selectedOption === "check" ? (
						<PiCircleDashedLight className="flex justify-center w-full text-xl animate-spin" />
					) : (
						<>
							check all
							<PiCheckLight />
						</>
					)}
				</button>
			</li>
			<li className="w-full">
				<button
					disabled={isLoading.marking}
					onClick={() => {
						uncheckAllActivities();
						setSelectedActivity("all");
						setSelectedOption("uncheck");
					}}
					className="flex items-center justify-between w-full px-2 py-1 bg-gray-700 rounded-md"
				>
					{isLoading.marking && selectedOption === "uncheck" ? (
						<PiCircleDashedLight className="flex justify-center w-full text-xl animate-spin" />
					) : (
						<>
							uncheck all
							<PiXLight />
						</>
					)}
				</button>
			</li>
		</motion.ul>
	);
};

export default MoreDropdown;
