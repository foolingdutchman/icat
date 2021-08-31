import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client";

import {
  idlFactory as icat_idl,
  canisterId as icat_id,
} from "dfx-generated/icat";

const IDENTITY_URL =
  "http://localhost:8000?canisterId=rkp4c-7iaaa-aaaaa-aaaca-cai";

export const createActor = (identity) => {
  const actor = Actor.createActor(icat_idl, {
    agent: new HttpAgent({ identity }),
    canisterId: icat_id,
  });
  return actor;
};

export const initAuthClient = async () => {
  const authClient = await AuthClient.create();
  await authClient.isAuthenticated();
  return authClient;
};

export const identityLogIn = async (handler, resolve) => {
  let authClient = await initAuthClient();
  await authClient.login({
    identityProvider: IDENTITY_URL,
    onSuccess: async () => {
      await resolve(authClient.getIdentity(), handler);
    },
  });
};
