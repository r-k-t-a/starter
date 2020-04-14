// eslint-disable-next-line import/no-extraneous-dependencies
import chokidar from 'chokidar';

const watcher = chokidar.watch('../', {
  ignored: /server/i,
  persistent: true,
});

watcher.on('raw', (event, path, details) => {
  console.log(event, path, details);
});
