"use client";

import { useAppKit } from "@reown/appkit/react";
import { useAccount, useSignMessage } from "wagmi";
import { api } from "../../../trpc/react";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthWidget = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const utils = api.useUtils();

  const { data: user, isLoading: isUserLoading } = api.profile.me.useQuery(
    undefined,
    {
      retry: false,
      enabled: isConnected,
    }
  );

  const loginMutation = api.auth.login.useMutation({
    onSuccess: (data) => {
      if (data.token) {
        Cookies.set("auth-token", data.token, { expires: 7, path: '/' }); 
      }
      utils.profile.me.invalidate();
    },
  });
  
  const logoutMutation = api.auth.logout.useMutation({
    onSuccess: () => {
      Cookies.remove("auth-token");
      utils.profile.me.invalidate();
    }
  });

  const handleLogin = async () => {
    if (!isConnected || !address) {
      open();
      return;
    }

    try {
      const message = `Login to Next FSD App\nTimestamp: ${Date.now()}`;
      const signature = await signMessageAsync({ message });

      await loginMutation.mutateAsync({
        address,
        signature,
        message,
      });
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  if (isUserLoading) return <div>Loading session...</div>;

  if (user) {
    return (
      <div className="flex gap-4 items-center p-4 border rounded-lg">
        <div>
          <p className="font-bold">Welcome, {user.name || "User"}</p>
          {user.address && <p className="text-xs text-gray-500">{user.address}</p>}
        </div>
        <button
            onClick={() => logoutMutation.mutate()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
            Logout
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 border rounded-lg text-center">
      <p className="mb-4">Connect your wallet to sign in</p>
      {isConnected ? (
        <button
          onClick={handleLogin}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loginMutation.isPending}
        >
          {loginMutation.isPending ? "Signing in..." : "Sign In with Wallet"}
        </button>
      ) : (
        <button
          onClick={() => open()}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Connect Wallet
        </button>
      )}
    </div>
  );
};
