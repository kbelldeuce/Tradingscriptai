import { HttpError } from 'wasp/server'

export const getStrategies = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  return context.entities.Strategy.findMany({
    where: { userId: context.user.id }
  });
}

export const getStrategy = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };
  const strategy = await context.entities.Strategy.findUnique({
    where: { id: args.id },
  });
  if (!strategy) { throw new HttpError(404, 'No strategy with id ' + args.id) };
  if (strategy.userId !== context.user.id) { throw new HttpError(400, 'Strategy does not belong to the authenticated user') };
  return strategy;
}