import { getDate, isSameDay, isSameMonth, isToday, parseISO } from "date-fns";
import React, { useContext } from "react";

import DateContext from "../../context/DateContext";
import ActivitiesContext from "../../context/ActivitiesContext";

import { PiDiamondFill, PiCircleFill } from "react-icons/pi";

const DateItem = ({ date }) => {
	const { selectedDate, setSelectedDate } = useContext(DateContext);
	const { activities, isActivitiesExist } = useContext(ActivitiesContext);

	const activitiesInThisDate = activities.filter((activity) =>
		isSameDay(parseISO(activity.date), date)
	);

	const activitiesDoneInThisDate = activitiesInThisDate.filter(
		(activity) => activity.isDone
	);

	const isActivitiesExistInThisDate =
		isActivitiesExist && activitiesInThisDate.length > 0;

	const isAllActivitiesDoneInThisDate =
		isActivitiesExistInThisDate &&
		activitiesInThisDate.length === activitiesDoneInThisDate.length;

	const calendarItemStyle =
		!isSameDay(selectedDate, date) && !isToday(date)
			? ""
			: isSameDay(selectedDate, date) && isToday(date)
			? "bg-blue-600 text-white"
			: isToday(date)
			? "bg-gray-700 text-white"
			: isSameDay(selectedDate, date)
			? "bg-blue-300 text-white"
			: "";

	return (
		<li
			key={date}
			onClick={() => setSelectedDate(date)}
			className={`relative text-sm flex items-center justify-center w-10 h-10 rounded-xl
			${calendarItemStyle}
			
			`}
		>
			{getDate(date)}
			{isActivitiesExistInThisDate ? (
				isAllActivitiesDoneInThisDate ? (
					<PiCircleFill className="absolute text-green-400 -bottom-1.5" />
				) : (
					<PiDiamondFill className="absolute text-blue-400 -bottom-1.5" />
				)
			) : (
				""
			)}
		</li>
	);
};

export default DateItem;
