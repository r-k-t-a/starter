import chokidar from 'chokidar';
import '../src';

const watcher = chokidar.watch('src', {
  ignored: 'src/index.ts',
  ignoreInitial: true,
});

const dropCache = (file: string): void => {
  // eslint-disable-next-line no-console
  console.log('drop cache by', file);
  Object.keys(require.cache).forEach((key) => {
    delete require.cache[key];
  });
};

watcher.on('add', dropCache).on('change', dropCache);
