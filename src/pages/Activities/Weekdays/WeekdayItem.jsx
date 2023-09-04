import React, { useContext } from "react";

import DateContext from "../../../context/DateContext";
import ActivitiesContext from "../../../context/ActivitiesContext";

import { format, isToday, isSameDay, parseISO } from "date-fns";

import { PiDiamondFill, PiCircleFill } from "react-icons/pi";

const WeekdayItem = ({ date }) => {
	const { selectedDate, setSelectedDate } = useContext(DateContext);
	const { activities, isActivitiesExist } = useContext(ActivitiesContext);

	const activitiesInThisDate = activities.filter((activity) =>
		isSameDay(parseISO(activity.date), date)
	);

	const activitiesDoneInThisDate = activities.filter(
		(activity) => activity.isDone
	);

	const isActivitiesExistInThisDate =
		isActivitiesExist && activitiesInThisDate.length > 0;

	const isAllActivitiesDoneInThisDate =
		isActivitiesExistInThisDate &&
		activitiesInThisDate.length === activitiesDoneInThisDate.length;

	const calendarItemStyle =
		!isSameDay(selectedDate, date) && !isToday(date)
			? "bg-white"
			: isSameDay(selectedDate, date) && isToday(date)
			? "bg-blue-600 text-white"
			: isToday(date)
			? "bg-gray-700 text-white"
			: isSameDay(selectedDate, date)
			? "bg-blue-300 text-white"
			: "";

	return (
		<li
			onClick={() => setSelectedDate(date)}
			key={date}
			className={`relative w-full flex flex-col items-center gap-2 py-2 rounded-xl 
            ${calendarItemStyle}
            `}
		>
			<h3 className="text-xs">{format(date, "eee")}</h3>
			<span>{format(date, "d")}</span>
			{isActivitiesExistInThisDate ? (
				isAllActivitiesDoneInThisDate ? (
					<PiCircleFill className="absolute text-green-400 -bottom-2" />
				) : (
					<PiDiamondFill className="absolute text-blue-400 -bottom-2" />
				)
			) : (
				""
			)}
		</li>
	);
};

{
	/* <PiDiamondFill className="absolute text-blue-400 -bottom-2" /> */
}

export default WeekdayItem;
