"use client";

import { api } from "../../../trpc/react";

export const DeployedWalletsList = ({ userId }: { userId?: string }) => {
  const { data: wallets, isLoading } = api.wallet.getAll.useQuery(undefined, {
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <div className="text-xs text-gray-500 animate-pulse">
        Loading wallets...
      </div>
    );
  }

  if (!wallets || wallets.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-gray-300">Deployed Wallets</h3>
      <div className="space-y-2">
        {wallets.map((wallet) => (
          <div
            key={wallet.address}
            className="rounded bg-black/40 p-2 border border-gray-800 flex justify-between items-center"
          >
            <div>
              <p className="font-mono text-xs text-gray-300">
                {wallet.address}
              </p>
              <p className="text-[10px] text-gray-500">Salt: {wallet.salt}</p>
            </div>
            <div
              className={`h-2 w-2 rounded-full ${
                wallet.isDeployed
                  ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"
                  : "bg-gray-500"
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
