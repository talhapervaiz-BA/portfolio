# Portfolio Deployment Guide

This guide walks you through putting your portfolio live on the internet — for free — using GitHub and Netlify. No coding knowledge required. Follow each step in order.

---

## What you will end up with

- A live portfolio website at a free address like `talha-pervaiz.netlify.app`
- A private admin panel at `/admin` where you can edit ANY content (case studies, contact details, taglines, etc.) through a simple form interface
- Every time you click "Publish" in the admin panel, the site automatically rebuilds and goes live within about 30 seconds
- Optionally: your own custom domain (e.g. `talhapervaiz.com`)

---

## Step 1 — Create a GitHub Account

GitHub is where your website files are stored. It is free.

1. Go to **https://github.com**
2. Click the green **"Sign up"** button (top right)
3. Enter your email address, create a password, and choose a username (e.g. `talha-pervaiz`)
4. Follow the verification steps (they may ask you to solve a puzzle or confirm your email)
5. On the plan selection page, choose **"Free"** and click **"Continue"**

You now have a GitHub account.

---

## Step 2 — Upload Your Project to GitHub

### 2a. Create a new repository

A "repository" (repo) is just a folder on GitHub that holds your project files.

1. Once logged in to GitHub, click the **"+"** icon in the top-right corner
2. Select **"New repository"**
3. In the **"Repository name"** field, type: `portfolio`
4. Leave everything else as the default (make sure **"Public"** is selected)
5. Click the green **"Create repository"** button

You will land on a nearly empty page — that is your new repo.

### 2b. Upload all files

1. On the repository page, click **"uploading an existing file"** (it appears as a link in the middle of the page)
2. Open the `portfolio-site` folder on your computer (the folder containing `build.js`, `package.json`, etc.)
3. **Select ALL files and folders inside `portfolio-site`** and drag them into the GitHub upload area in your browser
   - You need to upload: `build.js`, `package.json`, `netlify.toml`, `DEPLOYMENT-GUIDE.md`, the `src/` folder, and the `admin/` folder
   - **Important:** GitHub's web uploader does not always handle sub-folders well. If you see an option to drag the whole `portfolio-site` folder, do that. Otherwise, upload the files in batches — first the root files, then the `src/` folder contents, then the `admin/` folder contents.
4. Scroll to the bottom of the page. You will see a "Commit changes" box. Leave the default message or type `Initial upload`
5. Click **"Commit changes"**

All your files are now on GitHub.

### 2c. Verify the file structure

After uploading, your repository should show these files and folders:
```
admin/
  config.yml
  index.html
src/
  content.json
build.js
DEPLOYMENT-GUIDE.md
netlify.toml
package.json
```

If anything is missing, click **"Add file" → "Upload files"** to add what is missing.

---

## Step 3 — Connect to Netlify and Deploy

Netlify is the hosting service. It reads your GitHub repo, runs the build script, and publishes the result. It is free for personal projects.

1. Go to **https://netlify.com**
2. Click **"Sign up"** (top right)
3. Choose **"Sign up with GitHub"** — this links Netlify to your GitHub account directly
4. Authorize Netlify when prompted (click **"Authorize netlify"**)
5. You will land on your Netlify dashboard

### 3a. Import your project

1. Click the **"Add new site"** button (it may also say **"Import an existing project"**)
2. Select **"Import an existing project"**
3. Click **"Deploy with GitHub"**
4. If prompted, authorize Netlify to access your GitHub repositories
5. In the repository list, click on **"portfolio"** (the repo you created in Step 2)

### 3b. Configure build settings

You will see a page called "Site configuration". Fill in:

| Field | Value |
|---|---|
| **Branch to deploy** | `main` |
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |

Everything else can stay at its default.

6. Click **"Deploy site"**

Netlify will now:
- Download your files from GitHub
- Run `npm run build` (which runs `node build.js`)
- Publish the generated `dist/index.html` as your live website

This takes about 30–60 seconds. You will see a progress bar and then a green success message.

7. Netlify gives your site a random name like `sparkling-unicorn-abc123.netlify.app`. You can see this on your site's dashboard page. **Click that link** to confirm your portfolio is live.

### 3c. Rename your site (optional but recommended)

1. On your site's Netlify dashboard, click **"Site settings"**
2. Under **"Site details"**, click **"Change site name"**
3. Type something like `talha-pervaiz` → your site becomes `talha-pervaiz.netlify.app`
4. Click **"Save"**

---

## Step 4 — Enable Netlify Identity (for CMS login)

The admin panel at `/admin` needs Netlify Identity to work. This is what lets you log in securely.

1. On your Netlify site dashboard, click **"Site settings"** in the top navigation
2. In the left sidebar, click **"Identity"**
3. Click the **"Enable Identity"** button (big blue button in the middle of the page)

### 4a. Set registration to invite-only

You do not want strangers signing up to edit your site.

1. Still in the Identity settings, scroll down to **"Registration"**
2. Under "Registration preferences", select **"Invite only"**
3. Click **"Save"**

