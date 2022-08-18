const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const { schema, root } = require('./schema/schema');

const app = express();

app.use(
  '/api',
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(5000, () => {
  console.log(`app is listening on port 5000`);
});
