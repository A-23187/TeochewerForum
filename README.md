# A Forum base on GitHub Issues
This project just is a demo to show how to build a simple forum system base on GitHub Issues and serverless platform such as Cloudflare Workers.

## Architecture

```
┌─────────┐     ┌────────────┐     ┌────────┐
│ Users'  │ --> │ Cloudflare │ --> │ GitHub │
│ browser │ <-- │  Workers   │ <-- │ Issues │
└─────────┘     └────────────┘     └────────┘
```
Because interacting with GitHub Issues by calling [API](https://developer.github.com/v3/issues/) directly on the front end may reveal your personal tokens, we can use Cloudflare Workers to do this. Cloudflare Workers provides [Secrets](https://developers.cloudflare.com/workers/reference/apis/environment-variables/) to store sensitive information like personal tokens.

## Others
- Live example: [Teochew](https://ctf.a23187.workers.dev/forum/forum.html)
- There is a stored XSS vulnerability in this forum, so you can use it for learning XSS.
- Don't new an issue labeled as 'forum' under this repo, because this kind of issues are used for the forum insted of feedback.
