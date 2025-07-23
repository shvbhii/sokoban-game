#  Sokoban Puzzle Game 📦

![Sokoban Gameplay Demo](./public/Screenshot%202025-07-24%20001734.png) 


A classic logic puzzle game built with a modern tech stack as **Day 23** of the **#30DaysOfVibeCoding** challenge. Push boxes onto their targets to solve intricate puzzles and test your spatial reasoning.

**[➡️ View Live Demo on Vercel](https://sokoban-game-nine.vercel.app/)** 

---

## 📜 Description

This project is a web-based implementation of Sokoban, the classic box-pushing puzzle game. The objective is simple: push all the boxes (`📦`) onto the target spots (`🎯`). However, you can only push one box at a time, and you cannot pull them. This simple rule set leads to surprisingly complex and challenging puzzles.

This game was built from the ground up as part of a 30-day daily coding challenge, emphasizing rapid development, creative problem-solving, and the "vibe coding" philosophy.

## ✨ Features

*   **10 Challenging Levels:** A curated set of puzzles with increasing difficulty.
*   **Sleek, Modern UI:** A beautiful and responsive interface built with Tailwind CSS, featuring smooth animations and a pleasant aesthetic.
*   **Intuitive Controls:** Play using your keyboard (Arrow Keys or WASD) for a desktop experience.
*   **Move Counter:** Keep track of your moves and challenge yourself to solve puzzles more efficiently.
*   **Undo & Reset:** Made a mistake? Undo your last move with the 'U' key. Want a fresh start? Hit 'R' to reset the level instantly.
*   **Level Progression:** Automatically advance to the next level upon completion.
*   **Game Completion Screen:** A special congratulatory screen for finishing all the levels.

Here’s how AI played a role:

*  Initially, the game logic was complex and buggy. AI helped refactor the entire state management system from a confusing, single-array model to a much cleaner, two-layer model (static layout + dynamic entities), which fixed the win condition and made the code more robust.
* When some of my initial, self-made levels turned out to be unsolvable, AI provided a set of classic, verified, and solvable Sokoban puzzles to use as a reliable data source.


## 🛠️ Tech Stack

*   **Framework:** **React** (built with **Vite** for a fast development experience)
*   **Styling:** **Tailwind CSS** for a utility-first CSS workflow.
*   **Icons:** **Lucide React** for clean and modern icons.
*   **Language:** **JavaScript (ES6+)**
*   **Deployment:** **Vercel**

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm installed on your machine.
*   [Node.js](https://nodejs.org/)

### Installation

1.  **Fork the repository**
    Click the "Fork" button at the top-right of this page.

2.  **Clone your forked repository**
    ```sh
    git clone https://github.com/shvbhii/sokoban-game.git

    ```

3.  **Navigate to the project directory**
    ```sh
    cd your-repo-name
    ```

4.  **Install NPM packages**
    ```sh
    npm install
    ```

5.  **Run the development server**
    ```sh
    npm run dev
    ```
    Your project should now be running on `http://localhost:5173/` (or the address shown in your terminal).

## 🤝 How to Contribute

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/shvbhii/sokoban-game.git).

1.  **Fork** the Project.
2.  Create your **Feature Branch** (`git checkout -b feature/AmazingFeature`).
3.  **Commit** your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  **Push** to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a **Pull Request**.

## 👤 Creator & Connect

This project was created by **Shubhi Sharma** as part of the #30DaysOfVibeCoding challenge.

[![LinkedIn Badge](https://img.shields.io/badge/-Shubhi-blue?style=for-the-badge&logo=linkedin&logoColor=white&link=https://www.linkedin.com/in/shvbhi/)](https://www.linkedin.com/in/shvbhi)

Let's connect! Feel free to reach out with ideas, feedback, or just to say hi.

## 📜 License

This project is open-source and available under the [MIT License](LICENSE.txt).
