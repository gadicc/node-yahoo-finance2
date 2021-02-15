const fs = require("fs");

const file = process.argv[2];

const json = fs.readFileSync(file);
const obj = JSON.parse(json);
const res = obj.response;

const contentType = res.headers["content-type"][0].split(";");
if (contentType[0] === "application/json" && !res.bodyJson) {
  res.bodyJson = JSON.parse(res.body);
  delete res.body;
  fs.writeFileSync(file, JSON.stringify(obj, null, 2));
}
