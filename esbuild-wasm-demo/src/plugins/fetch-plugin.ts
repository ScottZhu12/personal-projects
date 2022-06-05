import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

/**
 * create indexDB (in-browser database) using localforage library
 * for caching the downloaded packages (users won't need to download those packages again)
 */
const fileCache = localForage.createInstance({
  name: 'codeEditor',
  storeName: 'cachedPackages',
});

/**
 * this plugin is to handle (fetch) the packages once they are found on unpkg.com
 * build.onLoad is called after the build.onResolve based on the path (URL)
 *
 * @param inputCode
 * the code user entered in textarea
 */
export const fetchPlugin = (inputCode: string) => {
  return {
    name: 'fetch-plugin',
    setup: (build: esbuild.PluginBuild) => {
      // handle the case where index.js is loaded
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: 'jsx',
          contents: inputCode,
        };
      });

      // handle caching files, check if the files are already cached in the indexDB
      // if build.onLoad does not return any objects, esbuild will continue executing
      // other onLoad functions unitl an object is returned
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // check if the package has been fetched before (is in indexDB already)
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        // if is cached, return the result and onLoad will be stopped
        if (cachedResult) {
          return cachedResult;
        }
      });

      // handle the case where the .css file is imported
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        // if not in indexDB, fetch (download) the package first using axios
        // resolveDir: get the current URL pathname, for handling relative path later
        const { data, request } = await axios.get(args.path);

        // to avoid any ambiguity in quotes and remove new line in css file
        const escaped = data
          .replace(/\n/g, '')
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'");

        // esbuild needs to store .js and .css files into separate output files
        // but no file system in browser, tricky way to solve it:
        // inject css file into the DOM with pure javascript
        const contents = `
        const style = document.createElement('style');
        style.innerText = ${escaped};
        document.head.appendChild(style);
        `;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        // save the fetched package in indexDB
        await fileCache.setItem(args.path, result);

        return result;
      });

      // handle the case where other JS packages are imported
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // if not in indexDB, fetch (download) the package first using axios
        // resolveDir: get the current URL pathname, for handling relative path later
        const { data, request } = await axios.get(args.path);

        // esbuild needs to store .js and .css files into separate output files
        // but no file system in browser, tricky way to solve it:
        // inject css file into the DOM with pure javascript
        const contents = data;

        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        // save the fetched package in indexDB
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
