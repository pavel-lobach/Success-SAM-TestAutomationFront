# SAM-TestAutomationFront stack

Contains the following resources:

S3 Buckets:

- TestAutomationResults

SSM Parameters:

- /sam/shared/ProjectPrefix

This app is deployed to production automatically, CI/CD on main branch

To deploy (locally, default profile):

```bash
npm run deploy
```

To deploy without confirmation prompt:

```bash
npm run deploy:y
```

# --------------------------------------------------
