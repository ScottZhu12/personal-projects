const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');

let links = [
  {
    id: 'link-0',
    description: 'Fullstack tutorial for GraphQL',
    url: 'www.howtographql.com',
  },
];

const resolvers = {
  Query: {
    info: () => 'This is the API of a Hackernews Clone',
    feed: () => links,
    link: (parent, args) => {
      const link = links.find((item) => item.id === args.id);

      return link;
    },
  },

  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };

      links.push(link);

      return link;
    },
    updateLink: (parent, args) => {
      const linkIdx = links.findIndex((item) => item.id === args.id);
      const link = links.splice(linkIdx, 1);
      const updatedLink = {
        ...link[0],
        description: args.description,
        url: args.url,
      };
      links.push(updatedLink);

      return updatedLink;
    },
    deleteLink: (parent, args) => {
      const linkIdx = links.findIndex((item) => item.id === args.id);
      const link = links.splice(linkIdx, 1);

      return { ...link[0] };
    },
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, 'schema.graphql'), 'utf8'),
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running at ${url}`));
