import React, { useState } from 'react';
import { useAction, createStrategy } from 'wasp/client/operations';
import { Link } from 'react-router-dom';

const NewStrategyPage = () => {
  const [description, setDescription] = useState('');
  const [script, setScript] = useState('');
  const createStrategyFn = useAction(createStrategy);

  const handleCreateStrategy = () => {
    createStrategyFn({ description, script });
    setDescription('');
    setScript('');
  };

  return (
    <div className='p-4'>
      <input
        type='text'
        placeholder='Description'
        className='px-1 py-2 border rounded text-lg mb-4'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <textarea
        placeholder='Pine Script'
        className='px-1 py-2 border rounded text-lg mb-4'
        value={script}
        onChange={(e) => setScript(e.target.value)}
      />
      <button
        onClick={handleCreateStrategy}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
      >
        Create Strategy
      </button>
    </div>
  );
}

export default NewStrategyPage;