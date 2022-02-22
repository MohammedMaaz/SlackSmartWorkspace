import bolt from "./bolt";

const errorHandler = (error) => console.log("Error:", error);
bolt.error(errorHandler);
