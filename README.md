# PowerPath: Adaptive Mathematics Learning Platform for Autism Education

> **Empowering Neurodivergent Learners Through Adaptive Technology**

## 1. Project Description
PowerPath is a specialized, full-stack web application designed to teach the mathematical concept of **exponentiation (powers)** to students with Autism Spectrum Disorder (ASD). By leveraging an **adaptive algorithm** and **sensory-friendly UI**, the platform personalizes the learning experience, reducing cognitive overload and anxiety while maximizing engagement and retention.

The system dynamically adjusts difficulty based on real-time performance, ensuring that each student remains in their "Zone of Proximal Development"—challenged enough to learn, but supported enough to succeed.

---

## 2. Problem Statement
Traditional educational software often fails neurodivergent learners due to:
1.  **Sensory Overload:** Bright colors, flashing animations, and cluttered interfaces can cause distress.
2.  **Rigid Progression:** One-size-fits-all curricula do not account for the non-linear learning profiles common in autism.
3.  **High-Stakes Anxiety:** Timers and competitive leaderboards trigger performance anxiety, shutting down cognitive processing.

**PowerPath addresses these issues** by providing a calm, predictable, and highly adaptive environment that respects the unique sensory and cognitive needs of its users.

---

## 3. Tech Stack

### Frontend (Client)
-   **React 19:** Component-based UI library for dynamic interactivity.
-   **Vite:** fast, modern build tool for optimized development.
-   **React Router:** Single-Page Application (SPA) navigation.
-   **Axios:** Promise-based HTTP client for API communication.
-   **CSS Modules:** For encapsulated, conflict-free styling.

### Backend (Server)
-   **Node.js:** JavaScript runtime environment.
-   **Express.js:** Web framework for handling API routes.
-   **MongoDB + Mongoose:** NoSQL database for flexible data modeling.
-   **JWT (JSON Web Tokens):** Secure, stateless authentication.
-   **Bcrypt:** Password hashing for security.

---

## 4. Architecture Overview
The application follows a **MVC (Model-View-Controller)** architecture:

-   **Client:** Handles UI rendering using React 19.
-   **Server:** REST API handles business logic, authentication, and adaptive algorithms.
-   **Database:** MongoDB stores user profiles, progress history, and attempts.

---

## 5. Backend Features
1.  **Adaptive Engine:** A custom algorithm (`adaptiveEngine.js`) that calculates the next problem's difficulty based on the user's accuracy over the last 5 attempts.
2.  **Secure Authentication:** JWT-based protection ensures only authorized students access their progress data.
3.  **Progress Tracking:** Detailed logging of every attempt (time, correctness, difficulty) allows for granular analysis of learning trends.
4.  **Resilience:** Robust error handling and input validation prevent server crashes.

---

## 6. Frontend Features
1.  **Autism-Friendly UI:**
    -   **Pastel Color Palette:** Soft blues, greens, and oranges minimize visual stress.
    -   **Predictable Layout:** Consistent navigation and spacing reduce cognitive load.
    -   **Slow Mode:** Toggleable pacing control for animations.
    -   **Dark Calm Mode:** High-contrast alternative for light-sensitive users.
2.  **PowerVisualizer Component:** Dynamically renders mathematical concepts (e.g., $2^3$ as `[2] x [2] x [2]`) to bridge the gap between abstract numbers and concrete understanding.
3.  **Supportive Feedback:** Non-judgmental, growth-oriented messaging ("Let's understand it together") replaces harsh error signals.
4.  **Real-Time Dashboard:** Immediate visualization of accuracy and progress builds intrinsic motivation.

---

## 7. Adaptive Learning Logic
The core of PowerPath is its ability to "listen" to the student's performance.

-   **High Accuracy (>80%):** The system increases the `level` (e.g., larger bases/exponents), introducing new challenges.
-   **Low Accuracy (<40%):** The system decreases the `level`, reinforcing foundational concepts to rebuild confidence.
-   **Stagnant Performance:** The system maintains the current level but varies the numbers, providing lateral practice.

This ensures the student is **never bored and never overwhelmed**.

---

## 8. Installation Instructions

### Prerequisites
-   Node.js (v18+)
-   MongoDB (Running instance or Atlas URI)

### Steps
1.  **Clone Repository:**
    ```bash
    git clone https://github.com/LavishkaDhamija/PowerPath.git
    cd PowerPath
    ```

2.  **Server Setup:**
    ```bash
    cd server
    npm install
    # Create .env file with:
    # PORT=5000
    # MONGO_URI=your_mongodb_connection_string
    # JWT_SECRET=your_secret_key
    npm run dev
    ```

3.  **Client Setup:**
    ```bash
    cd ../client
    npm install
    npm run dev
    ```

4.  **Access:** Open `http://localhost:5173` in your browser.

---

## 9. Folder Structure
```
PowerPath/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/     # Reusable UI (Navbar, PowerVisualizer)
│   │   ├── pages/          # Route Views (Dashboard, Practice)
│   │   ├── services/       # API Configuration
│   │   └── App.jsx         # Main Component
├── server/                 # Express Backend
│   ├── controllers/        # Logic Handlers
│   ├── models/             # Mongoose Schemas
│   ├── routes/             # API Endpoints
│   ├── services/           # Business Logic (Adaptive Engine)
│   └── server.js           # Entry Point
```

---

## 10. Future Improvements
1.  **Voice Interaction:** Adding Text-to-Speech (TTS) for auditory learners.
2.  **Teacher Dashboard:** A separate portal for educators to monitor class-wide progress.
3.  **Gamification:** Gentle, non-competitive rewards (e.g., unlocking new visualizer themes).
4.  **Offline Mode:** PWA support for learning without internet access.

---

**Developed with 💙 for Inclusive Education.**
