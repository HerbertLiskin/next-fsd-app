"use client";

import { useState } from "react";
import { useSmartWallet } from "../model/useSmartWallet";

export const SmartWalletSection = ({ userId }: { userId?: string }) => {
  const [salt, setSalt] = useState(0);
  const { address, createWallet, isDeploying, isCreated, error } =
    useSmartWallet(userId, salt);

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-bold text-gray-300">
        Smart Wallet (ZeroDev)
      </h3>

      {address ? (
        <div className="rounded bg-gray-800 p-3 border border-gray-700">
          <p className="text-xs text-gray-400">
            Predicted Address (Salt: {salt})
          </p>
          <p className="font-mono text-xs break-all mb-2 text-white">
            {address}
          </p>
          {isCreated && (
            <span className="text-xs text-green-400 font-bold bg-green-900/30 px-2 py-1 rounded">
              ✓ Deployed
            </span>
          )}
        </div>
      ) : (
        <p className="text-sm text-gray-400">Calculating address...</p>
      )}

      {error && <p className="text-red-400 text-xs">{error}</p>}

      <button
        onClick={createWallet}
        disabled={isCreated || isDeploying || !address}
        className="w-full rounded bg-blue-600 px-3 py-2 text-sm text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isDeploying
          ? "Deploying..."
          : isCreated
            ? "Wallet Active"
            : "Create Wallet"}
      </button>

      {isCreated && (
        <div className="border-t border-gray-700 pt-3 mt-3">
          <p className="mb-2 text-xs text-gray-400">Want another wallet?</p>
          <button
            onClick={() => setSalt((s) => s + 1)}
            className="w-full rounded border border-gray-600 px-3 py-2 text-sm text-gray-300 hover:bg-gray-800 transition-colors"
          >
            Generate New (Salt {salt + 1})
          </button>
        </div>
      )}
    </div>
  );
};
