import connectDB from "./db/index.js";
import dotenv from "dotenv";

dotenv.config({
    path: "./env",
});

const server = process.env.PORT || 8000;

connectDB()
    .then(() => {
        app.listen(server, () => {
            console.log(`Server is running: http://localhost:${server}`);
        });
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error;
        });
    })
    .catch((error) => {
        console.log("Database Conenction Failed!!!", error);
    });
