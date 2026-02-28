# How to Deploy Your Portfolio Website to GitHub Pages

## Prerequisites

- A [GitHub](https://github.com) account
- [Git](https://git-scm.com/) installed on your computer
- Your portfolio website files ready (already done ✅)

---

## Step 1: Create a GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Set the **Repository name** to your preferred name (e.g., `portfolio-website` or `yourusername.github.io`)
3. Set visibility to **Public** (required for free GitHub Pages)
4. **Do NOT** initialize with a README, `.gitignore`, or license (your project already has files)
5. Click **Create repository**

> [!TIP]
> If you name your repo `yourusername.github.io`, your site will be available at `https://yourusername.github.io`. Otherwise, it will be at `https://yourusername.github.io/repo-name`.

---

## Step 2: Connect Your Local Repository to GitHub

Open your terminal in the project folder and run:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
```

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual GitHub username and repository name.

---

## Step 3: Push Your Code to GitHub

```bash
git push -u origin main
```

> [!NOTE]
> If prompted, enter your GitHub username and **Personal Access Token** (not your password). See [Step 6](#step-6-create-a-personal-access-token-if-needed) if you need to create one.

---

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (⚙️ gear icon, top menu bar)
3. In the left sidebar, click **Pages**
4. Under **Source**, select **Deploy from a branch**
5. Under **Branch**, select `main` and folder `/ (root)`
6. Click **Save**

---

## Step 5: Access Your Website

After a few minutes, your site will be live at:

| Repo Name | URL |
|---|---|
| `yourusername.github.io` | `https://yourusername.github.io` |
| Any other name (e.g., `portfolio`) | `https://yourusername.github.io/portfolio` |

> [!IMPORTANT]
> It may take **2–5 minutes** for your site to go live after the first deployment. You can check the deployment status under the **Actions** tab in your repository.

---

## Step 6: Create a Personal Access Token (If Needed)

If Git asks for authentication when pushing:

1. Go to [GitHub Settings → Developer Settings → Personal Access Tokens → Tokens (classic)](https://github.com/settings/tokens)
2. Click **Generate new token (classic)**
3. Give it a descriptive name (e.g., `Portfolio Website`)
4. Set expiration as needed
5. Check the **repo** scope (full control of private repositories)
6. Click **Generate token**
7. **Copy the token** — you won't be able to see it again!
8. Use this token as your password when Git prompts for credentials

---

## Updating Your Website

Whenever you make changes, just run:

```bash
git add -A
git commit -m "Your commit message here"
git push
```

GitHub Pages will automatically redeploy your site within a few minutes.

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Site shows 404 | Make sure `index.html` is in the root of your repo, not inside a subfolder |
| Changes not showing | Clear browser cache or wait a few minutes for deployment |
| Push rejected | Run `git pull origin main --rebase` first, then push again |
| Authentication failed | Use a Personal Access Token instead of your password (see Step 6) |

---

## Adding Content to Your Portfolio

All portfolio content is stored in **`data.js`**. To add new items, simply edit this file — no HTML knowledge needed!

### Adding a Certificate

Add a new object to the `"certificates"` array:

```json
{
  "title": "Your Certificate Name",
  "organization": "Issuing Organization",
  "description": "Brief description",
  "icon": "🏅",
  "filePath": "assets/certificates/your-cert.pdf",
  "fileType": "pdf"
}
```

> **Note:** Place the certificate file in `assets/certificates/` first. Supported types: `"pdf"`, `"image"`, or `"multi-pdf"` (for certificates with multiple semester tabs).

### Adding Education

Add a new object to the `"education"` array:

```json
{
  "institution": "School Name",
  "level": "Diploma / Degree",
  "course": "Course Name",
  "duration": "2024 - 2026",
  "status": "current",
  "icon": "🎓",
  "gpa": {
    "cumulative": "3.8",
    "semesters": [
      { "label": "Sem 1", "value": "3.9" },
      { "label": "Sem 2", "value": "3.7" }
    ]
  }
}
```

### Adding Work Experience

Add a new object to the `"workExperience"` array:

```json
{
  "company": "Company Name",
  "role": "Job Title",
  "duration": "2025 - Present",
  "status": "current",
  "icon": "💼",
  "description": "Brief description of your role.",
  "highlights": [
    "Key achievement #1",
    "Key achievement #2"
  ]
}
```

### Adding a Skill

Add a new object to the `"skills"` array:

```json
{
  "name": "Skill Name",
  "icon": "🔧",
  "description": "Brief description of your expertise."
}
```

### Adding a Project

Add a new object to the `"projects"` array:

```json
{
  "title": "Project Name",
  "label": "Category or Award",
  "featured": false,
  "description": "Description of the project.",
  "features": [
    { "bold": "Feature:", "text": "Feature description" }
  ],
  "techTags": ["Tech1", "Tech2"],
  "images": [
    { "src": "assets/images/project.jpg", "alt": "Description" }
  ]
}
```
