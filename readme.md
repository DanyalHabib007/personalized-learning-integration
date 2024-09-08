

# 🎓 Personalized Learning Integration Platform 🎓

## 🚀 Overview

Welcome to the **Personalized Learning Integration Platform**! This project brings the power of **adaptive learning** to educational platforms by tailoring content to individual learners’ needs, preferences, and progress. Using cutting-edge technologies like **LLMs** and **vector databases**, students can enjoy a more engaging, effective, and personalized learning experience! 🌟

---

## ✨ Features

### 1. 📚 Adaptive Content
- 📈 Adjusts learning materials based on the learner’s progress and quiz results.
- 📘 Recommends personalized resources, practice exercises, and additional study materials.

### 2. 🎯 Personalized Learning Paths
- 🛤️ Customizes learning paths based on the learner’s goals, performance, and preferences.
- ⏳ Offers flexible pacing options to explore various learning modalities.

### 3. 🤖 Intelligent Tutoring
- 🧠 Provides real-time tutoring assistance with hints, explanations, and feedback.
- 🕵️ Identifies knowledge gaps and offers targeted remediation materials.

### 4. 🔌 Seamless Integration
- 🛠️ Easily integrates with existing learning platforms.
- 👩‍🏫 User-friendly and intuitive for both students and instructors alike!

### 5. 🔒 Data Privacy and Security
- 🛡️ Ensures responsible handling of learner data with a focus on privacy and ethical standards.

---

## 🛠️ Architecture

The **Personalized Learning Platform** consists of several key components:

1. **🖥️ Frontend User Interface:**
   - Browse courses, take quizzes, and provide feedback.
   - Integrated with the chatbot for real-time support and assistance. 💬

2. **⚙️ Backend - FastAPI:**
   - Processes user inputs like quiz scores and feedback.
   - Connects with the **RAG LLM recommendation model** and **Qdrant** to generate personalized learning paths. 📊

3. **💡 RAG LLM Recommendation Model (LLaMA 3.1):**
   - Analyzes user data to retrieve relevant learning paths.
   - Uses the **Qdrant vector database** to quickly find and recommend courses. 📑

4. **📂 Qdrant Vector Database:**
   - Stores course content and structures efficiently.
   - Supports fast retrieval of relevant learning material for tailored recommendations. 🔍

5. **🤖 Mistral LLM Chatbot:**
   - Assists students by answering queries about courses, quizzes, and feedback.
   - Always available to support learners throughout their journey. 🚀

---

## 📖 Usage

### 🔧 Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/danyalhabib007/personalized-learning-integration.git
    cd personalized-learning-integration
    ```

2. Set up a virtual environment and install dependencies:
    ```bash
    python3 -m venv env
    source env/bin/activate
    pip install -r requirements.txt
    ```

3. Start the FastAPI backend:
    ```bash
    uvicorn app.main:app --reload
    ```

4. Run the frontend (Use any server Apache or Ningnx). 🎨

5. Setup Qdrant Vector database using docker [Link](https://qdrant.tech/documentation/quickstart/)

6. To run Mistral chatbot
    ```bash
    chainlit run appy.py
    ```
---
## Architecture

![vvv.png](https://iili.io/d8PtA2R.md.png)


---
### 💡 How to Use
- Browse courses, take quizzes, and provide feedback to receive **personalized course recommendations**.
- Interact with the **Mistral LLM Chatbot** for real-time assistance at any stage of your learning. 🤖💬

---

## 🔐 Data Privacy

🔒 We take **data privacy** very seriously. The platform is designed to comply with the highest standards of **privacy and security**, ensuring that learner data is handled ethically and responsibly.

---

## 🤝 Contributors

[@Amber Bagchi](https://github.com/amber-bagchi)
[@Ankit Kumar](https://github.com/iamankit7667)
[@Danyal Habib](https://github.com/DanyalHabib007)
[@Om Shankar Thakur](https://github.com/Om-Shankar-Thakur)


---

## 🙌 Acknowledgments

A big thank you to:
- 🧠 [LLaMA 3.1 Model](https://example-link.com)
- 🔍 [Qdrant Vector Database](https://qdrant.tech)
- 🤖 [Mistral LLM Chatbot](https://example-link.com)
- The open-source community for providing these amazing tools! 🎉

