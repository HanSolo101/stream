# 🚀 PC Migration & Antigravity Setup Guide

> **Project:** Strangeroo (Next.js 14 + Node.js/Fastify + Socket.IO + PostgreSQL + Redis + Docker)  
> **Target:** Moving to a new computer and continuing development seamlessly in **Google Antigravity IDE** using your same account.

---

## 📋 Quick Migration Checklist

- [ ] **Old PC:** Commit & push project to Git (or create a clean zip excluding `node_modules`).
- [ ] **Old PC:** Securely back up your `.env` file (it contains secrets and is not in Git).
- [ ] **New PC:** Install Node.js (v20+), Git, and Docker Desktop.
- [ ] **New PC:** Install Google Antigravity IDE.
- [ ] **New PC:** Log into Antigravity with the **exact same Google account**.
- [ ] **New PC:** Clone / copy project, restore `.env`, and install dependencies.
- [ ] **New PC:** Start Docker (`Postgres` + `Redis`), run migrations, and test frontend/backend servers.

---

## Part 1: Actions on Your Current (Old) PC

### 1.1 Critical: Save Your Code to Git (Recommended)
> ⚠️ **Important Notice:** Your current project directory is **not yet initialized with Git**. To ensure you don't lose any code or commit history, set up a remote repository now.

Open your PowerShell / terminal in `strangeroo`:

```powershell
# Navigate into the project folder
cd "c:\Users\unix\Desktop\New folder (3)\strangeroo"

# 1. Initialize git
git init

# 2. Add all project files (.gitignore will automatically skip node_modules and .env)
git add .

# 3. Commit the changes
git commit -m "Initial commit before PC migration"

# 4. Link to your GitHub / GitLab repository (create a private repo on github.com first)
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo-name>.git

# 5. Push your code
git push -u origin main
```

---

### 1.2 Back Up Your Secret Environment File (`.env`)
The `.env` file contains your session secrets, database URLs, and Razorpay API keys. Because it is ignored by Git for security, **it will not be on GitHub**.

- Locate: `c:\Users\unix\Desktop\New folder (3)\strangeroo\.env`
- Copy `.env` to a **secure USB drive**, password manager (e.g., Bitwarden / 1Password), or a secure private storage.

---

### 1.3 Alternative: If Transferring via USB / External SSD
If you prefer not to use GitHub and want to transfer files directly via flash drive:
1. **DO NOT copy `node_modules` or `.next` folders!** (They contain tens of thousands of tiny files that cause slow copy speeds and OS path corruption).
2. Create a clean archive or copy only source files:
   - Keep: `frontend/` (without `frontend/node_modules` and `frontend/.next`)
   - Keep: `backend/` (without `backend/node_modules` and `backend/dist`)
   - Keep: `infra/`, `.env`, `.env.example`, `docker-compose.yml`, `README.md`

---

## Part 2: Setting Up the New PC

### 2.1 Install System Prerequisites
Before installing Antigravity, ensure the following core tools are installed on your new PC:

