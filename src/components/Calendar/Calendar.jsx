import React, { useContext } from "react";

import DateItem from "./DateItem";

import DateContext from "../../context/DateContext";

import { addMonths, eachDayOfInterval, format, subMonths } from "date-fns";

import { PiCaretLeftLight, PiCaretRightLight } from "react-icons/pi";

import { motion } from "framer-motion";

import { endOfMonth, startOfMonth, startOfWeek, endOfWeek } from "date-fns";

const Calendar = () => {
	const { today, setToday, selectedDate } = useContext(DateContext);

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
		<motion.div
			initial={{ y: "-100vh" }}
			animate={{ y: 0 }}
			exit={{ y: "-100vh" }}
			transition={{ type: "tween" }}
			onClick={(e) => e.stopPropagation()}
			className="flex flex-col w-full gap-4 pb-20 overflow-hidden bg-white rounded-b-2xl sm:rounded-2xl sm:h-full sm:pb-96 sm:bg-gray-900 sm:text-white"
		>
			<div className="flex justify-between px-2 py-4 ">
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

			<div className="flex justify-center mt-3 sm:mt-0 ">
				<ul className="grid grid-cols-7 gap-3 sm:gap-1">{datesElement}</ul>
			</div>
		</motion.div>
	);
};

export default Calendar;
