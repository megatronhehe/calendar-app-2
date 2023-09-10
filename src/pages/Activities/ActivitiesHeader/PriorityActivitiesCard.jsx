import React from "react";

import { PiFireSimpleFill, PiCircleDashedLight } from "react-icons/pi";

const PriorityActivitiesCard = ({
	priority,
	backgroundColor,
	iconColor,
	activitiesToDateExist,
	activitiesToDate,
	isLoading,
}) => {
	const highPriorityActivitiesCount = activitiesToDateExist
		? activitiesToDate.filter((activity) => activity.priority === priority)
				.length
		: 0;

	return (
		<li
			className={`flex flex-col items-center justify-between flex-shrink-0 w-32 h-20 sm:h-full text-xs text-gray-100  py-2 rounded-xl ${backgroundColor} `}
		>
			<h2 className="flex items-center gap-1">
				<PiFireSimpleFill className={`text-base ${iconColor}`} /> {priority}{" "}
				priority
			</h2>
			<span className="text-xl">
				{isLoading.fetching ? (
					<PiCircleDashedLight className="animate-spin" />
				) : (
					highPriorityActivitiesCount
				)}
			</span>
			<h3>Activities</h3>
		</li>
	);
};

export default PriorityActivitiesCard;
