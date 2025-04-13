
🤖 Smart Q&A Assistant (Full-Stack App with Hugging Face + React + Node + MySQL)

This is a full-stack question-answering assistant that uses Mistral-7B-Instruct, a powerful open-source LLM, hosted on Hugging Face. 
It allows users to ask any question, get a smart, AI-generated answer, and stores all interactions in a MySQL database.

---

🛠️ Technologies Used

- Frontend: React (Vite)
- Backend: Node.js + Express
- Database: MySQL (via XAMPP local setup)
- LLM: mistralai/Mistral-7B-Instruct-v0.1 via Hugging Face Inference API
- .env: Used for storing Hugging Face API token

---

📸 Features

- Ask any question, get an intelligent answer powered by a free LLM.
- Stores all questions and answers in a local MySQL database.
- Easy to run locally with XAMPP.
- Built with simplicity, clarity, and expansion in mind.

---

🚀 Getting Started

1. Clone the Repository

    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name

2. Backend Setup

    cd backend
    npm install

3. Create .env file

    Use the .env.example provided and create your own .env file:

    PORT=5000
    HF_API_KEY=your_huggingface_api_token
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=
    DB_NAME=qa_app

4. Start Backend

    node index.js

---

💻 Frontend Setup

1. Move into frontend folder

    cd frontend
    npm install

2. Start frontend

    npm run dev

---

🛠️ How to Set Up MySQL (Using XAMPP)

1. Download XAMPP from https://www.apachefriends.org/download.html
2. Install and open the XAMPP control panel
3. Start **Apache** and **MySQL**
4. Open http://localhost/phpmyadmin in your browser
5. Create a database named: `qa_app`
6. Run this SQL to create the `qa` table:

    CREATE TABLE qa (
      id INT AUTO_INCREMENT PRIMARY KEY,
      question TEXT,
      answer TEXT
    );

---

🔐 Get a Hugging Face API Token

1. Go to https://huggingface.co/join and create a free account
2. Go to https://huggingface.co/settings/tokens
3. Click "New Token" and give it a name (scope: read)
4. Copy the token and paste it into your `.env` file as `HF_API_KEY`

---

📝 License

Free to use, learn, fork, and grow. Contributions welcome!

---

Made with ❤️ using open-source AI.
