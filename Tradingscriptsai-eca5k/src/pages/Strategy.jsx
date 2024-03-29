import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useAction, getStrategy, updateStrategy } from 'wasp/client/operations';

const StrategyPage = () => {
  const { strategyId } = useParams();
  const { data: strategy, isLoading, error } = useQuery(getStrategy, { id: strategyId });
  const updateStrategyFn = useAction(updateStrategy);
  const [newDescription, setNewDescription] = useState('');
  const [newScript, setNewScript] = useState('');

  useEffect(() => {
    if (strategy) {
      setNewDescription(strategy.description);
      setNewScript(strategy.script);
    }
  }, [strategy]);

  const handleUpdateStrategy = () => {
    updateStrategyFn({ id: strategyId, description: newDescription, script: newScript });
  };

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Strategy: {strategyId}</h1>
      <div className='mb-4'>
        <label htmlFor='description' className='block font-bold mb-1'>Description:</label>
        <input type='text' id='description' className='border p-1 mb-2 w-full' value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
      </div>
      <div className='mb-4'>
        <label htmlFor='script' className='block font-bold mb-1'>Script:</label>
        <textarea id='script' className='border p-1 mb-2 w-full h-32' value={newScript} onChange={(e) => setNewScript(e.target.value)} />
      </div>
      <button onClick={handleUpdateStrategy} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Update Strategy</button>
      <Link to={`/strategy/${strategyId}`} className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4'>Cancel</Link>
    </div>
  );
}

export default StrategyPage;