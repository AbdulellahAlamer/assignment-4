# GitHub Pages Deployment Guide

This guide explains how to enable GitHub Pages for this repository.

## Setup Instructions

To host this portfolio website on GitHub Pages, follow these steps:

### 1. Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/AbdulellahAlamer/assignment-4
2. Click on **Settings** (in the repository menu)
3. Scroll down to the **Pages** section in the left sidebar
4. Under **Build and deployment**:
   - **Source**: Select "GitHub Actions"
5. Save the settings

### 2. Merge the PR

Once the pull request with the workflow file is merged to the `main` branch, the GitHub Actions workflow will automatically trigger and deploy your site.

### 3. Access Your Site

After the workflow completes successfully, your site will be available at:

**https://abdulellahAlamer.github.io/assignment-4/**

## How It Works

The deployment is automated using GitHub Actions:

- The workflow file is located at `.github/workflows/deploy.yml`
- It triggers automatically when code is pushed to the `main` branch
- It can also be triggered manually from the Actions tab
- The workflow deploys all files in the repository to GitHub Pages

## Troubleshooting

If the site doesn't deploy:

1. Check the **Actions** tab in your repository to see if the workflow ran successfully
2. Make sure GitHub Pages is enabled in Settings → Pages
3. Verify that the workflow has the necessary permissions
4. Wait a few minutes - it can take time for the site to become available

## Manual Deployment

You can also trigger the deployment manually:

1. Go to the **Actions** tab in your repository
2. Select the "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the `main` branch and click "Run workflow"
