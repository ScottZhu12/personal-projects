const _ = require('lodash');
const { buildSchema } = require('graphql');

const users = [
  { id: '23', firstName: 'Bill', age: 20 },
  { id: '47', firstName: 'Samantha', age: 21 },
];

const coursesData = [
  {
    id: 1,
    title: 'The Complete Node.js Developer Course',
    author: 'Andrew Mead, Rob Percival',
    description:
      'Learn Node.js by building real-world applications with Node, Express, MongoDB, Mocha, and more!',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs/',
  },
  {
    id: 2,
    title: 'Node.js, Express & MongoDB Dev to Deployment',
    author: 'Brad Traversy',
    description:
      'Learn by example building & deploying real-world Node.js applications from absolute scratch',
    topic: 'Node.js',
    url: 'https://codingthesmartway.com/courses/nodejs-express-mongodb/',
  },
  {
    id: 3,
    title: 'JavaScript: Understanding The Weird Parts',
    author: 'Anthony Alicea',
    description:
      'An advanced JavaScript course for everyone! Scope, closures, prototypes, this, build your own framework, and more.',
    topic: 'JavaScript',
    url: 'https://codingthesmartway.com/courses/understand-javascript/',
  },
];

// GraphQL schema
const schema = buildSchema(`
  type Query {
    course(id: Int!): Course
    courses(topic: String): [Course]
  },
  type Course {
    id: Int
    title: String
    author: String
    description: String
    topic: String
    url: String
  }
`);

const getCourse = (args) => {
  const id = args.id;
  const foundCourse = _.find(coursesData, (course) => {
    return course.id === id;
  });

  return foundCourse;
};

const getCourses = (args) => {
  if (!args.topic) {
    return coursesData;
  }

  const topic = args.topic;
  return coursesData.filter((course) => course.topic === topic);
};

// root resolver
const root = {
  course: getCourse,
  courses: getCourses,
};

module.exports = { schema, root };
