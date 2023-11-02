'use client';
import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [counter, setCounter] = useState<number>(1);

  useEffect(() => {
    const timeout = setTimeout(() => setCounter((prev) => prev + 1), 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [counter]);
  return (
    <div className='flex justify-center items-center flex-col h-screen gap-6'>
      <div>Counter :{counter}</div>
      <Button variant='default' onClick={() => setCounter((prev) => prev + 1)}>
        Add
      </Button>
      <Button
        onClick={() => setCounter((prev) => (prev === 0 ? prev : prev - 1))}
      >
        Minus
      </Button>
    </div>
  );
};

export default App;
