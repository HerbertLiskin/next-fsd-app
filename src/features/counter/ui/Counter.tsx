'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'

export const Counter = () => {
  const queryClient = useQueryClient()

  const { data: count } = useQuery({
    queryKey: ['counter'],
    queryFn: () => 0,
    initialData: 0,
    staleTime: Infinity,
  })

  const inc = () => {
    queryClient.setQueryData(
      ['counter'],
      (oldData: number) => (oldData ?? 0) + 1
    )
  }

  const dec = () => {
    queryClient.setQueryData(
      ['counter'],
      (oldData: number) => (oldData ?? 0) - 1
    )
  }

  return (
    <div className="border-brand-secondary/20 rounded-xl border bg-white p-6 shadow-sm dark:bg-neutral-900">
      <h3 className="text-brand-primary mb-4 text-xl font-bold">
        React Query Counter
      </h3>
      <div className="flex items-center gap-6">
        <button
          onClick={() => dec()}
          className="bg-brand-secondary/10 text-brand-secondary hover:bg-brand-secondary/20 rounded-lg px-4 py-2 font-bold transition-colors"
        >
          -
        </button>
        <span className="text-brand-tertiary min-w-[2ch] text-center font-mono text-3xl tabular-nums">
          {count}
        </span>
        <button
          onClick={() => inc()}
          className="bg-brand-primary hover:bg-brand-primary/90 shadow-brand-primary/30 rounded-lg px-4 py-2 font-bold text-white shadow-lg transition-colors"
        >
          +
        </button>
      </div>
    </div>
  )
}
