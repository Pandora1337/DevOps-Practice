# GitHub Pages Deployment with Actions

This project aims to demonstrate my knowledge of GitHub Actions to deploy a static website to GitHub Pages.
Deploy action will only push `index.html`, and will be triggered after every push that changes the `index.html` file in this directory

## Steps
1. In Repo settings, make sure in the ```Pages``` tab ```source``` is set to ```GitHub Actions```, and not ```Deploy Form Branch```!
2. Create a file under ```.github/workflows/``` with any name, and ```.yml``` extension
3. Go to the repo link under https://<yourname>.github.io/<repo name> and see the website!

The site should be accessible on [https://pandora1337.github.io/DevOps-Practice/gh-actions-deployment-workflow/](https://pandora1337.github.io/DevOps-Practice/gh-actions-deployment-workflow/)
