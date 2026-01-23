import { useState, useEffect } from "react";
import { createSmartWallet, publicClient } from "../lib/zerodev";
import { type Address } from "viem";
import { api } from "../../../trpc/react";

export const useSmartWallet = (userId: string | undefined, salt: number) => {
  const [address, setAddress] = useState<Address | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const utils = api.useUtils();
  const createWalletMutation = api.wallet.create.useMutation({
    onSuccess: () => {
      utils.wallet.getAll.invalidate();
    },
  });

  useEffect(() => {
    let mounted = true;

    const loadWallet = async () => {
      if (!userId) return;

      try {
        setError(null);
        // Pass userId to createSmartWallet
        const wallet = await createSmartWallet(userId, salt);
        if (wallet && mounted) {
          setAddress(wallet.account.address);

          // Check if already deployed
          const code = await publicClient.getBytecode({
            address: wallet.account.address,
          });
          if (code) {
            setIsCreated(true);
            createWalletMutation.mutate({
              address: wallet.account.address,
              salt,
              isDeployed: true,
            });
          } else {
            setIsCreated(false);
            createWalletMutation.mutate({
              address: wallet.account.address,
              salt,
              isDeployed: false,
            });
          }
        }
      } catch (err: unknown) {
        console.error(err);
        const message = err instanceof Error ? err.message : String(err);
        if (mounted) setError(message || "Failed to load wallet");
      }
    };

    loadWallet();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, salt]);

  const createWallet = async () => {
    if (!userId) return; // Guard
    setIsDeploying(true);
    try {
      const wallet = await createSmartWallet(userId, salt);
      if (!wallet) throw new Error("No wallet");

      // To "Deploy", we usually need to send a transaction.
      // ZeroDev/ERC-4337 accounts are lazy-deployed on first UserOp.
      // We will send a dummy transaction (send 0 ETH to self) to force deployment.

      const hash = await wallet.client.sendTransaction({
        account: wallet.account,
        to: wallet.account.address,
        value: BigInt(0),
        data: "0x",
      });

      console.log("Deploy transaction hash:", hash);
      setIsCreated(true);
      createWalletMutation.mutate({
        address: wallet.account.address,
        salt,
        isDeployed: true,
      });
      // In real app, wait for receipt
    } catch (err: unknown) {
      console.error(err);
      const message = err instanceof Error ? err.message : String(err);
      setError(message || "Failed to deploy");
    } finally {
      setIsDeploying(false);
    }
  };

  return {
    address,
    isDeploying,
    createWallet,
    error,
    isCreated,
  };
};
