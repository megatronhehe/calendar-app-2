import React from "react";

import Calendar from "./Calendar";

import { motion } from "framer-motion";

const CalendarModal = ({ setToggleCalendar }) => {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			onClick={() => setToggleCalendar(false)}
			className="fixed top-0 left-0 flex items-start justify-end w-full h-full backdrop-blur backdrop-filter-sm"
		>
			<Calendar />
		</motion.section>
	);
};

export default CalendarModal;
