# GitHub Setup

Use this when the local production baseline is ready and needs to be pushed to GitHub.

## Current Local State

- Local git repository has been initialized.
- Branch: `main`.
- Initial baseline commit exists.
- `.gitignore` excludes `.env`, `.env.local`, `.next`, `.vercel`, `node_modules`, logs, and build output.
- There is no GitHub remote yet.
- The local machine does not currently have the `gh` CLI available.

## Recommended GitHub Repository

Create an empty repository in GitHub:

- Repository name: `o3-zone-website`
- Visibility: private while preparing launch, public only when intentionally ready
- Do not initialize with README, `.gitignore`, or license because this repo already has those files

## Push Steps

After the GitHub repository exists, add the remote and push:

```bash
git remote add origin https://github.com/YOUR_USERNAME/o3-zone-website.git
git push -u origin main
```

If using SSH instead:

```bash
git remote add origin git@github.com:YOUR_USERNAME/o3-zone-website.git
git push -u origin main
```

## After Push

1. Confirm the repository shows the latest commit on `main`.
2. Connect the GitHub repository to Vercel.
3. Set Vercel environment variables before the first production deployment.
4. Enable GitHub Actions later from `docs/github-actions-ci-template.yml` when token access includes workflow permissions.

## Do Not Push

Do not add or push these files:

- `.env`
- `.env.local`
- `.env.*.local`
- `.next`
- `.vercel`
- `node_modules`
- logs
- any Supabase service role key