1. **Git for Windows**
   - Download from: [https://git-scm.com/download/win](https://git-scm.com/download/win)
   - During install, keep standard defaults (enables Git in PowerShell).
2. **Node.js (v20+ LTS recommended)**
   - Download from: [https://nodejs.org](https://nodejs.org) (v20.x or v22.x LTS)
   - Verify in terminal:
     ```powershell
     node -v
     npm -v
     ```
3. **Docker Desktop**
   - Download from: [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
   - Ensure WSL 2 backend is enabled during installation.
   - Start Docker Desktop and ensure it is running in your system tray.
4. **(Optional) pnpm package manager**:
   ```powershell
   npm install -g pnpm
   ```

---

## Part 3: Install & Log In to Google Antigravity IDE

### 3.1 Install Antigravity IDE
1. Download the latest installer for Windows from the official Antigravity portal ([https://antigravity.google](https://antigravity.google)).
2. Run the installer and launch **Antigravity**.

### 3.2 Sign In with the Same Account
To maintain your access tier, model selection (e.g. Gemini 3.8 / Pro), settings, and quotas:
1. In the bottom-left corner (or sidebar) of Antigravity IDE, click the **Accounts / Profile icon** (or the Antigravity logo in the top bar).
2. Select **Sign In / Log In**.
3. Choose **Continue with Google** and sign in with the **exact same Google account email** you used on your old PC.
4. Once authenticated, your browser will redirect back to the IDE.
5. Verify your session:
   - Open the Antigravity Agent sidebar (`Ctrl + L` or click the Sparkle/Chat icon).
   - Ensure your account status and model dropdown appear active.

---

## Part 4: Project Setup on the New PC

### 4.1 Get the Code
Open PowerShell on your new PC, choose a directory (e.g. `C:\Projects` or `C:\Users\<username>\Desktop`), and clone or paste the folder:

```powershell
# If using Git:
git clone https://github.com/<your-username>/<your-repo-name>.git strangeroo
cd strangeroo
```

*(Or if you copied via USB, paste the `strangeroo` folder and open a terminal inside it).*

### 4.2 Restore the `.env` File
Place your backed up `.env` file directly into the `strangeroo/` root directory:
```
strangeroo/
├── .env          <-- Place your backed-up file here
├── .env.example
├── backend/
├── frontend/
└── docker-compose.yml
```

### 4.3 Open the Folder in Antigravity
1. In Antigravity IDE, click **File > Open Folder...** (`Ctrl + K, Ctrl + O`).
2. Select the `strangeroo` folder.
3. If prompted: **"Do you trust the authors of the files in this folder?"** click **Yes, I trust the authors**.

---

### 4.4 Install Dependencies

Open the integrated terminal in Antigravity (`Ctrl + \``) and run:

#### 1. Frontend Dependencies:
```powershell
cd frontend
npm install
cd ..
```

#### 2. Backend Dependencies:
```powershell
cd backend
npm install
cd ..
```

---

### 4.5 Start Database & Infrastructure (Docker)
Ensure Docker Desktop is running, then in the project root (`strangeroo`):

```powershell
docker compose up -d
```
> This starts **PostgreSQL** (port `5432`) and **Redis** (port `6379`) in background containers.

Check if containers are healthy:
```powershell
docker compose ps
```

---

### 4.6 Run Database Migrations
Run the initial database migration script to set up PostgreSQL schemas:

```powershell
cd backend
npm run migrate
cd ..
```

---

### 4.7 Start Local Development Servers

You can run both servers in split terminals within Antigravity:

- **Terminal 1: Frontend (Next.js)**
  ```powershell
  cd frontend
  npm run dev
  ```
  *Accessible at:* `http://localhost:3000`

- **Terminal 2: Backend (Fastify + Socket.IO)**
  ```powershell
  cd backend
  npm run dev
  ```
  *Accessible at:* `http://localhost:4000`

---

## Part 5: Working with Antigravity AI Features

Once your workspace is open, all Antigravity agentic capabilities are ready:

| Feature | Shortcut | Description |
|---|---|---|
| **Agent Chat** | `Ctrl + L` | Multi-step agent pair-programmer that can edit files, debug, run commands, and browse web docs. |
| **Inline Prompt** | `Ctrl + I` | Highlight code and refactor, generate, or add documentation in-place. |
| **Antigravity Tab** | `Tab` | Context-aware code completion, supercomplete diffs, and automatic import suggestions. |
| **Code Lenses** | Click buttons above functions | Quick triggers for testing, refactoring, or explaining specific code blocks. |

---

## 🛠️ Troubleshooting & Tips

### PowerShell Script Execution Policy Error:
If running `npm` or `pnpm` gives an execution policy error on a fresh Windows install:
```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

### Port Conflicts:
If port `5432` or `6379` is already in use by a locally installed Postgres/Redis service:
- Stop local services via Windows Services (`services.msc`), or
- Use the Docker containers configured in `docker-compose.yml`.

### Docker WSL2 Error:
If Docker Desktop fails to start on Windows:
- Run in PowerShell (Admin): `wsl --update`
- Restart your computer and reopen Docker Desktop.

---

🎉 **You are now completely set up and ready to continue development seamlessly on your new computer!**
