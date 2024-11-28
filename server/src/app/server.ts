import { Server } from "http";
import { app } from "./app";
import { config } from "./config";

let server: Server;

const main = async () => {
  server = app.listen(config.PORT, () => {
    console.log(`Server is listening to the port ${config.PORT}`);
  });
};

main();

// handling uncaught exception
process.on("uncaughtException", () => {
  console.log("Uncaught exception has occurred, shutting down the server");
  process.exit(1);
});

// handling unhandled rejection
process.on("unhandledRejection", () => {
  console.log("We are facing unhandled rejection, shutting down the server");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
