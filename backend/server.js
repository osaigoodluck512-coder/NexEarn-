// ==============================
// NEXEARN BACKEND
// ==============================

const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {

    res.writeHead(200, {
        "Content-Type": "application/json"
    });

    res.end(JSON.stringify({
        success: true,
        project: "NexEarn Backend",
        status: "Online",
        version: "1.0.0"
    }));

});

server.listen(PORT, () => {
    console.log(`NexEarn Backend running on port ${PORT}`);
});