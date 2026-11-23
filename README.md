# Srimitha Senthilkumar — Portfolio (HTML, CSS & JavaScript)

A multi-page, dark-themed developer portfolio written in **plain HTML, CSS and JavaScript**. No frameworks, no build step and no backend.

## Folder structure
```
srimitha-portfolio/
├── index.html          → redirects to home.html
├── home.html           → Hero, About Me, What I Do, Technical Skills
├── education.html      → My Education
├── experience.html     → My Experience (timeline)
├── projects.html       → My Projects (live from GitHub)
├── opensource.html     → Open Source & GitHub Activity
├── contact.html        → Let's Connect
├── css/style.css       → all styles (colors and fonts at the top in :root)
├── js/layout.js        → navbar, mobile menu, footer, icons, scroll animations
├── js/github.js        → GitHub API (projects, stats, languages, contributions)
├── assets/images/      → profile photo + page illustrations
├── assets/icons/       → technology logos
├── assets/resume/      → Srimitha_Senthilkumar_Resume.pdf
├── favicon.svg
└── vercel.json         → clean URLs (/home, /projects ...) on Vercel
```

## How to run in VS Code
1. Install **VS Code**: https://code.visualstudio.com
2. Unzip `srimitha-portfolio-html.zip`.
3. In VS Code choose **File → Open Folder…** and select the `srimitha-portfolio` folder.
4. Open the **Extensions** panel (Ctrl+Shift+X / Cmd+Shift+X), search for **Live Server** (by Ritwick Dey) and click **Install**.
5. Right-click `home.html` and choose **Open with Live Server**, or click **Go Live** in the bottom-right status bar.
6. The site opens at `http://127.0.0.1:5500/home.html` and reloads automatically whenever you save a file.

> You can also just double-click `home.html` to open it in a browser. Live Server is still recommended because it behaves like a real website.

An internet connection is needed for the Google Fonts and the live GitHub data. Everything else works offline.

## Editing content
| What | Where |
|---|---|
| Hero, About, What I Do, Skills | `home.html` |
| Education details | `education.html` |
| Experience entries | `experience.html` |
| Contact details | `contact.html` |
| Social links and name in navbar/footer | top of `js/layout.js` (`PROFILE`) |
| Colors and fonts | `:root` at the top of `css/style.css` |
| Photo | replace `assets/images/srimitha-profile.jpg` (same file name) |
| Resume | replace `assets/resume/Srimitha_Senthilkumar_Resume.pdf` (same file name) |

## GitHub data
`js/github.js` reads public data from:
- `https://api.github.com/users/srimithasenthilkumar`
- `https://api.github.com/users/srimithasenthilkumar/repos?sort=updated&per_page=100`
- `https://github-contributions-api.jogruber.de/v4/srimithasenthilkumar?y=last` (contribution graph)

Results are cached for 10 minutes. If GitHub is unavailable or rate-limited, a friendly message with a link to the GitHub profile is shown. Add a **description**, **topics** or a **website** to a repo on GitHub and it appears on the Projects page automatically. A Live Demo button appears only when the repo has a website set.

## Deploy on Vercel
1. Push the folder to a GitHub repository.
2. On https://vercel.com click **Add New → Project** and import the repo.
3. Framework preset: **Other**. Leave the build command empty and set the output directory to `.` (root).
4. Click **Deploy**. Because of `vercel.json`, pages open at `/home`, `/education`, `/experience`, `/projects`, `/opensource` and `/contact`, and `/` goes to `/home`.

GitHub Pages and Netlify also work. Just upload the folder.
