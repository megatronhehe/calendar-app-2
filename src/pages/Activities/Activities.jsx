import React, { useContext, useState } from "react";

import ActivitiesHeader from "./ActivitiesHeader";
import ActivitiesList from "./ActivitiesList";
import ActivitiesWeekdays from "./Weekdays/Weekdays";
import CreateActivityModal from "./CreateActivityModal/CreateActivityModal";

const Activities = () => {
	const [toggleModal, setToggleModal] = useState(false);

	return (
		<>
			<section className="flex flex-col w-full max-w-3xl ">
				<ActivitiesHeader />

				<ActivitiesWeekdays />

				<ActivitiesList setToggleModal={setToggleModal} />
			</section>

			{toggleModal && <CreateActivityModal setToggleModal={setToggleModal} />}
		</>
	);
};

export default Activities;
