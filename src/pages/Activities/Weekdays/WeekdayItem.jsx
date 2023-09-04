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

	const activitiesDoneInThisDate = activitiesInThisDate.filter(
		(activity) => activity.isDone === true
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
			? "bg-blue-600 "
			: isToday(date)
			? "bg-gray-700 "
			: isSameDay(selectedDate, date)
			? "bg-blue-300 "
			: "";

	return (
		<li
			onClick={() => setSelectedDate(date)}
			key={date}
			className={`relative w-full flex flex-col items-center gap-2 py-2 rounded-xl text-white 
            ${calendarItemStyle}
            `}
		>
			<h3 className="pb-2 text-xs">{format(date, "eee")}</h3>
			<span className="font-semibold">{format(date, "d")}</span>
			{isActivitiesExistInThisDate ? (
				isAllActivitiesDoneInThisDate ? (
					<PiCircleFill className="absolute text-green-400 -bottom-2" />
				) : (
					<PiDiamondFill className="absolute text-blue-400 -bottom-2" />
				)
			) : null}
		</li>
	);
};

{
	/* <PiDiamondFill className="absolute text-blue-400 -bottom-2" /> */
}

export default WeekdayItem;
