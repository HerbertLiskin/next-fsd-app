'use client';

import { useUnit } from 'effector-react';
import { $counter, increment, decrement } from '../model/counter';

export const Counter = () => {
  const [count, inc, dec] = useUnit([$counter, increment, decrement]);

  return (
    <div className="p-6 bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-brand-secondary/20">
      <h3 className="text-xl font-bold mb-4 text-brand-primary">Effector Counter</h3>
      <div className="flex items-center gap-6">
        <button 
          onClick={() => dec()} 
          className="px-4 py-2 bg-brand-secondary/10 text-brand-secondary hover:bg-brand-secondary/20 rounded-lg transition-colors font-bold"
        >
          -
        </button>
        <span className="text-3xl font-mono text-brand-tertiary tabular-nums min-w-[2ch] text-center">
          {count}
        </span>
        <button 
          onClick={() => inc()} 
          className="px-4 py-2 bg-brand-primary text-white hover:bg-brand-primary/90 rounded-lg transition-colors font-bold shadow-lg shadow-brand-primary/30"
        >
          +
        </button>
      </div>
    </div>
  );
};
