const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../utils');

const signup = async (parent, args, context, info) => {
  const password = await bcrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: { ...args, password },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const login = async (parent, args, context, info) => {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });

  if (!user) {
    throw new Error('No such user found');
  }

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
};

const post = async (parent, args, context, info) => {
  const { userId } = context;
  const newLink = await context.prisma.link.create({
    data: {
      url: args.url,
      description: args.description,
      postedBy: { connect: { id: userId } },
    },
  });

  context.pubsub.publish('NEW_LINK', newLink);

  return newLink;
};

const updateLink = async (parent, args, context, info) => {
  const { userId } = context;
  const updatedLink = await context.prisma.link.update({
    where: {
      id: Number(args.id),
    },
    data: {
      description: args.description,
      url: args.url,
      postedBy: { connect: { id: userId } },
    },
  });

  return updatedLink;
};

const deleteLink = async (parent, args, context, info) => {
  const link = context.prisma.link.delete({
    where: {
      id: Number(args.id),
    },
  });

  return link;
};

module.exports = {
  signup,
  login,
  post,
  updateLink,
  deleteLink,
};
