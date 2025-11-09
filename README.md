# Adil Leghari - Professional Resume

This repository contains my professional resume built using [JSON Resume](https://jsonresume.org/) with the [Rickosborne theme](https://github.com/rickosborne/jsonresume-theme-rickosborne). The resume is automatically published to GitHub Pages using GitHub Actions.

## Features

- **JSON Resume Standard**: Resume data follows the JSON Resume schema v1.0.0
- **Rickosborne Theme**: Clean, professional theme optimized for readability
- **Automated Deployment**: GitHub Actions automatically builds and publishes to GitHub Pages
- **Version Control**: Track changes to your resume over time with Git

## Prerequisites

- **Node.js**: v18.x or higher (v20.x recommended)
- **npm**: v9.x or higher
- **Git**: Latest version

## Local Development

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd resume
npm install
```

### Available Commands

#### Serve Resume Locally

Preview your resume in a browser with live reload:

```bash
npm run serve
```

This will start a local server (typically at `http://localhost:4000`) where you can view your resume in real-time.

#### Export to HTML

Generate a static HTML file:

```bash
npm run export
```

This creates an `index.html` file in the current directory.

#### Validate Resume

Validate your `resume.json` against the JSON Resume schema:

```bash
npm run validate
```

### Making Changes

1. Edit `resume.json` to update your resume content
2. Run `npm run serve` to preview changes locally
3. Run `npm run validate` to ensure the JSON is valid
4. Commit and push changes to trigger automatic deployment

## Deployment

### GitHub Pages Setup

This repository uses GitHub Actions to automatically deploy to GitHub Pages. To enable deployment:

1. Go to your repository **Settings**
2. Navigate to **Pages** (under "Code and automation")
3. Under **Source**, select **GitHub Actions**
4. Save the settings

The workflow will automatically trigger on:
- Every push to the `main` branch
- Manual workflow dispatch from the Actions tab

### First Deployment

1. Ensure GitHub Pages is configured (see above)
2. Push your changes to the `main` branch:

```bash
git add .
git commit -m "Initial resume setup"
git push origin main
```

3. Navigate to the **Actions** tab in your repository
4. Watch the "Build and Deploy Resume to GitHub Pages" workflow run
5. Once complete, your resume will be available at:
   ```
   https://<username>.github.io/<repository-name>/
   ```

### Updating Your Resume

To update your resume:

1. Edit `resume.json` with your changes
2. Commit and push to the `main` branch:

```bash
git add resume.json
git commit -m "Update work experience"
git push origin main
```

3. GitHub Actions will automatically rebuild and redeploy your resume

## Repository Structure

```
.
├── .github/
│   └── workflows/
│       └── publish.yml      # GitHub Actions workflow for deployment
├── .gitignore              # Git ignore file
├── README.md               # This file
├── package.json            # Node.js dependencies and scripts
└── resume.json             # Your resume data (JSON Resume format)
```

## JSON Resume Schema

The `resume.json` file follows the [JSON Resume schema v1.0.0](https://jsonresume.org/schema/). Key sections include:

- **basics**: Personal information, contact details, profiles
- **work**: Work experience (in reverse chronological order)
- **education**: Educational background
- **skills**: Technical and professional skills
- **awards**: Recognition and achievements
- **certificates**: Professional certifications
- **publications**: Published works and papers
- **projects**: Conference talks, presentations, and projects
- **languages**: Language proficiencies

## Theme Customization

This resume uses the [Rickosborne theme](https://github.com/rickosborne/jsonresume-theme-rickosborne). To use a different theme:

1. Install the theme:
   ```bash
   npm install jsonresume-theme-<theme-name>
   ```

2. Update `package.json` scripts to use the new theme:
   ```json
   "serve": "resume serve --theme <theme-name>",
   "export": "resume export index.html --theme <theme-name>"
   ```

3. Update `.github/workflows/publish.yml` to use the new theme in the export step

Browse available themes at [JSON Resume Themes](https://jsonresume.org/themes/).

## Troubleshooting

### Workflow Fails

- Check the **Actions** tab for detailed error messages
- Ensure `resume.json` is valid JSON (run `npm run validate`)
- Verify Node.js version in workflow matches your local version

### Resume Not Updating

- Ensure you pushed changes to the `main` branch
- Check the **Actions** tab to verify the workflow ran successfully
- GitHub Pages may take a few minutes to reflect changes

### Local Preview Not Working

- Ensure all dependencies are installed (`npm install`)
- Check that Node.js version meets requirements (`node --version`)
- Try clearing npm cache (`npm cache clean --force`) and reinstalling

## Resources

- [JSON Resume](https://jsonresume.org/) - Official JSON Resume website
- [JSON Resume Schema](https://jsonresume.org/schema/) - Schema documentation
- [Rickosborne Theme](https://github.com/rickosborne/jsonresume-theme-rickosborne) - Theme repository
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)

## License

This project is licensed under the MIT License. Feel free to fork and customize for your own use.

## Contact

**Adil Leghari**
- Email: adilio@gmail.com
- GitHub: [@adilio](https://github.com/adilio)
- LinkedIn: [@adilio](https://linkedin.com/in/adilio)
- Twitter: [@adilio](https://twitter.com/adilio)

