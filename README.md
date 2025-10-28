# SENGEC - Software Engineering Economics Workshop

This repository contains the website for the Software Engineering Economics Workshop (SENGEC) hosted by York University and IBM.

## Website Structure

- `2024/` - Files for the 2024 edition of the workshop
- `2025/` - Files for the 2025 edition of the workshop
- `assets/` - Shared assets (CSS, JavaScript, images, etc.)

## GitHub Pages Deployment for SENGEC

### First-Time Deployment

The SENGEC website is deployed using GitHub Pages from the `gh-pages` branch of the repository at https://github.com/yorku-ease/SENGEC.

If you're setting up the deployment for the first time:

1. Make sure you have push access to the repository:
   ```bash
   git clone https://github.com/yorku-ease/SENGEC.git
   cd SENGEC
   ```

2. Create a `.gitignore` file to exclude node_modules:
   ```bash
   echo "node_modules/" > .gitignore
   echo ".DS_Store" >> .gitignore
   ```

3. Commit your website files to the main branch:
   ```bash
   git add .
   git commit -m "Initial website files"
   git push origin main
   ```

4. Create and push a gh-pages branch:
   ```bash
   git checkout -b gh-pages
   git push origin gh-pages
   ```

5. The website will be available at https://yorku-ease.github.io/SENGEC/

### Updating the SENGEC Website

When you need to make updates to the website:

1. Make your changes in the main branch:
   ```bash
   git checkout main
   # Make your changes to HTML, CSS, or other files
   git add .
   git commit -m "Update website content"
   git push origin main
   ```

2. Update the gh-pages branch:
   ```bash
   git checkout gh-pages
   git merge main
   git push origin gh-pages
   ```

3. GitHub Pages will automatically rebuild and deploy the site, usually within a few minutes.


The website should be accessible at https://yorku-ease.github.io/SENGEC/ after deployment.