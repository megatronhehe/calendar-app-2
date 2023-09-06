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
	PiXLight,
	PiTagFill,
} from "react-icons/pi";

import { AnimatePresence, motion } from "framer-motion";

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
	const [toggleConfirmDelete, setToggleConfirmDelete] = useState(false);
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
		if (!isLoading.deleting) {
			setToggleConfirmDelete(false);
		}
	}, [isLoading.editing, isLoading.deleting]);

	useEffect(() => {
		if (!isEnableEdit) {
			setThisActivity((prev) => activity);
		}
	}, [isEnableEdit]);

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

	return (
		<li className="flex w-full gap-2 p-1 text-gray-100 bg-gray-600 rounded-xl">
			<div className="flex w-4/5 ">
				<form
					onSubmit={(e) => e.preventDefault()}
					className="flex flex-col justify-between w-full"
				>
					<button onClick={() => submitEditActivity(thisActivity)}></button>

					<div className="flex items-center mb-1">
						<button
							disabled={isLoading.marking && selectedActivity === id}
							onClick={() => {
								markActivityDone(id);
								setSelectedActivity(id);
							}}
							className="text-2xl"
						>
							{isLoading.marking && selectedActivity === id ? (
								<PiCircleDashedLight className="animate-spin" />
							) : isDone ? (
								<PiCheckSquareFill className="text-green-400" />
							) : (
								<PiCheckSquareLight />
							)}
						</button>
						<input
							type="text"
							name="name"
							disabled={!isEnableEdit}
							onChange={handleChange}
							value={thisActivity.name}
							className="w-full px-2 bg-gray-600"
						/>
					</div>

					<div className="grid grid-cols-3 p-1 overflow-hidden bg-gray-700 rounded-lg">
						<div className="flex items-center gap-1">
							<label htmlFor="priority">
								<PiFireSimpleFill />
							</label>
							<select
								id="priority"
								name="priority"
								disabled={!isEnableEdit}
								onChange={handleChange}
								className="px-2 text-sm bg-gray-700 appearance-none"
								value={thisActivity.priority}
							>
								<option value={thisActivity.priority}>
									{thisActivity.priority}
								</option>
								{prioritySelectOptionsElement}
							</select>
						</div>

						<div className="flex items-center gap-1">
							<label htmlFor="type">
								<PiTagFill />
							</label>
							<select
								id="type"
								name="type"
								disabled={!isEnableEdit}
								onChange={handleChange}
								className="px-2 text-sm bg-gray-700 appearance-none"
								value={thisActivity.type}
							>
								<option value={thisActivity.type}>{thisActivity.type}</option>
								{typeSelectOptionsElement}
							</select>
						</div>

						<div className="flex justify-end">
							<AnimatePresence>
								{isDone && (
									<motion.span
										initial={{ opacity: 0, y: -30 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -30 }}
										className="px-2 text-sm text-white bg-green-400 rounded-full"
									>
										done!
									</motion.span>
								)}
							</AnimatePresence>
						</div>
					</div>
				</form>
			</div>

			<div className="flex flex-col items-end w-1/5 gap-2 border-l border-gray-500">
				<div className="flex gap-1">
					<AnimatePresence>
						{isEnableEdit && (
							<motion.button
								initial={{ opacity: 0, x: 30 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 30 }}
								disabled={isLoading.editing}
								onClick={() => submitEditActivity(thisActivity)}
								className="flex items-center justify-center text-2xl text-white bg-green-400 rounded-md w-7 h-7"
							>
								{isLoading.editing ? (
									<PiCircleDashedLight className="animate-spin" />
								) : (
									<PiCheckCircleLight />
								)}
							</motion.button>
						)}
					</AnimatePresence>

					<button
						onClick={() => setIsEnableEdit((prev) => !prev)}
						className="flex items-center justify-center text-2xl text-gray-400 bg-gray-100 rounded-md w-7 h-7"
					>
						{isEnableEdit ? <PiXLight /> : <PiNotePencilLight />}
					</button>
				</div>

				<div className="flex gap-1">
					<AnimatePresence>
						{toggleConfirmDelete && (
							<motion.button
								initial={{ opacity: 0, x: 30 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 30 }}
								disabled={isLoading.deleting}
								onClick={() => deleteActivity(id)}
								className="flex items-center justify-center text-xl text-white bg-red-300 rounded-md w-7 h-7"
							>
								{isLoading.deleting ? (
									<PiCircleDashedLight className="animate-spin" />
								) : (
									<PiTrashFill />
								)}
							</motion.button>
						)}
					</AnimatePresence>

					<button
						onClick={() => setToggleConfirmDelete((prev) => !prev)}
						className={`flex items-center justify-center text-xl   rounded-md w-7 h-7 ${
							toggleConfirmDelete
								? "bg-gray-100 text-gray-400"
								: "bg-red-300 text-white"
						}`}
					>
						{toggleConfirmDelete ? <PiXLight /> : <PiTrashFill />}
					</button>
				</div>
			</div>
		</li>
	);
};

export default ActivityItem;
