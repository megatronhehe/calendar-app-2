import React, { useState } from "react";

import DateContext from "./DateContext";

const DateContextProvider = ({ children }) => {
	const [today, setToday] = useState(new Date());
	const [selectedDate, setSelectedDate] = useState(today);

	return (
		<DateContext.Provider
			value={{ today, setToday, selectedDate, setSelectedDate }}
		>
			{children}
		</DateContext.Provider>
	);
};

export default DateContextProvider;
