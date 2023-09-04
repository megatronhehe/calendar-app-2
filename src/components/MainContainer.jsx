import React from "react";

const MainContainer = ({ children }) => {
	return (
		<main className="flex justify-center w-full h-screen bg-gray-800 font-extralight">
			{children}
		</main>
	);
};

export default MainContainer;
