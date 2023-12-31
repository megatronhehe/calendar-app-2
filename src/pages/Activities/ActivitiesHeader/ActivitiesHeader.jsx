import { format, getHours, getTime, isSameDay, parseISO } from "date-fns";
import React, { useContext } from "react";

import DateContext from "../../../context/DateContext";
import ActivitiesContext from "../../../context/ActivitiesContext";

import ActivitiesToDateCard from "./ActivitiesToDateCard";
import PriorityActivitiesCard from "./PriorityActivitiesCard";

const ActivitiesHeader = () => {
	const { selectedDate } = useContext(DateContext);
	const { activities, isActivitiesExist, isLoading } =
		useContext(ActivitiesContext);

	const activitiesToDate = isActivitiesExist
		? activities.filter((activity) =>
				isSameDay(parseISO(activity.date, selectedDate), selectedDate)
		  )
		: [];

	const activitiesToDateExist = activitiesToDate.length > 0;
	const activitiesToDateCount = activitiesToDate.length;

	const time = getHours(new Date());
	const getTimeOfDay =
		time >= 5 && time < 12
			? "morning"
			: time >= 12 && time < 17
			? "afternoon"
			: time >= 17 && time < 20
			? "evening"
			: "night";

	return (
		<section className="flex flex-col justify-between h-full bg-white sm:rounded-2xl sm:h-2/5 ">
			<div className="px-4 py-2">
				<h1 className="text-2xl">Good {getTimeOfDay}</h1>

				<span className="text-sm">
					{format(selectedDate, "eeee, d MMMM yyyy")}
				</span>
			</div>

			<ul className="flex gap-2 p-2 overflow-auto">
				<ActivitiesToDateCard
					activitiesToDateExist={activitiesToDateExist}
					activitiesToDate={activitiesToDate}
					activitiesToDateCount={activitiesToDateCount}
					isLoading={isLoading}
				/>
				<PriorityActivitiesCard
					priority="high"
					backgroundColor="bg-gray-700"
					iconColor="text-red-400"
					activitiesToDateExist={activitiesToDateExist}
					activitiesToDate={activitiesToDate}
					isLoading={isLoading}
				/>
				<PriorityActivitiesCard
					priority="normal"
					backgroundColor="bg-gray-600"
					iconColor="text-green-400"
					activitiesToDateExist={activitiesToDateExist}
					activitiesToDate={activitiesToDate}
					isLoading={isLoading}
				/>
				<PriorityActivitiesCard
					priority="low"
					backgroundColor="bg-gray-500"
					iconColor="text-blue-400"
					activitiesToDateExist={activitiesToDateExist}
					activitiesToDate={activitiesToDate}
					isLoading={isLoading}
				/>
			</ul>
		</section>
	);
};

export default ActivitiesHeader;
