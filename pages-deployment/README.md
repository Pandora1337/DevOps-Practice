# GitHub Pages Deployment with Actions

This project aims to demonstrate my knowledge of GitHub Actions to deploy a static website to GitHub Pages.

Deploy action will only push the contents of `web`, and will be triggered after every push that changes that directory only.

## Steps to reproduce
1. In Repo settings, make sure in the ```Pages``` tab ```source``` is set to ```GitHub Actions```, and not ```Deploy Form Branch```!
2. Create a file under ```.github/workflows/``` with any name, and ```.yml``` extension
3. Copy contents of [this file](https://github.com/Pandora1337/DevOps-Practice/tree/main/.github/workflows/pages-deployment.yml) into your new workflow
4. Go to the repo link under https://<yourname>.github.io/<repo name> and see the website!

## Result
The site is now accessible on [https://pandora1337.github.io/DevOps-Practice/pages-deployment/](https://pandora1337.github.io/DevOps-Practice/pages-deployment/)!

