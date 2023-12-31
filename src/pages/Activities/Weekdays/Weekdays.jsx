import React, { useContext } from "react";

import WeekdayItem from "./WeekdayItem";

import { eachDayOfInterval, endOfWeek, startOfWeek } from "date-fns";

const Weekdays = () => {
	const today = new Date();

	const firstDayOfWeek = startOfWeek(today);
	const lastDayOfWeek = endOfWeek(today);
	const thisWeekDaysInterval = eachDayOfInterval({
		start: firstDayOfWeek,
		end: lastDayOfWeek,
	});

	const thisWeekDaysElement = thisWeekDaysInterval.map((date) => (
		<WeekdayItem key={date} date={date} />
	));

	return (
		<section className="flex flex-col items-center justify-center text-gray-800 h-1/6 sm:bg-gray-900 sm:rounded-xl">
			<ul className="flex justify-between w-full gap-2 px-4">
				{thisWeekDaysElement}
			</ul>
		</section>
	);
};

export default Weekdays;
