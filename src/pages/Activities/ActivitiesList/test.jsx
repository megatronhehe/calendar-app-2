import React, { useContext, useEffect, useState } from "react";
import ActivitiesContext from "../../../context/ActivitiesContext";
import {
	PiFireSimpleFill,
	PiCheckCircleLight,
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
		submitEditActivity,
	} = useContext(ActivitiesContext);

	const { id, name, priority, type, isDone } = activity;

	const [isEnableEdit, setIsEnableEdit] = useState(false);
	const [thisActivity, setThisActivity] = useState({ ...activity });

	const handleChange = (e) => {
		const { value, name } = e.target;
		setThisActivity((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	useEffect(() => {
		if (!isLoading.editing) {
			setIsEnableEdit(false);
		}
	}, [isLoading.editing]);

	const priorityArray = ["high", "normal", "low"];
	const prioritySelectOptions = priorityArray.filter(
		(item) => item !== priority
	);
	const prioritySelectOptionsElement = prioritySelectOptions.map((item) => (
		<option key={item} value={item}>
			{item}
		</option>
	));

	const typeArray = [
		"work",
		"code",
		"chores",
		"hustle",
		"solo project",
		"workout",
		"general",
	];
	const typeSelectOptions = typeArray.filter((item) => item !== type);
	const typeSelectOptionsElement = typeSelectOptions.map((item) => (
		<option key={item} value={item}>
			{item}
		</option>
	));

	const iconColor =
		priority === "high"
			? "text-red-400"
			: priority === "normal"
			? "text-green-400"
			: "text-blue-400";

	return (
		<form onSubmit={(e) => e.preventDefault()}>
			<li className="flex flex-col flex-shrink-0 gap-1 bg-white rounded-lg">
				<div className="flex items-center justify-between p-2">
					<input
						onChange={handleChange}
						disabled={!isEnableEdit}
						type="text"
						name="name"
						value={thisActivity.name}
						className="w-full bg-white"
					/>

					<div className="flex items-center gap-1 text-white">
						<button
							disabled={isLoading.deleting || isEnableEdit}
							onClick={() => {
								deleteActivity(id);
								setSelectedActivity(id);
							}}
							className="flex items-center justify-center text-xl bg-red-300 rounded-full w-7 h-7"
						>
							{isLoading.deleting && selectedActivity === id ? (
								<PiCircleDashedLight className="animate-spin" />
							) : (
								<PiTrashFill />
							)}
						</button>

						<div className="h-6 mx-1 border-r border-gray-300"></div>

						{isEnableEdit ? (
							<button
								onClick={() => submitEditActivity(id, thisActivity)}
								className="flex items-center justify-center text-xl bg-gray-300 rounded-full w-7 h-7"
							>
								<PiCheckCircleLight className="text-2xl" />
							</button>
						) : (
							<button
								onClick={() => setIsEnableEdit((prev) => !prev)}
								className="flex items-center justify-center text-xl bg-gray-300 rounded-full w-7 h-7"
							>
								<PiNotePencilLight />
							</button>
						)}

						<button
							disabled={isLoading.marking}
							onClick={() => {
								markActivityDone(id);
								setSelectedActivity(id);
							}}
							className={`text-3xl rounded-md ${
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

				<div className="flex justify-between p-1 bg-gray-100 rounded-lg">
					<div className="flex items-center gap-2 text-sm font-semibold">
						<PiFireSimpleFill className={`text-xl ${iconColor}`} />
						<select
							name="priority"
							onChange={handleChange}
							disabled={!isEnableEdit}
							className={`${
								isEnableEdit ? "" : "appearance-none"
							} px-2 bg-gray-100`}
						>
							<option value={priority}>{priority}</option>
							{prioritySelectOptionsElement}
						</select>
					</div>

					<div className="flex items-center gap-2 text-sm ">
						<select
							name="type"
							onChange={handleChange}
							disabled={!isEnableEdit}
							className={`${
								isEnableEdit ? "" : "appearance-none"
							} px-2 bg-gray-100`}
						>
							<option value={type}>{type}</option>
							{typeSelectOptionsElement}
						</select>
					</div>
					<span
						className={`flex items-center justify-center gap-1 px-4 text-xs font-semibold tracking-wide text-white rounded-full ${
							isDone ? "bg-green-300" : ""
						}`}
					>
						{isDone ? "done" : ""}
					</span>
				</div>
			</li>
		</form>
	);
};

export default ActivityItem;
