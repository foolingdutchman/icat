import type { Principal } from '@dfinity/agent';
export type CatInfo = CatInfo_2;
export interface CatInfo_2 {
  'thirsty' : bigint,
  'fighting' : bigint,
  'hungry' : bigint,
  'birthdate' : bigint,
  'name' : string,
  'happyness' : bigint,
  'last_drink' : bigint,
  'gender' : bigint,
  'last_feed' : bigint,
  'last_play' : bigint,
  'pregnancy' : bigint,
};
export type CatInfo_3 = CatInfo_2;
export interface Data { 'data' : Array<number>, 'info' : CatInfo_3 };
export type Nft = Nft_2;
export interface Nft_2 {
  'getData' : () => Promise<Data>,
  'getId' : () => Promise<bigint>,
  'getOwner' : () => Promise<Principal>,
  'transferOwner' : (arg_0: Principal) => Promise<undefined>,
};
export type Player = Player_2;
export interface Player_2 {
  'id' : UserId,
  'music' : bigint,
  'food' : bigint,
  'water' : bigint,
};
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
export type Result = { 'ok' : bigint } |
  { 'err' : string };
export type Result_2 = { 'ok' : Principal } |
  { 'err' : string };
export type Result_3 = { 'ok' : Nft } |
  { 'err' : string };
export interface Token {
  'airDrop' : (arg_0: string, arg_1: bigint) => Promise<boolean>,
  'allowance' : (arg_0: Principal, arg_1: Principal) => Promise<bigint>,
  'approve' : (arg_0: Principal, arg_1: bigint) => Promise<boolean>,
  'balanceOf' : (arg_0: Principal) => Promise<bigint>,
  'burn' : (arg_0: Principal, arg_1: bigint) => Promise<boolean>,
  'checkState' : () => Promise<Player>,
  'checkUserHasCat' : (arg_0: Principal) => Promise<boolean>,
  'createCatInfo' : (arg_0: Principal, arg_1: bigint) => Promise<CatInfo>,
  'createNewCat' : (arg_0: UserId_2, arg_1: bigint, arg_2: bigint) => Promise<
      Profile
    >,
  'decimals' : () => Promise<bigint>,
  'getAirdropLastRecord' : (arg_0: Principal) => Promise<[] | [bigint]>,
  'getICatInfo' : (arg_0: UserId_2) => Promise<[] | [Profile]>,
  'getNft' : (arg_0: Principal) => Promise<[] | [Nft]>,
  'getNftAddress' : (arg_0: bigint) => Promise<[] | [Principal]>,
  'getNftById' : (arg_0: bigint) => Promise<Result_3>,
  'getPrincipal' : (arg_0: string) => Promise<Principal>,
  'greet' : (arg_0: string) => Promise<string>,
  'logIn' : (arg_0: string, arg_1: string) => Promise<boolean>,
  'mint' : (arg_0: Principal, arg_1: bigint) => Promise<boolean>,
  'mintNft' : (arg_0: Array<number>, arg_1: CatInfo) => Promise<Result_2>,
  'modifyPassWord' : (arg_0: string, arg_1: string) => Promise<boolean>,
  'name' : () => Promise<string>,
  'owner' : () => Promise<Principal>,
  'recoverChip' : (arg_0: string, arg_1: bigint) => Promise<boolean>,
  'registerUser' : (arg_0: string, arg_1: string) => Promise<boolean>,
  'requestId' : () => Promise<Result>,
  'spawnCreator' : () => Promise<string>,
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