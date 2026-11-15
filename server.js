const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

const volunteersFile = path.join(__dirname, "volunteers.json");
const donationsFile = path.join(__dirname, "donations.json");

function createFile(file) {
    if (!fs.existsSync(file)) {
        fs.writeFileSync(file, JSON.stringify([]));
    }
}

function readData(file) {
    return JSON.parse(fs.readFileSync(file, "utf8"));
}

function saveData(file, data) {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
}

createFile(volunteersFile);
createFile(donationsFile);

const campaigns = {
    education: { name: "Education for Every Child", goal: 50000 },
    families: { name: "Support Needy Families", goal: 40000 },
    environment: { name: "Save Our Environment", goal: 30000 }
};

app.get("/api", (req, res) => {
    res.send("HopeHands Backend is running!");
});

// Volunteer registration
app.post("/api/volunteers", (req, res) => {
    const { name, email, phone, age, skills, availability } = req.body;

    if (!name || !email || !phone || !age || !skills || !availability) {
        return res.status(400).json({ message: "Please fill all fields." });
    }

    const volunteers = readData(volunteersFile);

    volunteers.push({
        id: Date.now(),
        name,
        email,
        phone,
        age,
        skills,
        availability,
        registeredAt: new Date().toISOString()
    });

    saveData(volunteersFile, volunteers);

    res.status(201).json({
        message: "Volunteer registered successfully!"
    });
});

// Submit donation
app.post("/api/donations", (req, res) => {
    const { name, email, campaign, amount } = req.body;

    if (!name || !email || !campaign || !Number.isFinite(Number(amount)) ||
        Number(amount) <= 0 || !campaigns[campaign]) {
        return res.status(400).json({
            message: "Please provide valid donation details."
        });
    }

    const donations = readData(donationsFile);

    donations.push({
        id: Date.now(),
        name,
        email,
        campaign,
        amount: Number(amount),
        donatedAt: new Date().toISOString()
    });

    saveData(donationsFile, donations);

    res.status(201).json({
        message: "Donation recorded successfully!"
    });
});

// Get fundraising progress
app.get("/api/campaigns", (req, res) => {
    const donations = readData(donationsFile);

    const result = Object.keys(campaigns).map(id => {
        const total = donations
            .filter(donation => donation.campaign === id)
            .reduce((sum, donation) => sum + donation.amount, 0);

        return {
            id,
            name: campaigns[id].name,
            goal: campaigns[id].goal,
            raised: total,
            percentage: Math.min(
                100,
                Math.round((total / campaigns[id].goal) * 100)
            )
        };
    });

    res.json(result);
});

app.listen(PORT, () => {
    console.log(`HopeHands server running at http://localhost:${PORT}`);
});
