# Narad Desktop Assistant 🤖🖥️

**Narad** is a modular desktop AI assistant featuring a React + Electron frontend and a Flask-based MCP (Multi-Channel Processing) backend. It integrates with platforms like GitHub, Email, and WhatsApp, providing intelligent responses using a local Large Language Model (LLM). Designed for speed, privacy, and offline productivity.

---

## ⚙️ Features

* 🧠 **Local LLM Integration**: Utilizes a local LLM for generating intelligent responses without relying on external APIs.
* 📬 **Multi-Channel Support**: Seamlessly integrates with GitHub, Email, and WhatsApp for comprehensive communication handling.
* 🖥️ **Cross-Platform Desktop Application**: Built with React and Electron to ensure compatibility across various desktop environments.
* 🔌 **Modular Agent Architecture**: Easily extendable with custom agents for additional platforms or functionalities.
* 🔒 **Privacy-Focused**: All data processing occurs locally, ensuring user data remains private and secure.([Gist][1])

---

## 🧠 Tech Stack

* **Frontend**: React, Electron, TypeScript
* **Backend**: Python (Flask), MCP server architecture
* **AI/ML**: Local Large Language Model (LLM) integration
* **Communication**: Integration with GitHub, Email, and WhatsApp APIs

---

## 📁 Modules

* `AIAssistantChat.tsx` – Main chat interface component
* `ContactButtons.tsx` – UI components for initiating contact via different platforms
* `base_agent.py` – Abstract base class for all agents
* `email_agent.py` – Handles email-related functionalities
* `github_agent.py` – Manages interactions with GitHub
* `whatsapp_agent.py` – Facilitates communication through WhatsApp
* `mcp_server.py` – Core server handling multi-channel processing
* `model_loader.py` – Loads and manages the local LLM
* `narad_core.py` – Central logic for orchestrating agent interactions

---

## 🧪 Input

* **User Commands**: Textual inputs provided by the user through the chat interface.
* **Platform Events**: Incoming messages or notifications from integrated platforms like GitHub, Email, and WhatsApp.

---

## 🚀 Goal

To develop a versatile and private desktop AI assistant capable of managing multiple communication channels, providing intelligent responses, and enhancing user productivity without compromising data privacy.

