import React, { useContext } from "react";

import DateItem from "./dateItem";

import DateContext from "../../context/DateContext";
import { addMonths, eachDayOfInterval, format, subMonths } from "date-fns";

import { PiCaretLeftLight, PiCaretRightLight } from "react-icons/pi";

import { endOfMonth, startOfMonth, startOfWeek, endOfWeek } from "date-fns";

const Calendar = ({ setToggleCalendar }) => {
	const { today, setToday } = useContext(DateContext);

	const firstDateInMonth = startOfWeek(startOfMonth(today));
	const lastDateInMonth = endOfWeek(endOfMonth(today));

	const nextMonth = () => {
		setToday((prev) => addMonths(prev, 1));
	};

	const prevMonth = () => {
		setToday((prev) => subMonths(prev, 1));
	};

	const daysOfMonthArray = eachDayOfInterval({
		start: firstDateInMonth,
		end: lastDateInMonth,
	});

	const datesElement = daysOfMonthArray.map((date) => (
		<DateItem key={date} date={date} />
	));

	return (
		<div
			onClick={(e) => e.stopPropagation()}
			className="flex flex-col w-full gap-4 overflow-hidden bg-white h-1/2 rounded-b-2xl sm:rounded-2xl sm:h-4/5"
		>
			<div className="flex justify-between px-2 py-4">
				<div className="flex items-center justify-between w-40 gap-2">
					<button onClick={prevMonth}>
						<PiCaretLeftLight />
					</button>
					<span>{format(today, "MMMM")}</span>
					<button onClick={nextMonth}>
						<PiCaretRightLight />
					</button>
				</div>

				<span className="mr-4 text-xl">{format(today, "yyyy")}</span>
			</div>

			<div className="flex justify-center mt-3 ">
				<ul className="grid grid-cols-7 gap-3 sm:gap-1">{datesElement}</ul>
			</div>
		</div>
	);
};

export default Calendar;
