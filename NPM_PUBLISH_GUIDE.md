# 📦 NPM Publishing Guide

Follow these steps to publish your CLI to npm:

## 🔐 Step 1: Create/Login to npm Account

### If you don't have an npm account:

1. Go to https://www.npmjs.com/signup
2. Create a free account
3. Verify your email

### Login to npm via CLI:

```bash
npm login
```

Enter your:

- Username
- Password
- Email
- One-time password (if 2FA is enabled)

### Verify you're logged in:

```bash
npm whoami
```

## 📝 Step 2: Check Package Name Availability

The package is scoped to your username: `@pankajkumardev/project-scaffold-cli`

Check if it's available:

```bash
npm search @pankajkumardev/project-scaffold-cli
```

Or check on: https://www.npmjs.com/package/@pankajkumardev/project-scaffold-cli

### Alternative: Use unscoped name

If you want an unscoped package, change in package.json:

```json
"name": "project-scaffold-cli"
```

⚠️ Note: Unscoped names are more likely to be taken!

## 🧪 Step 3: Test Locally

Test your CLI works before publishing:

```bash
# Install dependencies
npm install

# Test the CLI
node index.js

# Link it globally to test the bin command
npm link

# Test the global command
scaffold

# Unlink when done testing
npm unlink -g @pankajkumardev/project-scaffold-cli
```

## 🚀 Step 4: Publish to npm

### Dry run (see what will be published):

```bash
npm publish --dry-run
```

### Publish (scoped package - public):

```bash
npm publish --access public
```

### If you're using unscoped name:

```bash
npm publish
```

## ✅ Step 5: Verify Publication

1. Check on npm: https://www.npmjs.com/package/@pankajkumardev/project-scaffold-cli
2. Wait 2-5 minutes for indexing
3. Test installation:

```bash
# Install globally
npm install -g @pankajkumardev/project-scaffold-cli

# Or use npx (no installation needed)
npx @pankajkumardev/project-scaffold-cli
```

## 🔄 Step 6: Updating Your Package

When you make changes and want to publish a new version:

### Update version:

```bash
# Patch version (1.0.0 -> 1.0.1) - for bug fixes
npm version patch

# Minor version (1.0.0 -> 1.1.0) - for new features
npm version minor

# Major version (1.0.0 -> 2.0.0) - for breaking changes
npm version major
```

### Publish the update:

```bash
npm publish --access public
```

## 📊 Package Commands

After publishing, users can install your CLI:

```bash
# Install globally
npm install -g @pankajkumardev/project-scaffold-cli

# Run with npx (no installation)
npx @pankajkumardev/project-scaffold-cli

# Or use the short commands
scaffold
project-scaffold
```

## 🎯 Important Notes

1. **Scoped Packages**: Packages like `@pankajkumardev/...` are scoped to your username

   - Free for public packages
   - Require `--access public` flag when publishing

2. **Version Numbers**: Follow semantic versioning

   - MAJOR.MINOR.PATCH (e.g., 1.0.0)
   - Can't publish the same version twice

3. **Package Size**: Keep it under 10MB if possible

   - Check size: `npm pack --dry-run`

4. **README**: Your README.md will be the package homepage on npm

5. **Keywords**: Good keywords help users find your package

## 🐛 Troubleshooting

### "Package name already exists"

- Use a scoped package: `@yourusername/package-name`
- Choose a different unique name

### "You must verify your email"

- Check your email and verify your npm account

### "You need to authenticate"

- Run `npm login` again

### "402 Payment Required"

- You're trying to publish a private scoped package
- Add `--access public` flag

### "403 Forbidden"

- You don't have permission to publish under this name
- The package might be owned by someone else

## 🌟 After Publishing

1. Share on Twitter/LinkedIn
2. Add npm badge to README:

   ```markdown
   ![npm version](https://img.shields.io/npm/v/@pankajkumardev/project-scaffold-cli.svg)
   ![npm downloads](https://img.shields.io/npm/dm/@pankajkumardev/project-scaffold-cli.svg)
   ```

3. Track downloads: https://npm-stat.com/charts.html?package=@pankajkumardev/project-scaffold-cli

4. Monitor issues on GitHub

5. Keep package updated

## 📝 Quick Command Reference

```bash
# Login
npm login

# Test locally
npm link

# Check what will be published
npm publish --dry-run

# Publish
npm publish --access public

# Update version
npm version patch

# View package info
npm info @pankajkumardev/project-scaffold-cli

# Unpublish (within 72 hours)
npm unpublish @pankajkumardev/project-scaffold-cli@1.0.0
```

---

**Ready to publish? Run these commands:**

```bash
npm login
npm publish --access public
```

🎉 **That's it! Your CLI will be live on npm!**
