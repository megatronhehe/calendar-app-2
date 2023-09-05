import React, { useState } from "react";

import MainContainer from "./components/MainContainer";
import Activities from "./pages/Activities/Activities";
import NavbarMobile from "./components/NavbarMobile";
import { AnimatePresence } from "framer-motion";

const App = () => {
	const [toggleCalendar, setToggleCalendar] = useState(false);

	return (
		<>
			<MainContainer>
				<Activities setToggleCalendar={setToggleCalendar} />
			</MainContainer>

			<AnimatePresence></AnimatePresence>
			<NavbarMobile setToggleCalendar={setToggleCalendar} />
		</>
	);
};

export default App;
