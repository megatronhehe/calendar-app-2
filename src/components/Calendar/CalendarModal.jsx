import React from "react";

import Calendar from "./Calendar";

const CalendarModal = ({ setToggleCalendar }) => {
	return (
		<section
			onClick={() => setToggleCalendar(false)}
			className="fixed top-0 left-0 flex items-start justify-end w-full h-full backdrop-blur backdrop-filter-sm"
		>
			<Calendar />
		</section>
	);
};

export default CalendarModal;
