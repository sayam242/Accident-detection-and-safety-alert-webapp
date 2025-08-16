<p align="center">
  <img width="193" height="41" alt="Group 61" src="https://github.com/user-attachments/assets/7e52cc1c-afa1-4af2-8e11-eb9a9e9ad433" />
</p>

<p align="center">
  <a href="./client/src"><b>Frontend Source Code</b></a> |
  <a href="./backend"><b>Backend Source Code</b></a>
</p>

<h2 align="center"><b>Accident Detection & Response System</b></h2>
<p align="center"><i>When Accidents Happen -- We're Already Responding</i></p>


<!-- TOC ignore:true -->
### 📑Table of Content
<details>
<summary>Expand/Collapse</summary>
<!-- TOC -->

- [Introduction](#-introduction)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [System Architecture](#-system-architecture)
- [Installation & Setup](#-installation--setup)
- [Folder Structure](#-folder-structure)
- [Screenshots & UI Walkthrough](#-screenshots--ui-walkthrough)
- [Team](#-team)
- [Future Enhancements](#-future-enhancements)

</details>

---

## 🧐 Introduction
The **Accident Detection and Response System** is an IoT-powered web platform designed to **detect accidents automatically using sensors** and allow **normal users to report accidents easily**. Hospitals receive real-time alerts and can quickly access **location, severity, and navigation** details to save lives.

---

## ✅ Key Features

<h2> Landing Page </h2>
The landing page serves as the entry point for both normal users and hospital users. It is designed with a clean, responsive interface and provides clear navigation options.

#### 🖥 Key Elements:
- **Visual Graphics**:
  - **Two crashed cars illustration** to represent an accident scenario.
  - **Icons showing Connectivity, Location, Cloud Database, and Sensors**, indicating how the system integrates IoT and cloud for real-time detection and reporting.
- **Dynamic Background Image** – Creates an engaging first impression.

<br>
<p align="center">
  <img width="896" height="504" alt="Landing Page" src="https://github.com/user-attachments/assets/a32cf04c-43d6-4976-a01c-28a736e88745" />
</p>
<br><br>
<p align="center">
  <img width="896" height="481" alt="Landing Page Elements" src="https://github.com/user-attachments/assets/b18d2c21-37a1-4d6e-9b6f-267ba9222db1" />
</p>
<br><br>

#### 🔘 Buttons & Their Purpose:
- **Report an Accident**  
  - This is for **normal users** to report accidents manually.
  - Users can upload an **image of the accident scene** and provide details.
  - OTP-based **mobile number verification** ensures authenticity.
- **Login / Signup**  
  - Exclusively for **hospital authorities**.
  - Hospitals can **sign up** to register and **log in** to access their dashboard.
  - Normal users do **not** need an account to report an accident.

<h2> Login & Signup </h2>
This feature is designed exclusively for hospitals. It allows healthcare facilities to securely access the platform and manage emergency responses for nearby accidents.

#### 🏥 Signup Process:
- Hospitals can **register themselves on the platform** by providing:
  - **Hospital Name**
  - **Email Address**
  - **Password**
  - **Location** (with three options):
    - Select location on the interactive **map**
    - Use **current location**
    - Manually **enter address**
- After filling in these details, hospitals **submit the registration form**.
- The account is created successfully, and the user is **redirected to the Login page**.

<br>
<p align="center">
  <img width="896" height="482" alt="Signup Page" src="https://github.com/user-attachments/assets/31fe881b-f130-4ccd-a985-a7c7d0b10d8f" />
</p>
<br><br>
<p align="center">
  <img width="896" height="478" alt="Dashboard Access" src="https://github.com/user-attachments/assets/0f9ac574-71f6-4b9e-b077-35d47d0d13aa" />
</p>
<br><br>

#### 🔐 Login Process:
- Hospitals enter their **registered email and password**.
- Upon successful authentication, they gain access to the **Hospital Dashboard**, where they can:
  - View **Reported Accidents** submitted by users.
  - View **Detected Accidents** from IoT-enabled vehicles.
  - Take **emergency response actions**.

<br>
<p align="center">
  <img width="896" height="481" alt="Login Page" src="https://github.com/user-attachments/assets/2e349a38-b913-4911-9982-1f84f0c2a4e2" />
</p>
<br><br>

<h2> Hospital Dashboard </h2>
This is the control center for hospitals to monitor and respond to accidents. It provides **two main sections**:

#### 🗂 Sections:
- **Reported Accidents** → Accidents submitted by normal users through the landing page.  
  Each reported case displays:
  - **Location**
  - **Accident Image**
  - **Time of Report**
  - **Severity Level**
  - **Distance from Hospital**
  - **Current Status**
  - A **More Details** button to view the complete information and route.

<br>
<p align="center">
  <img width="896" height="480" alt="Reported Accidents" src="https://github.com/user-attachments/assets/df2f9ec4-bec4-4a8b-96df-5a9e995a48ce" />
</p>
<br><br>

- **Detected Accidents** → Accidents detected automatically by IoT-enabled vehicles via sensor fusion.  
  Similar details are shown here, allowing hospitals to act quickly on real-time accident data.

<br>
<p align="center">
  <img width="896" height="480" alt="Detected Accidents" src="https://github.com/user-attachments/assets/f85d4011-b1a0-4c4f-8727-ce3e0b1890ef" />
</p>
<br><br>

- **Detailed View**  
  When hospitals click on **More Details**, a **pop-up window** opens with:
  - **Interactive Map (Powered by Leaflet)** showing the accident location.
  - **Shortest Route from Hospital to Accident Spot**, helping to guide emergency vehicles.
  - Complete accident details: **location, time, severity, status, and image**.
  - **Three Action Buttons**:
    - **Allot Ambulance** → Assign an ambulance for quick response.
    - **Generate Report (PDF)** → Create a digital report for documentation.
    - **Change Status** → Update the accident's progress status.

<br>
<p align="center">
  <img width="896" height="478" alt="Detailed Map View" src="https://github.com/user-attachments/assets/a513a8d4-de55-477d-b6b9-23046d871377" />
</p>
<br><br>


---

## 🛠 Tech Stack
- **Frontend:** React.js, Tailwind CSS, HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Build Tools:** Vite

---

##  🏗 System Architecture


---

## ⚙ Installation & Setup

### **1. Clone Repository**
```bash
git clone https://github.com/your-username/Accident-detection-and-safety-alert-webapp.git
cd Accident-detection-and-safety-alert-webapp
```

### **2. Install Dependencies**
#### Backend
```bash
cd backend
npm install
```
#### Frontend
```bash
cd ../client
npm install
```

### **3. Run Development Servers**
#### Start Backend
```bash
npm start
```
#### Start Frontend
```bash
npm run dev
```

---

## 📂 Folder Structure
```
Accident-detection-and-safety-alert-webapp/
├── backend/
│   ├── index.js
│   ├── models/
│   │   ├── accidents/
│   │   └── accounts/
│   └── routes/
│
└── client/
    ├── src/
    │   ├── Components/
    │   ├── Pages/
    │   ├── Views/
    │   └── assets/
```


---

## 👨‍💻 Team
We are a passionate team of three developers:  

- **[Sayam](https://github.com/sayam242)**  
- **[Suminder](https://github.com/suminyol)**  
- **[Prempal](https://github.com/prempal04)**  

- ---

## 🚀 Future Enhancements
- AI-based severity analysis from accident images.
- Integration with Google Maps API for live traffic updates.
- Mobile App version for better accessibility.
- Improve **mobile responsiveness** for all pages and dashboards.
- Integrate **real sensor data from IoT devices** for automated accident detection.
