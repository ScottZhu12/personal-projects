import React, { useState, useEffect } from 'react';
import esbuild from 'esbuild-wasm';

import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const [code, setCode] = useState('');

  // initialize and start the esbuild-wasm service when the app is started
  // try-catch block ensures the service is initialized once only
  useEffect(() => {
    try {
      esbuild.build({});
    } catch (err) {
      if (err instanceof Error && err.message.includes('initialize')) {
        esbuild.initialize({
          worker: false,
          wasmURL: 'https://unpkg.com/esbuild-wasm/esbuild.wasm',
        });
      } else {
        throw err;
      }
    }
  }, []);

  // esbuild.build: transpile and bundle the code
  const onClick = () => {
    esbuild
      .build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin(), fetchPlugin(input)],
        define: {
          'process.env.NODE_ENV': `'production'`,
          global: 'window',
        },
      })
      .then((result) => {
        setCode(result.outputFiles[0].text);
      });
  };

  return (
    <div className='app'>
      <textarea
        name='code'
        id='code'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      ></textarea>
      <div>
        <button type='submit' onClick={onClick}>
          Submit
        </button>
      </div>
      <pre>{code}</pre>
      <iframe src='' frameborder='0'></iframe>
    </div>
  );
};

export default App;
