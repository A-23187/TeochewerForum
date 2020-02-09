# A Forum base on GitHub Issues
This project just is a demo to show how to build a simple forum system base on GitHub Issues and serverless platform such as Cloudflare Workers. Of course, if you own a server, you can use it to deploy the back end. However, the easiest way to access GitHub issues system is to call API directly at the front end.

## Architecture

```
┌─────────┐     ┌────────────┐     ┌────────┐
│ Users'  │ --> │ Cloudflare │ --> │ GitHub │
│ browser │ <-- │  Workers   │ <-- │ Issues │
└─────────┘     └────────────┘     └────────┘
```

## Others
- There is a stored XSS vulnerability in this forum, so you can use it for learning XSS.
- Don't new an issue labeled as 'forum' under this repo, because this kind of issues are used for the forum insted of feedback.