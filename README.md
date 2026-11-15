# ❤️ HopeHands – NGO Donation & Volunteer Platform

## 📌 About the Project

HopeHands is a web-based NGO platform designed to support charitable campaigns and connect people who want to make a difference.

The platform allows users to explore fundraising campaigns, submit demo donations, and register as volunteers.

## 🎯 Project Objectives

- Provide information about charitable campaigns.
- Allow users to submit donations.
- Store donation information.
- Enable volunteer registration.
- Display fundraising progress dynamically.

## 🛠️ Technologies Used

### Frontend
- HTML5
- CSS3
- JavaScript

### Backend
- Node.js
- Express.js

### Data Storage
- JSON file storage

## ✨ Features

1. **Home Page:** Introduction to HopeHands.
2. **Campaigns Page:** Displays available fundraising campaigns.
3. **Donation Page:** Allows users to submit demo donations.
4. **Volunteer Page:** Allows users to register as volunteers.
5. **Donation Storage:** Saves donation details in donations.json.
6. **Volunteer Storage:** Saves volunteer details in volunteers.json.
7. **Dynamic Progress:** Automatically refreshes fundraising progress.

## 📂 Project Structure

```text
zelvora-03/
│
├── index.html
├── campaigns.html
├── donate.html
├── volunteer.html
├── style.css
├── script.js
├── donation.js
├── server.js
├── package.json
├── donations.json
└── volunteers.json
```

## ⚙️ How to Run the Project

1. Install Node.js.
2. Open the project folder in VS Code.
3. Open the terminal.
4. Install dependencies:

```bash
npm install express cors
```

5. Start the backend server:

```bash
node server.js
```

6. Open the website:

```text
http://localhost:3000
```

## 📊 Campaign Progress

The platform calculates fundraising progress using stored donation records.

Campaign progress is automatically refreshed every three seconds.

## 🔮 Future Enhancements

- MongoDB database integration.
- Secure user authentication.
- Online payment gateway integration.
- Admin dashboard.
- Volunteer management system.

## 👩‍💻 Project Information

**Project Name:** HopeHands – NGO Donation & Volunteer Platform

**Program:** Zelvora Week 3 – Web Development

**Project Type:** Full-Stack Web Development