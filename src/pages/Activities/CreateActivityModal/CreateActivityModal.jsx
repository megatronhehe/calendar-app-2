import React, { useContext, useState } from "react";
import DateContext from "../../../context/DateContext";
import ActivitiesContext from "../../../context/ActivitiesContext";

import { v4 as uuid } from "uuid";

import { format } from "date-fns";

const CreateActivityModal = ({ setToggleModal }) => {
	const { selectedDate } = useContext(DateContext);
	const { addActivity } = useContext(ActivitiesContext);

	const [newActivityForm, setNewActivityForm] = useState({
		id: uuid(),
		name: "",
		date: format(selectedDate, "yyyy-MM-dd"),
		timeStart: "",
		timeEnd: "",
		priority: "",
		type: "",
	});

	const handleActivityForm = (e) => {
		const { value, name } = e.target;
		setNewActivityForm((prev) => ({ ...prev, [name]: value }));
	};

	const isFormIncomplete =
		newActivityForm.name.length === 0 ||
		newActivityForm.date.length === 0 ||
		newActivityForm.timeStart.length === 0 ||
		newActivityForm.timeEnd.length === 0 ||
		newActivityForm.priority.length === 0 ||
		newActivityForm.type.length === 0;

	return (
		<section
			onClick={() => setToggleModal(false)}
			className="fixed top-0 left-0 z-10 flex items-center justify-center w-full h-full bg-black bg-opacity-40"
		>
			<form
				onClick={(e) => e.stopPropagation()}
				className="flex flex-col w-full max-w-lg gap-4 p-4 text-sm bg-gray-100 rounded-xl"
			>
				<label
					htmlFor="name"
					className="flex items-center gap-4 p-2 bg-white rounded-xl"
				>
					<span className="w-1/5">Activity</span>
					<input
						onChange={handleActivityForm}
						value={newActivityForm.name}
						id="name"
						name="name"
						type="text"
						className="w-full p-2 bg-gray-100 rounded-xl"
						placeholder="e.g; wash the dishes, workout"
					/>
				</label>

				<label
					htmlFor="date"
					className="flex items-center gap-4 p-2 bg-white rounded-xl"
				>
					<span className="w-1/5">Date</span>
					<input
						onChange={handleActivityForm}
						value={newActivityForm.date}
						id="date"
						name="date"
						type="date"
						className="w-full p-2 bg-gray-100 rounded-xl"
					/>
				</label>

				<div className="flex gap-4">
					<label htmlFor="timeStart" className="w-full p-2 bg-white rounded-xl">
						<span>Start</span>
						<input
							onChange={handleActivityForm}
							value={newActivityForm.timeStart}
							id="timeStart"
							name="timeStart"
							type="time"
							className="w-full p-2 bg-gray-100 rounded-xl"
						/>
					</label>

					<label htmlFor="timeEnd" className="w-full p-2 bg-white rounded-xl">
						<span>End</span>
						<input
							onChange={handleActivityForm}
							value={newActivityForm.timeEnd}
							id="timeEnd"
							name="timeEnd"
							type="time"
							className="w-full p-2 bg-gray-100 rounded-xl"
						/>
					</label>
				</div>

				<div className="flex gap-4">
					<label
						htmlFor="priority"
						className="flex items-center gap-2 p-2 bg-white rounded-xl"
					>
						<span>Priority</span>
						<select
							onChange={handleActivityForm}
							value={newActivityForm.priority}
							id="priority"
							name="priority"
							className="p-2 bg-gray-100 rounded-xl"
						>
							<option value="">--</option>
							<option value="high">High</option>
							<option value="normal">Normal</option>
							<option value="low">Low</option>
						</select>
					</label>

					<label
						htmlFor="type"
						className="flex items-center w-full gap-2 p-2 bg-white rounded-xl"
					>
						<span>Type</span>
						<select
							onChange={handleActivityForm}
							value={newActivityForm.type}
							id="type"
							name="type"
							className="w-full p-2 bg-gray-100 rounded-xl"
						>
							<option value="">--</option>
							<option value="work">Work</option>
							<option value="chores">Chores</option>
							<option value="hustle">Hustle</option>
						</select>
					</label>
				</div>
				<button
					disabled={isFormIncomplete}
					onClick={(e) => {
						e.preventDefault();
						addActivity(newActivityForm);
					}}
					className={`p-2 text-white rounded-xl ${
						isFormIncomplete ? "bg-gray-300" : "bg-blue-300"
					}`}
				>
					Submit
				</button>
			</form>
		</section>
	);
};

export default CreateActivityModal;
