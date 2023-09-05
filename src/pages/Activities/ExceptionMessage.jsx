import React from "react";

const ExceptionMessage = ({ message }) => {
	return (
		<p className="flex items-center justify-center h-full text-center text-gray-500 ">
			{message}
		</p>
	);
};

export default ExceptionMessage;
