import { getDate, isSameDay, isSameMonth, isToday, parseISO } from "date-fns";
import React, { useContext } from "react";

import DateContext from "../../context/DateContext";
import ActivitiesContext from "../../context/ActivitiesContext";

import { PiDiamondFill } from "react-icons/pi";

const DateItem = ({ date }) => {
	const { today, selectedDate, setSelectedDate } = useContext(DateContext);

	const { activities } = useContext(ActivitiesContext);

	const isActivitiesExistInThisDate = activities.some((activity) =>
		isSameDay(parseISO(activity.date), date)
	);

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
			{isActivitiesExistInThisDate && (
				<PiDiamondFill className="absolute -bottom-1.5 text-blue-400 " />
			)}
		</li>
	);
};

export default DateItem;
