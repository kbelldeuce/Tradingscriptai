import { HttpError } from 'wasp/server'

export const createStrategy = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  return context.entities.Strategy.create({
    data: {
      description: args.description,
      script: args.script,
      user: { connect: { id: context.user.id } }
    }
  });
}

export const updateStrategy = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const strategy = await context.entities.Strategy.findUnique({
    where: { id: args.id }
  });
  if (strategy.userId !== context.user.id) { throw new HttpError(403) };

  return context.entities.Strategy.update({
    where: { id: args.id },
    data: { description: args.description, script: args.script }
  });
}

export const deleteStrategy = async ({ strategyId }, context) => {
  if (!context.user) { throw new HttpError(401) };
  const strategy = await context.entities.Strategy.findUnique({
    where: { id: strategyId }
  });
  if (strategy.userId !== context.user.id) { throw new HttpError(403) };
  await context.entities.Strategy.delete({
    where: { id: strategyId }
  });
}