import * as chokidar from 'chokidar'

// something to use by default when events are received
const log = console.debug.bind(console)

type Handlers = {
  add: (path: string) => void
  change: (workingDir: string, path: string) => void
  unlink: (path: string) => void
}

export function watch(workingDir: string, glob: string, handlers: Partial<Handlers>) {
  // initialize watcher.
  const watcher = chokidar.watch(glob, {
    ignored: /(^|[\/\\])\../, // ignore dotfiles
    persistent: true,
    cwd: workingDir,
  })

  watcher
    // .on('add', handlers.add || ((path) => log(`File ${path} has been added`)))
    .on('change', (path: string) =>
      handlers.change ? handlers.change(workingDir, path) : log(`File ${path} in ${workingDir} has been changed`),
    )
  // .on('unlink', handlers.unlink || ((path) => log(`File ${path} has been removed`)))
}
