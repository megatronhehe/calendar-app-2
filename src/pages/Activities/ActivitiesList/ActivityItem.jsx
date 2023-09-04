import React, { useContext } from "react";

import ActivitiesContext from "../../../context/ActivitiesContext";

import {
	PiFireSimpleFill,
	PiBriefcaseLight,
	PiTrashFill,
	PiNotePencilLight,
	PiCheckSquareLight,
	PiCheckSquareFill,
	PiCircleDashedLight,
} from "react-icons/pi";

const ActivityItem = ({ activity }) => {
	const {
		deleteActivity,
		markActivityDone,
		isLoading,
		selectedActivity,
		setSelectedActivity,
	} = useContext(ActivitiesContext);

	const { id, name, priority, type, isDone } = activity;

	const iconColor =
		priority === "high"
			? "text-red-400"
			: priority === "normal"
			? "text-green-400"
			: "text-blue-400";

	return (
		<li className="flex flex-col gap-1 bg-white rounded-lg">
			<div className="flex items-center justify-between p-2">
				<h3>{name}</h3>

				<div className="flex items-center gap-1 text-white">
					<button
						disabled={isLoading.deleting}
						onClick={() => {
							deleteActivity(id);
							setSelectedActivity(id);
						}}
						className="flex items-center justify-center text-xl bg-red-300 rounded-full w-7 h-7 "
					>
						{isLoading.deleting && selectedActivity === id ? (
							<PiCircleDashedLight className="animate-spin" />
						) : (
							<PiTrashFill />
						)}
					</button>

					<div className="h-6 mx-1 border-r border-gray-300"></div>

					<button className="flex items-center justify-center text-xl bg-gray-300 rounded-full w-7 h-7">
						<PiNotePencilLight />
					</button>

					<button
						disabled={isLoading.marking}
						onClick={() => {
							markActivityDone(id);
							setSelectedActivity(id);
						}}
						className={` text-3xl  rounded-md  ${
							isDone ? "text-green-300 " : "text-gray-300"
						}`}
					>
						{isLoading.marking && selectedActivity === id ? (
							<PiCircleDashedLight className="animate-spin" />
						) : isDone ? (
							<PiCheckSquareFill />
						) : (
							<PiCheckSquareLight />
						)}
					</button>
				</div>
			</div>

			<div className="grid grid-cols-3 gap-4 p-1 bg-gray-100 rounded-lg">
				<span className="flex items-center gap-1 text-xs font-semibold">
					<PiFireSimpleFill className={`text-xl ${iconColor}`} />
					{priority} priority
				</span>
				<span className="flex items-center gap-1 ml-2 text-xs">
					<PiBriefcaseLight className="text-xl" />
					{type}
				</span>
				<span
					className={`flex items-center justify-center gap-1 ml-2 text-xs font-semibold tracking-wide text-white rounded-full ${
						isDone ? "bg-green-300" : ""
					}`}
				>
					{isDone ? "done" : ""}
				</span>
			</div>
		</li>
	);
};

export default ActivityItem;
