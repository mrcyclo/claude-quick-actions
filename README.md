# Quick Actions

A board above the Claude Code prompt box with one-click actions:

- **Commit + Push**: asks Claude to commit all current changes, with a message that follows your project rules, then push.
- **Docker Up / Stop**: runs `docker compose up -d` or `docker compose stop`. Shown only when the working directory has `compose.yaml`, `compose.yml`, `docker-compose.yaml` or `docker-compose.yml`.

The board sits in its own framed box, above any other board in the same slot (such as ponytail's).

## Install

At the prompt of a Claude Code terminal session:

```
/plugin install quick-actions --marketplace mrcyclo/claude-quick-actions
```

Answer `y` to add the marketplace, then pick a scope.

From a shell:

```bash
claude plugin install quick-actions --marketplace mrcyclo/claude-quick-actions
```

In the desktop app, where `/plugin` does not run: click **+** next to the prompt box, then **Plugins**, **Add marketplace** with `mrcyclo/claude-quick-actions`, then **Add plugin**.

## Requirements

- Docker with the `docker compose` command, for the Docker buttons.
- A git repository with a remote, for Commit + Push.
