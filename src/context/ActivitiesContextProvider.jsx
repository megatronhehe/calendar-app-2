import React, { useEffect, useState } from "react";

import ActivitiesContext from "./ActivitiesContext";

const ActivitiesContextProvider = ({ children }) => {
	const [activities, setActivities] = useState([]);
	const [isActivitiesLoading, setIsActivitiesLoading] = useState(false);
	const [activitiesError, setActivitiesError] = useState("");

	useEffect(() => {
		setIsActivitiesLoading(true);
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
				setIsActivitiesLoading(false);
			});
	}, []);

	const addActivity = (newActivity) => {
		setIsActivitiesLoading(true);
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
				setIsActivitiesLoading(false);
			});
	};

	const deleteActivity = (id) => {
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
			.catch((err) => console.log(err));
	};

	const isActivitiesExist = activities.length > 0;

	return (
		<ActivitiesContext.Provider
			value={{
				activities,
				isActivitiesExist,
				isActivitiesLoading,
				activitiesError,
				addActivity,
				deleteActivity,
			}}
		>
			{children}
		</ActivitiesContext.Provider>
	);
};

export default ActivitiesContextProvider;
