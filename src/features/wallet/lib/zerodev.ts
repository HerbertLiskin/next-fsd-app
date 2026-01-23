import {
  createKernelAccount,
  createKernelAccountClient,
  createZeroDevPaymasterClient,
  type KernelAccountClient,
  type KernelSmartAccount,
} from "@zerodev/sdk";
import { getEntryPoint } from "@zerodev/sdk/constants";
import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
import { http, createPublicClient, keccak256, stringToBytes } from "viem";
import { sepolia } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

// Use the helper to get the typed EntryPoint object which carries version info
const entryPoint = getEntryPoint("0.7");

const PROJECT_ID =
  process.env.NEXT_PUBLIC_ZERODEV_PROJECT_ID ||
  "c074be99-4458-4796-98a9-4a0d9df57288";
const CHAIN = sepolia;

export const publicClient = createPublicClient({
  chain: CHAIN,
  transport: http(),
});

// Deterministic signer based on userId and salt
const getDeterministicSigner = (userId: string, index: number) => {
  // Create a unique seed for this user + salt
  // We use the userId (e.g. from Google) and the index to create a unique string
  const input = `${userId}:${index}`;

  // Hash it to get a 32-byte hex string which serves as a Private Key
  const privateKey = keccak256(stringToBytes(input));

  return privateKeyToAccount(privateKey);
};

export const createSmartWallet = async (
  userId: string,
  index: number,
): Promise<{
  account: KernelSmartAccount<typeof entryPoint>;
  client: KernelAccountClient<typeof entryPoint>;
} | null> => {
  const signer = getDeterministicSigner(userId, index);
  if (!signer) return null;

  const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
    signer,
    entryPoint,
    kernelVersion: "0.3.1",
  });

  // @ts-expect-error - types might mismatch slightly between packages but this is the correct usage
  const account = await createKernelAccount(publicClient, {
    plugins: {
      sudo: ecdsaValidator,
    },
    entryPoint,
    kernelVersion: "0.3.1",
    index: BigInt(index),
  });

  const bundlerUrl = `https://rpc.zerodev.app/api/v3/${PROJECT_ID}/chain/${CHAIN.id}`;

  const client = createKernelAccountClient({
    account,
    chain: CHAIN,
    bundlerTransport: http(bundlerUrl),
    paymaster: {
      getPaymasterData: async (userOperation) => {
        const paymasterClient = createZeroDevPaymasterClient({
          chain: CHAIN,
          transport: http(bundlerUrl),
        });
        // @ts-expect-error - userOperation type mismatch
        return paymasterClient.sponsorUserOperation({ userOperation });
      },
    },
  });

  return { account, client };
};
