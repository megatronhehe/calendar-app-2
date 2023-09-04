import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import DateContextProvider from "./context/DateContextProvider.jsx";

import ActivitiesContextProvider from "./context/ActivitiesContextProvider.jsx";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
	<ActivitiesContextProvider>
		<DateContextProvider>
			<App />
		</DateContextProvider>
	</ActivitiesContextProvider>
);
