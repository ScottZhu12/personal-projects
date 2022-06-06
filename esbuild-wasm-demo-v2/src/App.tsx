import React, { useState, useEffect, useRef } from 'react';
import esbuild from 'esbuild-wasm';

import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

const App: React.FC = () => {
  const [input, setInput] = useState('');
  const iframe = useRef<any>();

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
    // reset iframe html before user executing new code
    iframe.current.srcdoc = html;

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
        // enable the communication between parent window and the iframe
        iframe.current.contentWindow.postMessage(
          result.outputFiles[0].text,
          '*'
        );
      });
  };

  // html file will be used in iframe to render contents
  const html = `
  <html>
  <head></head>
  <body>
    <div id="root"></div>
    <script>
      window.addEventListener('message', (event) => {
        try {
          eval(event.data);
        } catch (err) {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>'
          console.error(err);
          throw err;
        }
      }, false);
    </script>
  </body>
  </html>
  `;

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
      <iframe
        ref={iframe}
        sandbox='allow-scripts'
        srcDoc={html}
        title='preview'
      ></iframe>
    </div>
  );
};

export default App;
