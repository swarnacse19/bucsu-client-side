# 🗳️ Vote Ballot - An Online Voting Platform

A **Vote  Ballot System** designed to conduct secure, transparent, and role‑based online elections. This project focuses on proper **data modeling**, clean API design, and a user‑friendly interface for voters and administrators.

---

## 📌 Project Overview

The Vote Ballot Management System allows administrators to create elections and ballots, manage candidates, and monitor voting activities, while voters can securely cast their votes within a defined election period.

The system ensures:

* One person, one vote
* Role‑based access control
* Secure and auditable voting process

---

## 🎯 Objectives

* Digitize the traditional voting process
* Prevent duplicate or unauthorized voting
* Provide real‑time election status
* Maintain a well‑structured database using proper data modeling

---

## 👥 User Roles

### 1. Authority

* Create and manage elections
* Create ballots and assign candidates
* Manage voters
* View election results

### 2. Voter

* View ongoing elections
* Cast vote (only once per election)
* View election results (after election ends)

---

## ⚙️ Key Features

* User authentication & authorization
* Election creation with start and end time
* Ballot & candidate management
* Secure vote casting
* Vote count & result generation
* Dashboard
* Protected routes

---

## 🧠 System Design Approach

This project follows a **Data‑Based Modeling Approach**:

1. Requirement analysis
2. Noun identification
3. Final data objects
4. Relationship identification
5. ER Diagram design
6. Database schema implementation

---

## 🗂️ Core Entities

* User
* Authority
* Voter
* Election
* Ballot
* Candidate
* Vote

---

## 🛠️ Technology Stack

### Frontend

* React
* React Router
* Tailwind CSS
* Framer motion

### Backend

* Node.js
* Express.js

### Database

* MongoDB

### Authentication

* Firebase Authentication
* JWT (JSON Web Token)

---

## 🔐 Security Features

* JWT‑based route protection
* Role‑based access control
* Vote duplication prevention
* Secure API endpoints

---

## 🚀 Installation & Setup

```bash
# Clone the repository
git clone <https://github.com/swarnacse19/bucsu-client-side.git>

# Install client dependencies
cd client
npm install

# Run client
npm run dev

```

---

## 🧪 Future Improvements

* Email verification for voters
* Blockchain‑based vote storage
* Two‑factor authentication
* Audit logs for admins

---

## ⚠️ Limitations

* Internet dependency
* Limited scalability in current version
* Requires proper admin verification

---

## 📄 License

This project is developed for educational purposes only.

---

