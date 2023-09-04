import React, { useContext } from "react";

import ActivitiesContext from "../../context/ActivitiesContext";

import {
	PiFireSimpleLight,
	PiClockLight,
	PiBriefcaseLight,
	PiTrashLight,
	PiNotePencilLight,
	PiCheckLight,
} from "react-icons/pi";

const ActivityItem = ({ activity }) => {
	const { deleteActivity } = useContext(ActivitiesContext);

	const { id, name, timeStart, timeEnd, priority, type } = activity;

	return (
		<li className="flex flex-col gap-1 bg-white rounded-lg">
			<div className="flex items-center justify-between p-2">
				<h3>{name}</h3>

				<div className="flex gap-1">
					<button
						onClick={() => deleteActivity(id)}
						className="flex items-center justify-center text-xl bg-red-300 rounded-lg w-7 h-7"
					>
						<PiTrashLight />
					</button>

					<div className="border-gray-200 border-x"></div>

					<button className="flex items-center justify-center text-xl bg-gray-200 rounded-lg w-7 h-7">
						<PiNotePencilLight />
					</button>

					<button className="flex items-center justify-center text-xl bg-gray-200 rounded-lg w-7 h-7">
						<PiCheckLight />
					</button>
				</div>
			</div>

			<div className="grid grid-cols-3 p-1 bg-gray-100 rounded-lg">
				<span className="flex items-center gap-1 text-xs">
					<PiClockLight className="text-xl" />
					{timeStart} - {timeEnd}
				</span>
				<span className="flex items-center gap-1 text-xs">
					<PiFireSimpleLight className="text-xl" />
					{priority} priority
				</span>
				<span className="flex items-center gap-1 ml-2 text-xs">
					<PiBriefcaseLight className="text-xl" />
					{type}
				</span>
			</div>
		</li>
	);
};

export default ActivityItem;
