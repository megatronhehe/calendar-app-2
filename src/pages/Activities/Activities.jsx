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
			<section className="flex flex-col w-full h-full max-w-3xl ">
				<ActivitiesHeader />

				<ActivitiesWeekdays />

				<ActivitiesList setToggleModal={setToggleModal} />
			</section>

			<AnimatePresence>
				{toggleModal && <CreateActivityModal setToggleModal={setToggleModal} />}
			</AnimatePresence>
		</>
	);
};

export default Activities;
