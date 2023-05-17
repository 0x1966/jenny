import {watch} from 'chokidar'

// Initialize watcher.
const watcher = watch('**/Jenkinsfile', {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
})

// Something to use when events are received.
const log = console.log.bind(console)
// Add event listeners.
watcher
  .on('add', (path) => log(`File ${path} has been added`))
  .on('change', (path) => log(`File ${path} has been changed`))
  .on('unlink', (path) => log(`File ${path} has been removed`))
