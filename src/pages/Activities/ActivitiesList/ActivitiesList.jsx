import React, { useContext } from "react";

import DateContext from "../../../context/DateContext";
import ActivitiesContext from "../../../context/ActivitiesContext";

import ActivityItem from "./ActivityItem";
import ExceptionMessage from "../ExceptionMessage";

import {
	PiSlidersLight,
	PiDotsThreeVerticalLight,
	PiPlusLight,
} from "react-icons/pi";
import { isSameDay, parseISO } from "date-fns";

const ActivitiesList = ({ setToggleModal }) => {
	const { selectedDate } = useContext(DateContext);
	const { activities, isActivitiesExist, isLoading, activitiesError } =
		useContext(ActivitiesContext);

	const filterActivitiesByDate = isActivitiesExist
		? activities.filter((activity) =>
				isSameDay(selectedDate, parseISO(activity.date))
		  )
		: [];

	const filteredActivitiesElement = filterActivitiesByDate.map((activity) => (
		<ActivityItem key={activity.id} activity={activity} />
	));

	return (
		<>
			<section className="p-2 text-gray-100">
				<div className="flex items-center justify-between ">
					<h2 className="text-lg">Activities</h2>

					<ul className="flex gap-2 text-2xl">
						<li>
							<button className="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-md">
								<PiSlidersLight />
							</button>
						</li>

						<li>
							<button
								onClick={() => setToggleModal(true)}
								className="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-md"
							>
								<PiPlusLight />
							</button>
						</li>

						<li>
							<button className="flex items-center justify-center w-8 h-8 bg-gray-900 rounded-md">
								<PiDotsThreeVerticalLight />
							</button>
						</li>
					</ul>
				</div>
			</section>

			<section className="p-2 overflow-auto h-2/3">
				<ul className="flex flex-col h-full gap-2 overflow-auto text-gray-800 sm:h-96 ">
					{isLoading.fetching ? (
						<ExceptionMessage message={"Loading ..."} />
					) : activitiesError.length > 0 ? (
						<ExceptionMessage message={activitiesError} />
					) : filteredActivitiesElement.length > 0 ? (
						filteredActivitiesElement
					) : (
						<ExceptionMessage message={"No activities listed at this date"} />
					)}
				</ul>
			</section>
		</>
	);
};
export default ActivitiesList;
