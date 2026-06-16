const http = require('http');

const data = JSON.stringify({
  code: 'void dfs(int u) { visited[u] = true; for(int v : adj[u]) dfs(v); }',
  topic: 'Graphs/DFS'
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/execute',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    console.log('Status Code:', res.statusCode);
    try {
      const response = JSON.parse(body);
      const trace = response.trace;
      if (!Array.isArray(trace)) {
        console.error('Error: trace is not an array.');
        process.exit(1);
      }
      for (const t of trace) {
        if (!t.hasOwnProperty('line') || !t.hasOwnProperty('segment') || !t.hasOwnProperty('explanation') || !t.hasOwnProperty('state')) {
          console.error('Error: trace element missing required keys.', t);
          process.exit(1);
        }
      }
      console.log('Trace structure is valid.');
      console.log('Number of trace elements:', trace.length);
      process.exit(0);
    } catch (e) {
      console.error('Failed to parse response as JSON:', e.message);
      console.log('Response body:', body);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('Error:', error);
  process.exit(1);
});

req.write(data);
req.end();
