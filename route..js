const fs = require("fs");
const querystring = require("querystring");
const path = require("path");

const filePath = path.join(__dirname, "messages.txt");
const requestHandler = (req,res)=>{
if (req.method === "GET" && req.url === "/") {
    let messages = [];

    if (fs.existsSync(filePath)) {
      messages = fs
        .readFileSync(filePath, "utf-8")
        .split("\n")
        .filter(Boolean)
        .reverse();
    }
    res.setHeader("Content-Type", "text/html");
    res.end(`
      <h2>Messages</h2>
      <div>
        ${messages.map((msg) => `<p>${msg}</p>`).join("")}
      </div>
      <hr>
      <form method="POST" action="/">
        <input type="text" name="message" placeholder="Enter message" required />
        <button type="submit">Send</button>
      </form>
    `);
  } else if (req.method === "POST" && req.url === "/") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      const parsed = querystring.parse(body);
      const newMessage = parsed.message.trim();
      if (newMessage) {
        fs.appendFileSync(filePath, newMessage + "\n");
      }
      res.writeHead(302, { Location: "/" });
      res.end();
    });
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
}


module.exports = requestHandler;