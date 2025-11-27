import http, { IncomingMessage, Server, ServerResponse } from "http";
import path from "path";
import config from "./config";
import { json } from "stream/consumers";

const server: Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    console.log("Server is running....");

    //route route
    if (req.url === "/" && req.method === "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Hello from node js with typescript.......",
          path: req.url,
        })
      );
    }
    //health route
    if (req.url === "/api" && req.method === "GET") {
      res.writeHead(200, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Health status ok",
          path: req.url,
        })
      );
    }

    if (req.url === "/api/users" && req.method === "POST") {
      // const user = {
      //   id: 1,
      //   name: "alice",
      // };
      // res.writeHead(200, { "content-type": "application/json" });
      // res.end(JSON.stringify(user));

      let body = "";

      //listen for data chunk
      req.on("data", (chunk) => {
        body += chunk.toString();
      });
      req.on("end", () => {
        try {
          const parseBody = JSON.parse(body);
          console.log(parseBody);
          console.log("Catching current changes")
          res.end(JSON.stringify(parseBody));
        } catch (error: any) {
          console.log(error?.message);
        }
      });
    }
  }
);

server.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
