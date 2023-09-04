import React, { useContext } from "react";

import DateContext from "../../context/DateContext";
import { addMonths, eachDayOfInterval, format, subMonths } from "date-fns";

import { PiCaretLeftLight, PiCaretRightLight } from "react-icons/pi";

import { endOfMonth, startOfMonth, startOfWeek, endOfWeek } from "date-fns";
import DateItem from "./dateItem";

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
		<section
			onClick={() => setToggleCalendar(false)}
			className="fixed bottom-0 left-0 flex items-end justify-center w-full h-full bg-opacity-20 backdrop-filter backdrop-blur-sm font-extralight "
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className="flex flex-col w-full max-w-md gap-4 py-4 overflow-hidden bg-white h-3/5 rounded-t-2xl "
			>
				<div className="flex justify-between px-2">
					<div className="flex items-center justify-between w-40 gap-4 ">
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

				<div className="flex justify-center">
					<ul className="grid grid-cols-7 gap-2">{datesElement}</ul>
				</div>
			</div>
		</section>
	);
};

export default Calendar;
