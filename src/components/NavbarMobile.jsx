import React from "react";

const NavbarMobile = ({ setToggleCalendar }) => {
	return (
		<nav className="fixed bottom-0 left-0 w-full flex justify-center">
			<ul className="text-gray-400">
				<li onClick={() => setToggleCalendar((prev) => !prev)}>
					show calendar
				</li>
			</ul>
		</nav>
	);
};

export default NavbarMobile;
