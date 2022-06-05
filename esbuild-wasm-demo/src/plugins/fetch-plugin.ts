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
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // handle the case where the package path is index.js
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: inputCode,
          };
        }

        // check if the package has been fetched before (is in indexDB already)
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        );

        // if is cached, return the result and onLoad will be stopped
        if (cachedResult) {
          return cachedResult;
        }

        // if not in indexDB, fetch (download) the package first using axios
        // resolveDir: get the current URL pathname, for handling relative path later
        const { data, request } = await axios.get(args.path);
        const result: esbuild.OnLoadResult = {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };

        // save the fetched package in indexDB
        await fileCache.setItem(args.path, result);

        return result;
      });
    },
  };
};
