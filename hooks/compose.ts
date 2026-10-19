// The names `docker compose` itself looks for in the working directory.
export const COMPOSE_FILES = ['compose.yaml', 'compose.yml', 'docker-compose.yaml', 'docker-compose.yml']

export async function hasCompose(exists: (path: string) => Promise<boolean>): Promise<boolean> {
  const found = await Promise.all(COMPOSE_FILES.map(f => exists(f).catch(() => false)))
  return found.includes(true)
}
