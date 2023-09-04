import React, { useContext, useEffect, useState } from "react";

import ActivitiesContext from "../../context/ActivitiesContext";

import ActivitiesHeader from "./ActivitiesHeader/ActivitiesHeader";
import ActivitiesList from "./ActivitiesList/ActivitiesList";
import ActivitiesWeekdays from "./Weekdays/Weekdays";
import CreateActivityModal from "./CreateActivityModal/CreateActivityModal";
import { AnimatePresence } from "framer-motion";

const Activities = () => {
	const [toggleModal, setToggleModal] = useState(false);

	const { isLoading } = useContext(ActivitiesContext);

	useEffect(() => {
		if (!isLoading.adding) {
			setToggleModal(false);
		}
	}, [isLoading.adding]);

	return (
		<>
			<section className="flex flex-col w-full h-full max-w-3xl sm:items-center sm:flex-row ">
				<div className="sm:w-2/5">
					<ActivitiesHeader />
				</div>

				<div className="overflow-hidden sm:w-3/5">
					<ActivitiesWeekdays />

					<ActivitiesList setToggleModal={setToggleModal} />
				</div>
			</section>

			<AnimatePresence>
				{toggleModal && <CreateActivityModal setToggleModal={setToggleModal} />}
			</AnimatePresence>
		</>
	);
};

export default Activities;
