import { expect, test } from 'claude-code/testing'

import { hasCompose } from './compose'

const fsWith = (files: string[]) => async (p: string) => files.includes(p)

test('shows Docker buttons only when a compose file exists', async () => {
  expect(await hasCompose(fsWith(['docker-compose.yml']))).toBe(true)
  expect(await hasCompose(fsWith(['compose.yaml']))).toBe(true)
  expect(await hasCompose(fsWith(['Dockerfile']))).toBe(false)
  expect(await hasCompose(async () => { throw new Error('denied') })).toBe(false)
})
