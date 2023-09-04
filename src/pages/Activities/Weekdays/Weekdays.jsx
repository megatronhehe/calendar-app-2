import React, { useContext } from "react";

import DateContext from "../../../context/DateContext";
import ActivitiesContext from "../../../context/ActivitiesContext";

import {
	eachDayOfInterval,
	endOfWeek,
	format,
	isToday,
	startOfWeek,
	isSameDay,
	parseISO,
} from "date-fns";

import { PiDiamondFill } from "react-icons/pi";

const Weekdays = () => {
	const { selectedDate, setSelectedDate } = useContext(DateContext);
	const { activities, isActivitiesExist } = useContext(ActivitiesContext);

	const today = new Date();

	const firstDayOfWeek = startOfWeek(today);
	const lastDayOfWeek = endOfWeek(today);
	const thisWeekDaysInterval = eachDayOfInterval({
		start: firstDayOfWeek,
		end: lastDayOfWeek,
	});

	const thisWeekDaysElement = thisWeekDaysInterval.map((date) => {
		const isActivitiesExistInThisDate = isActivitiesExist
			? activities.some((activity) => isSameDay(parseISO(activity.date), date))
			: null;

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
				{isActivitiesExistInThisDate && (
					<div className="absolute text-blue-400 -bottom-2">
						<PiDiamondFill />
					</div>
				)}
			</li>
		);
	});

	return (
		<section className="p-4 text-gray-800">
			<ul className="flex justify-between w-full gap-2">
				{thisWeekDaysElement}
			</ul>
		</section>
	);
};

export default Weekdays;
