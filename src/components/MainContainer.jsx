import React from "react";

const MainContainer = ({ children }) => {
	return (
		<main className="w-full bg-gray-800 flex h-screen justify-center font-extralight">
			{children}
		</main>
	);
};

export default MainContainer;
