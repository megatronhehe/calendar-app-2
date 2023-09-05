import React, { useContext, useEffect, useState } from "react";

import ActivitiesContext from "../../context/ActivitiesContext";

import ActivitiesHeader from "./ActivitiesHeader/ActivitiesHeader";
import ActivitiesList from "./ActivitiesList/ActivitiesList";
import ActivitiesWeekdays from "./Weekdays/Weekdays";
import CreateActivityModal from "./CreateActivityModal/CreateActivityModal";
import Calendar from "../../components/Calendar/Calendar";
import CalendarModal from "../../components/Calendar/CalendarModal";

import { AnimatePresence } from "framer-motion";

const Activities = () => {
	const { isLoading } = useContext(ActivitiesContext);

	const [toggleModal, setToggleModal] = useState(false);
	const [isMobileMode, setIsMobileMode] = useState(false);
	const [toggleCalendar, setToggleCalendar] = useState(false);

	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (windowWidth >= 640) {
			setIsMobileMode(true);
		} else {
			setIsMobileMode(false);
			setToggleCalendar(false);
		}
	}, [windowWidth]);

	useEffect(() => {
		if (!isLoading.adding) {
			setToggleModal(false);
		}
	}, [isLoading.adding]);

	return (
		<>
			<section className="flex flex-col w-full h-full max-w-3xl gap-4 sm:pt-40 sm:justify-center sm:flex-row">
				<div className=" h-1/4 sm:w-2/5 sm:h-2/3 md:h-2/3 sm:flex sm:flex-col sm:gap-4">
					<ActivitiesHeader />

					{isMobileMode && <Calendar />}
				</div>

				<div className=" h-3/4 sm:w-3/5 sm:flex sm:flex-col sm:gap-4">
					<ActivitiesWeekdays />

					<ActivitiesList setToggleModal={setToggleModal} />
				</div>
			</section>

			<AnimatePresence>
				{toggleModal && <CreateActivityModal setToggleModal={setToggleModal} />}
			</AnimatePresence>

			{!isMobileMode && (
				<button
					onClick={() => setToggleCalendar(true)}
					className="absolute px-4 py-2 text-sm text-gray-400 bg-gray-100 rounded-full top-2 right-2"
				>
					show calendar
				</button>
			)}

			{toggleCalendar && (
				<CalendarModal setToggleCalendar={setToggleCalendar} />
			)}
		</>
	);
};

export default Activities;
