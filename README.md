# Gitea Pinokio Launcher

A lightweight, painless, completely self-hosted local Git service launcher. Run Gitea on any platform (Windows, macOS, Linux) with a single click, with no external dependencies like Docker or databases needed. It uses a self-contained, pre-compiled Go binary and utilizes **SQLite** for ultra-fast, zero-configuration local Git hosting.

---

## Features

- **1-Click Installation:** Automatic platform and architecture detection (Windows, macOS Intel/Silicon, Linux x64/arm64) to download the correct precompiled Gitea binary.
- **Dynamic Port Allocation:** Launches on the next available port using Pinokio's dynamic port template variables to prevent collisions.
- **Offline & Local-First:** Keeps your source code entirely local and secure on your machine.
- **Instant Reset:** Cleanly wipe binaries, repositories, logs, and configurations to start fresh.
- **Complete Developer Suite:** Supports issues, pull requests, wikis, webhooks, organization management, and a robust REST API.

---

## How to Use

### 1. Installation
Simply click **Install** in the Pinokio sidebar. The installer dynamically fetches the Gitea release binary (`1.22.4`) and configures appropriate execution permissions.

### 2. Startup
Click **Start**. Once the server is online, the launcher automatically captures the HTTP URL and provides an **Open Web UI** button.
- **First Launch Wizard:** Gitea will open a configuration wizard. 
  - **Database Type:** Select **SQLite3** (default and highly recommended for local launch).
  - **Repository Root Path:** Will default to `./data/gitea-repositories`.
  - **Run As User:** Leave as your system username.
  - **Admin Account Settings:** Expand the Optional Settings and create your local administrator username and password.

### 3. Update & Reset
- **Update:** Click **Update** to pull the latest launcher scripts from the upstream repository.
- **Reset:** Click **Reset** to clear all downloaded binaries, local configurations, Git repositories, databases, and logs.

---

## Programmatic API Access

Gitea comes out-of-the-box with a powerful Swagger-compliant REST API. You can generate a **Personal Access Token** in your Gitea profile under **Settings > Applications > Generate Token**, and use it to interact with Gitea programmatically.

### 1. cURL (Command Line)

#### Create a New Repository:
```bash
curl -X 'POST' \
  'http://localhost:3000/api/v1/user/repos' \
  -H 'accept: application/json' \
  -H 'Authorization: token YOUR_PERSONAL_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
  "name": "my-awesome-project",
  "description": "Created locally via Gitea API",
  "private": true
}'
```

---

### 2. JavaScript / Node.js

#### Fetch All Repositories for the Current Authenticated User:
```javascript
const GITEA_URL = "http://localhost:3000"; // Replace with your actual local Gitea URL
const ACCESS_TOKEN = "YOUR_PERSONAL_ACCESS_TOKEN";

async function getUserRepositories() {
  try {
    const response = await fetch(`${GITEA_URL}/api/v1/user/repos`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
        "Authorization": `token ${ACCESS_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const repos = await response.json();
    console.log("Your Local Gitea Repositories:");
    repos.forEach(repo => {
      console.log(`- ${repo.full_name} (${repo.private ? 'Private' : 'Public'})`);
      console.log(`  Clone URL: ${repo.clone_url}`);
    });
  } catch (error) {
    console.error("Error fetching repositories:", error);
  }
}

getUserRepositories();
```

---

### 3. Python

#### Create an Issue in a Repository:
```python
import requests

GITEA_URL = "http://localhost:3000" # Replace with your actual local Gitea URL
ACCESS_TOKEN = "YOUR_PERSONAL_ACCESS_TOKEN"
OWNER = "your_username"
REPO_NAME = "my-awesome-project"

def create_gitea_issue(title, body):
    url = f"{GITEA_URL}/api/v1/repos/{OWNER}/{REPO_NAME}/issues"
    headers = {
        "accept": "application/json",
        "Authorization": f"token {ACCESS_TOKEN}",
        "Content-Type": "application/json"
    }
    payload = {
        "title": title,
        "body": body
    }
    
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code == 201:
        issue = response.json()
        print(f"Successfully created Issue #{issue['number']}: {issue['title']}")
        print(f"Link: {issue['html_url']}")
    else:
        print(f"Failed to create issue: {response.status_code}")
        print(response.text)

# Example usage
create_gitea_issue(
    title="Implement User Auth Flow",
    body="Need to wire up authentication endpoints using the Gitea API."
)
```

---

## Directory Layout & Cleanliness

All configuration data, logs, and Git databases are stored in dedicated local directories within the workspace root. These are automatically ignored by Git and can be wiped using the reset utility:
- `/app/` - The downloaded architecture-specific executable binary.
- `/data/` - Holds user repositories, SQLite database file, sessions, attachments, and SSH keys.
- `/custom/` - Contains user overrides and Gitea's primary configuration file (`custom/conf/app.ini`).
- `/log/` - Execution logs generated by the Gitea daemon.
