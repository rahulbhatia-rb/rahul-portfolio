# Rahul Portfolio

Personal portfolio site for Rahul H Bhatia.

## Stack

- Static HTML
- CSS
- Vanilla JavaScript

## Local Preview

Open `index.html` directly in a browser, or serve the folder with any static file server.

Example:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Files

- `index.html` - site structure
- `styles.css` - visual design and responsive layout
- `script.js` - interaction, animations, and case-study carousel

## Deployment

This repo is now set up for GitHub Pages deployment through GitHub Actions.

### GitHub Pages

1. Push the repository to GitHub.
2. In GitHub, open `Settings` -> `Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Push to `main` and GitHub will publish the site automatically.

The workflow file lives at `.github/workflows/deploy-pages.yml`.

Once Pages is enabled, your default site URL will usually be:

- `https://rahulbhatia-rb.github.io/rahul-portfolio/`

If you want to use a custom domain like `rahulhbhatia.com`, add it in the GitHub Pages settings after the first successful deploy and then update DNS at your domain provider.

### Other Static Hosts

This site also works without changes on:

- Vercel
- Cloudflare Pages
- Netlify

## Domain

Recommended primary domain:

- `rahulhbhatia.com`

Custom domain and SEO setup should be done after deployment.
