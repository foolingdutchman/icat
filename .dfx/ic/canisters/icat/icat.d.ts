import type { Principal } from '@dfinity/agent';
export type Profile = Profile_2;
export interface Profile_2 {
  'id' : UserId,
  'imgUrl' : string,
  'music' : bigint,
  'thirsty' : bigint,
  'fighting' : bigint,
  'hungry' : bigint,
  'birthdate' : bigint,
  'food' : bigint,
  'name' : string,
  'happyness' : bigint,
  'last_drink' : bigint,
  'gender' : bigint,
  'last_feed' : bigint,
  'last_play' : bigint,
  'water' : bigint,
  'pregnancy' : bigint,
};
export interface Token {
  'airDrop' : (arg_0: string, arg_1: bigint) => Promise<boolean>,
  'allowance' : (arg_0: Principal, arg_1: Principal) => Promise<bigint>,
  'approve' : (arg_0: Principal, arg_1: bigint) => Promise<boolean>,
  'balanceOf' : (arg_0: Principal) => Promise<bigint>,
  'balanceOfFromtr' : (arg_0: string) => Promise<bigint>,
  'burn' : (arg_0: Principal, arg_1: bigint) => Promise<boolean>,
  'createNewCat' : (arg_0: UserId_2, arg_1: bigint, arg_2: bigint) => Promise<
      Profile
    >,
  'decimals' : () => Promise<bigint>,
  'getAirdropLastRecord' : (arg_0: Principal) => Promise<[] | [bigint]>,
  'getICatInfo' : (arg_0: UserId_2) => Promise<[] | [Profile]>,
  'getPrincipal' : (arg_0: string) => Promise<Principal>,
  'greet' : (arg_0: string) => Promise<string>,
  'logIn' : (arg_0: string, arg_1: string) => Promise<boolean>,
  'mint' : (arg_0: Principal, arg_1: bigint) => Promise<boolean>,
  'modifyPassWord' : (arg_0: string, arg_1: string) => Promise<boolean>,
  'name' : () => Promise<string>,
  'owner' : () => Promise<Principal>,
  'recoverChip' : (arg_0: string, arg_1: bigint) => Promise<boolean>,
  'registerUser' : (arg_0: string, arg_1: string) => Promise<boolean>,
  'symbol' : () => Promise<string>,
  'totalSupply' : () => Promise<bigint>,
  'transfer' : (arg_0: Principal, arg_1: bigint) => Promise<boolean>,
  'transferFrom' : (
      arg_0: Principal,
      arg_1: Principal,
      arg_2: bigint,
    ) => Promise<boolean>,
  'updateAirDropRecord' : (arg_0: Principal, arg_1: bigint) => Promise<boolean>,
  'updateProfile' : (arg_0: Profile) => Promise<boolean>,
};
export type UserId = Principal;
export type UserId_2 = UserId;
export default Token;