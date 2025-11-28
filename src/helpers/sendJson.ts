import { ServerResponse } from "http";

function sendJson(res: ServerResponse, statusCOde: number, data: any) {
  res.writeHead(statusCOde, { "content-type": "application/json" });
  res.end(JSON.stringify(data));
}

export default sendJson;
