import React, { useEffect, useState } from "react";

import ActivitiesContext from "./ActivitiesContext";

const ActivitiesContextProvider = ({ children }) => {
	const [activities, setActivities] = useState([]);
	const [isLoading, setIsLoading] = useState({
		fetching: false,
		adding: false,
		deleting: false,
		marking: false,
		editing: false,
	});
	const [activitiesError, setActivitiesError] = useState("");

	useEffect(() => {
		setIsLoading((prev) => ({ ...prev, fetching: true }));
		setActivitiesError("");
		fetch("http://localhost:8000/activities")
			.then((res) => {
				if (!res.ok) {
					setActivitiesError(`${res.status} ${res.statusText}`);
				}
				return res.json();
			})
			.then((data) => setActivities(data))
			.catch((err) => setActivitiesError(err))
			.finally(() => {
				setIsLoading((prev) => ({ ...prev, fetching: false }));
			});
	}, []);

	const addActivity = (newActivity) => {
		setIsLoading((prev) => ({ ...prev, adding: true }));
		setActivitiesError("");
		fetch("http://localhost:8000/activities", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newActivity),
		})
			.then((res) => {
				if (!res.ok) {
					setActivitiesError(`${res.status} ${res.statusText}`);
				} else {
					setActivities((prev) => [...prev, newActivity]);
				}
			})
			.catch((err) => setActivitiesError(err))
			.finally(() => {
				setIsLoading((prev) => ({ ...prev, adding: false }));
			});
	};

	const deleteActivity = (id) => {
		setIsLoading((prev) => ({ ...prev, deleting: true }));
		fetch(`http://localhost:8000/activities/${id}`, {
			method: "DELETE",
		})
			.then((res) => {
				if (!res.ok) {
					console.log(`${res.status} ${res.statusText}`);
				} else {
					setActivities((prev) =>
						prev.filter((activity) => activity.id !== id)
					);
				}
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setIsLoading((prev) => ({ ...prev, deleting: false }));
			});
	};

	const markActivityDone = (id) => {
		const thisActivity = activities.find((activity) => activity.id === id);

		setIsLoading((prev) => ({ ...prev, marking: true }));

		fetch(`http://localhost:8000/activities/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ ...thisActivity, isDone: !thisActivity.isDone }),
		})
			.then((res) => {
				if (!res.ok) {
					console.log(`${res.status} ${res.statusText}`);
				} else {
					setActivities((prev) =>
						prev.map((activity) =>
							activity.id === id
								? { ...activity, isDone: !activity.isDone }
								: activity
						)
					);
				}
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setIsLoading((prev) => ({ ...prev, marking: false }));
			});
	};

	const isActivitiesExist = activities.length > 0;

	return (
		<ActivitiesContext.Provider
			value={{
				activities,
				isActivitiesExist,
				isLoading,
				activitiesError,
				addActivity,
				deleteActivity,
				markActivityDone,
			}}
		>
			{children}
		</ActivitiesContext.Provider>
	);
};

export default ActivitiesContextProvider;