### 4b. Enable Git Gateway

Git Gateway is what allows the CMS to actually commit changes back to your GitHub repo when you click "Publish".

1. In the left sidebar (still in Site settings), scroll down to find **"Identity"** → expand it if needed → click **"Services"**
2. You will see **"Git Gateway"** — click **"Enable Git Gateway"**
3. Click **"Save"**

### 4c. Invite yourself

1. In the top navigation of your Netlify dashboard, click the **"Identity"** tab (it is next to "Deploys", "Functions", etc.)
2. Click **"Invite users"**
3. Enter your email address (e.g. `tpervaiz376@gmail.com`)
4. Click **"Send"**

### 4d. Accept the invitation and set a password

1. Check your email inbox — you will receive an email from Netlify with the subject "You've been invited to join..."
2. Click **"Accept the invite"** in the email
3. You will be taken to your site's URL with a special link — a dialog box will ask you to set a password
4. Enter a strong password and click **"Sign up"**

You now have a login for your admin panel.

---

## Step 5 — Use the CMS to Edit Content

1. Go to: `https://your-site-name.netlify.app/admin`
   (Replace `your-site-name` with the actual name Netlify gave your site)
2. Click **"Login with Netlify Identity"**
3. Enter the email and password you set in Step 4d
4. You will see the CMS dashboard with one collection: **"Portfolio"**
5. Click **"All Portfolio Content"**
6. The full content editor opens — you can edit every section:
   - Hero badge text, your name, title, tagline
   - About paragraphs and stat cards
   - All 9 case studies (challenge, solution, impacts)
   - Skills, timeline, education, metrics, contact details
   - Footer text
7. Make your changes
8. When finished, click the **"Publish"** button (blue button in the top-right area of the CMS)

After clicking Publish:
- GitHub receives the updated `content.json`
- Netlify automatically detects the change and triggers a new build
- Within about 30 seconds, your live site reflects the changes

You can watch the build progress by going to your Netlify dashboard and clicking **"Deploys"**.

---

## Step 6 — Custom Domain (Optional)

If you want your own domain like `talhapervaiz.com` instead of the free `.netlify.app` address:

### 6a. Buy a domain

The cheapest and most reliable registrar is Namecheap.

1. Go to **https://www.namecheap.com**
2. Search for your desired domain name (e.g. `talhapervaiz.com`)
3. Add it to your cart (~$10–15/year for a `.com`)
4. Create an account and complete checkout

### 6b. Connect the domain to Netlify

1. On your Netlify site dashboard, click **"Domain settings"**
2. Click **"Add a domain"** (or "Add custom domain")
3. Type your domain name (e.g. `talhapervaiz.com`) and click **"Verify"**
4. Netlify will show you DNS records to configure

### 6c. Update DNS settings on Namecheap

1. Log in to Namecheap → click **"Domain List"** → click **"Manage"** next to your domain
2. Click the **"Advanced DNS"** tab
3. Delete any existing A Records or CNAME records that are there by default
4. Add the DNS records that Netlify showed you in the previous step:
   - Usually this is: an **A Record** pointing to Netlify's IP address, and a **CNAME** for `www`
   - Netlify will show you the exact values
5. Save the changes

DNS propagation can take anywhere from a few minutes to 48 hours. Once it propagates, your domain will point to your Netlify site.

6. Back in Netlify → Domain settings → click **"Verify DNS configuration"**
7. Once verified, click **"Enable HTTPS"** — Netlify provides a free SSL certificate via Let's Encrypt

Your site is now live at your custom domain with HTTPS.

---

## Troubleshooting

**Build failed on Netlify:**
- Go to your Netlify dashboard → click **"Deploys"** → click the failed deploy → read the error log
- The most common cause is a missing file. Make sure all files from Step 2b were uploaded correctly.

**I can't log in to the admin panel:**
- Make sure you completed Steps 4a–4d (Identity enabled, invite-only, Git Gateway enabled, invitation accepted)
- Try opening the admin URL in a private/incognito browser window
- If you forgot your password, go to the `/admin` page and click "Forgot password"

**My changes in the CMS are not appearing on the live site:**
- Go to Netlify dashboard → **Deploys** — check if a new build was triggered
- If no build was triggered, check that Git Gateway is enabled (Step 4b)
- A deploy should appear within 1–2 minutes of clicking "Publish" in the CMS

**The site looks broken after editing:**
- You may have accidentally deleted required HTML in a text field
- Go back to the CMS and restore the content (the CMS keeps a history — look for an "Unpublish" or version history option)

---

## Quick Reference

| What | Where |
|---|---|
| Your live site | `https://your-site-name.netlify.app` |
| CMS admin panel | `https://your-site-name.netlify.app/admin` |
| GitHub repository | `https://github.com/YOUR-USERNAME/portfolio` |
| Netlify dashboard | `https://app.netlify.com` |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Content file | `src/content.json` |

---

*Guide written for Talha Pervaiz portfolio site — June 2026*
