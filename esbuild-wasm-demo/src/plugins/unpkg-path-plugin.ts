import * as esbuild from 'esbuild-wasm';

/**
 * this plugin is essentially to find the path (URL) of the imported packages from unpkg.com
 * build.onResolve: find where the package is located
 */
export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup: (build: esbuild.PluginBuild) => {
      // handle the case where the file name is exactly index.js
      build.onResolve({ filter: /(^index\.js$)/ }, () => {
        return {
          namespace: 'a',
          path: 'index.js',
        };
      });

      // handle the case where the file contains relative import paths (./ and ../)
      // resolveDir: get the current URL pathname, for handling relative path later
      build.onResolve({ filter: /^\.+\// }, (args: any) => {
        return {
          namespace: 'a',
          path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
            .href,
        };
      });

      // handle the case where file imports package with root path (https:unpkg.com/package-name)
      build.onResolve({ filter: /.*/ }, (args: any) => {
        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });
    },
  };
};
