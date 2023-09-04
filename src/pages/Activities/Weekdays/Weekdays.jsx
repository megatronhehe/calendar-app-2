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
		<section className="px-4 py-4 text-gray-800 ">
			<ul className="flex justify-between w-full gap-2">
				{thisWeekDaysElement}
			</ul>
		</section>
	);
};

export default Weekdays;
