// =====================================
// NEXEARN BACKEND SERVER
// =====================================

const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/auth");

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {

    res.json({
        success: true,
        project: "NexEarn",
        version: "1.0.0",
        message: "Backend API is running successfully."
    });

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Server running on Port ${PORT}`);

});