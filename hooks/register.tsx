import type { EngineInterface, Register } from 'claude-code'

import { hasCompose } from './compose'

// Claude writes the message, so it follows the project's commit rules.
const COMMIT_PROMPT = 'Commit all current changes with a message that follows the project rules, then push to the remote.'

async function compose($: EngineInterface, args: string[], done: string) {
  $.ui.toast(`docker compose ${args.join(' ')}...`)
  const r = await $.process.run(['docker', 'compose', ...args], { timeoutMs: 600_000 }).catch((err: Error) => ({
    exitCode: -1,
    stdout: '',
    stderr: err.message,
  }))
  if (r.exitCode === 0) {
    $.ui.toast(done)
    return
  }
  const reason = (r.stderr || r.stdout).trim().split('\n').pop() ?? ''
  $.ui.toast(`docker compose ${args[0]} lỗi: ${reason}`)
}

export const register: Register = on => {
  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) return next(e)
    // Other mods (ponytail's band) share this slot: draw theirs below ours.
    const below = await next(e).catch(() => undefined)
    const docker = await hasCompose(p => $.fs.exists(p))

    const { Box, Button, Text } = $.ui.resolve(e)
    // A framed, labelled box in Claude's colour so it never reads as part of ponytail's band.
    const mine = (
      <Box flexDirection="row" alignItems="center" gap={2} borderStyle="round" borderColor="claude" paddingX={1}>
        <Text bold color="claude">
          ⚡ Quick actions
        </Text>
        <Button key="commit" variant="primary" label="Commit + Push" onPress={() => void $.prompt.submit({ text: COMMIT_PROMPT })} />
        {docker && <Text dimColor>│ Docker</Text>}
        {docker && <Button key="up" plain label="Up" onPress={() => compose($, ['up', '-d'], 'Docker đã chạy')} />}
        {docker && <Button key="stop" plain label="Stop" onPress={() => compose($, ['stop'], 'Docker đã dừng')} />}
      </Box>
    )
    return below ? <Box flexDirection="column" gap={1}>{mine}{below}</Box> : mine
  }).catch(($, e, next) => next(e))
}
