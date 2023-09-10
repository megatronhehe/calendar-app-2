import React, { useContext, useState } from "react";

import DateContext from "../../../context/DateContext";
import ActivitiesContext from "../../../context/ActivitiesContext";

import ActivityItem from "./ActivityItem";
import ExceptionMessage from "../ExceptionMessage";
import MoreDropdown from "./MoreDropdown";

import { PiDotsThreeVerticalLight, PiPlusLight } from "react-icons/pi";
import { isSameDay, parseISO } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";

const ActivitiesList = ({ setToggleModal }) => {
	const { selectedDate } = useContext(DateContext);
	const {
		activities,
		isActivitiesExist,
		isLoading,
		activitiesError,
		checkActivity,
		uncheckActivity,
		setSelectedActivity,
	} = useContext(ActivitiesContext);

	const [toggleMoreDropdown, setToggleMoreDropdown] = useState(false);

	const filterActivitiesByDate = isActivitiesExist
		? activities.filter((activity) =>
				isSameDay(selectedDate, parseISO(activity.date))
		  )
		: [];

	const filteredActivitiesElement = filterActivitiesByDate.map((activity) => (
		<ActivityItem key={activity.id} activity={activity} />
	));

	const checkAllActivities = (activities) => {
		return activities.map((activity) => checkActivity(activity.id));
	};

	const uncheckAllActivities = (activities) => {
		return activities.map((activity) => uncheckActivity(activity.id));
	};

	return (
		<>
			<section className="p-2 text-gray-100 sm:bg-gray-900 sm:rounded-xl">
				<div className="flex items-center justify-between ">
					<h2 className="text-lg">Activities</h2>

					<ul className="flex gap-2 text-2xl">
						<li>
							<button
								onClick={() => setToggleModal(true)}
								className="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-md sm:bg-gray-800 hover:bg-gray-600"
							>
								<PiPlusLight />
							</button>
						</li>

						<li className="relative ">
							<button
								onClick={() => setToggleMoreDropdown((prev) => !prev)}
								className={`flex items-center justify-center w-8 h-8 rounded-md hover:bg-gray-600
								${toggleMoreDropdown ? "bg-gray-600" : "bg-gray-900 sm:bg-gray-800"}
								`}
							>
								<PiDotsThreeVerticalLight />
							</button>

							<AnimatePresence>
								{toggleMoreDropdown && (
									<MoreDropdown
										checkAllActivities={() =>
											checkAllActivities(filterActivitiesByDate)
										}
										uncheckAllActivities={() =>
											uncheckAllActivities(filterActivitiesByDate)
										}
										setSelectedActivity={setSelectedActivity}
										isLoading={isLoading}
									/>
								)}
							</AnimatePresence>
						</li>
					</ul>
				</div>
			</section>

			<section className="p-2 h-2/3 sm:bg-gray-900 sm:rounded-xl">
				<ul className="flex flex-col h-full overflow-auto text-gray-800 sm:h-96 ">
					<AnimatePresence mode="wait">
						{isLoading.fetching ? (
							<ExceptionMessage
								message={"Loading ..."}
								fetching={isLoading.fetching}
							/>
						) : activitiesError.length > 0 ? (
							<ExceptionMessage message={activitiesError} />
						) : filteredActivitiesElement.length > 0 ? (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								{filteredActivitiesElement}
							</motion.div>
						) : (
							<ExceptionMessage message={"No activities listed at this date"} />
						)}
					</AnimatePresence>
				</ul>
			</section>
		</>
	);
};

// {
// 	isLoading.fetching ? (
// 		<ExceptionMessage message={"Loading ..."} fetching={isLoading.fetching} />
// 	) : activitiesError.length > 0 ? (
// 		<ExceptionMessage message={activitiesError} />
// 	) : filteredActivitiesElement.length > 0 ? (
// 		<AnimatePresence>{filteredActivitiesElement}</AnimatePresence>
// 	) : (
// 		<ExceptionMessage message={"No activities listed at this date"} />
// 	);
// }

export default ActivitiesList;
