import React from 'react';
import { useQuery, useAction, Link, getStrategies, deleteStrategy } from 'wasp/client/operations';

const DashboardPage = () => {
  const { data: strategies, isLoading, error } = useQuery(getStrategies);
  const deleteStrategyFn = useAction(deleteStrategy);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {strategies.map((strategy) => (
        <div key={strategy.id} className='flex items-center justify-between bg-gray-100 p-4 mb-4 rounded-lg'>
          <div>{strategy.description}</div>
          <div>
            <button
              onClick={() => deleteStrategyFn({ strategyId: strategy.id })}
              className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
            >
              Delete
            </button>
            <Link
              to={`/strategy/${strategy.id}`}
              className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded ml-2'
            >
              Details
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardPage;