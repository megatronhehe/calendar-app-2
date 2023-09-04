import { format } from "date-fns";
import React, { useContext } from "react";

import countPercentage from "../../utils/countPercentage";
import { isSameDay, parseISO } from "date-fns";

import DateContext from "../../context/DateContext";
import ActivitiesContext from "../../context/ActivitiesContext";

const ActivitiesHeader = () => {
	const { selectedDate } = useContext(DateContext);
	const { activities, isActivitiesExist } = useContext(ActivitiesContext);

	const filterActivitiesByDate = isActivitiesExist
		? activities.filter((activity) =>
				isSameDay(selectedDate, parseISO(activity.date))
		  )
		: [];

	const countActivitiesThisDate = filterActivitiesByDate.length;

	const countActivitiesThisDateDone = filterActivitiesByDate.filter(
		(activity) => activity.isDone === true
	).length;

	const completedPercentage =
		countActivitiesThisDate.length > 0
			? countPercentage(countActivitiesThisDateDone, countActivitiesThisDate)
			: 0;

	return (
		<section className="p-4 bg-white rounded-b-2xl">
			<h1 className="text-2xl">Good morning</h1>

			<span className="text-sm">
				{format(selectedDate, "eeee, d MMMM yyyy")}
			</span>

			<ul className="flex gap-2 mt-4 overflow-auto text-sm text-gray-100">
				<li className="flex flex-col items-center justify-around flex-shrink-0 h-24 p-2 bg-gray-800 w-36 rounded-xl">
					<h2>Activities this date</h2>
					<span>{countActivitiesThisDate}</span>
					<h3>{completedPercentage}% completed</h3>
				</li>

				<li className="flex flex-col items-center justify-around flex-shrink-0 h-24 p-2 bg-gray-800 w-36 rounded-xl">
					<h2>Activities this week</h2>
					<span>4</span>
					<h3>75% completed</h3>
				</li>

				<li className="flex flex-col items-center justify-around flex-shrink-0 h-24 p-2 bg-gray-800 w-36 rounded-xl">
					<h2>Activities this month</h2>
					<span>4</span>
					<h3>75% completed</h3>
				</li>
			</ul>
		</section>
	);
};

export default ActivitiesHeader;
