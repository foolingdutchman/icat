export default ({ IDL }) => {
  const UserId = IDL.Principal;
  const Player_2 = IDL.Record({
    'id' : UserId,
    'music' : IDL.Nat,
    'food' : IDL.Nat,
    'water' : IDL.Nat,
  });
  const Player = Player_2;
  const CatInfo_2 = IDL.Record({
    'thirsty' : IDL.Nat,
    'fighting' : IDL.Nat,
    'hungry' : IDL.Nat,
    'birthdate' : IDL.Nat,
    'name' : IDL.Text,
    'happyness' : IDL.Nat,
    'last_drink' : IDL.Nat,
    'gender' : IDL.Nat,
    'last_feed' : IDL.Nat,
    'last_play' : IDL.Nat,
    'pregnancy' : IDL.Nat,
  });
  const CatInfo = CatInfo_2;
  const UserId_2 = UserId;
  const Profile_2 = IDL.Record({
    'id' : UserId,
    'imgUrl' : IDL.Text,
    'music' : IDL.Nat,
    'thirsty' : IDL.Nat,
    'fighting' : IDL.Nat,
    'hungry' : IDL.Nat,
    'birthdate' : IDL.Nat,
    'food' : IDL.Nat,
    'name' : IDL.Text,
    'happyness' : IDL.Nat,
    'last_drink' : IDL.Nat,
    'gender' : IDL.Nat,
    'last_feed' : IDL.Nat,
    'last_play' : IDL.Nat,
    'water' : IDL.Nat,
    'pregnancy' : IDL.Nat,
  });
  const Profile = Profile_2;
  const CatInfo_3 = CatInfo_2;
  const Data = IDL.Record({ 'data' : IDL.Vec(IDL.Nat8), 'info' : CatInfo_3 });
  const Nft_2 = IDL.Service({
    'getData' : IDL.Func([], [Data], ['query']),
    'getId' : IDL.Func([], [IDL.Nat], ['query']),
    'getOwner' : IDL.Func([], [IDL.Principal], ['query']),
    'transferOwner' : IDL.Func([IDL.Principal], [], []),
  });
  const Nft = Nft_2;
  const Result_3 = IDL.Variant({ 'ok' : Nft, 'err' : IDL.Text });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Principal, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : IDL.Nat, 'err' : IDL.Text });
  const Token = IDL.Service({
    'airDrop' : IDL.Func([IDL.Text, IDL.Nat], [IDL.Bool], []),
    'allowance' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [IDL.Nat],
        ['query'],
      ),
    'approve' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'burn' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
    'checkState' : IDL.Func([], [Player], []),
    'checkUserHasCat' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'createCatInfo' : IDL.Func(
        [IDL.Principal, IDL.Nat, IDL.Nat],
        [CatInfo],
        [],
      ),
    'createNewCat' : IDL.Func([UserId_2, IDL.Nat, IDL.Nat], [Profile], []),
    'createPlayer' : IDL.Func([], [Player], []),
    'createPlayerFromFront' : IDL.Func([IDL.Principal], [Player], []),
    'decimals' : IDL.Func([], [IDL.Nat], ['query']),
    'findPlayer' : IDL.Func([IDL.Principal], [IDL.Opt(Player)], []),
    'getAirdropLastRecord' : IDL.Func([IDL.Principal], [IDL.Opt(IDL.Nat)], []),
    'getICatInfo' : IDL.Func([UserId_2], [IDL.Opt(Profile)], []),
    'getNft' : IDL.Func([IDL.Principal], [IDL.Opt(Nft)], ['query']),
    'getNftAddress' : IDL.Func([IDL.Nat], [IDL.Opt(IDL.Principal)], ['query']),
    'getNftById' : IDL.Func([IDL.Nat], [Result_3], ['query']),
    'getPrincipal' : IDL.Func([IDL.Text], [IDL.Principal], []),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], []),
    'logIn' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'mint' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
    'mintNft' : IDL.Func([IDL.Vec(IDL.Nat8), CatInfo], [Result_2], []),
    'mintNftByFront' : IDL.Func(
        [IDL.Vec(IDL.Nat8), CatInfo, IDL.Principal],
        [Result_2],
        [],
      ),
    'modifyPassWord' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'owner' : IDL.Func([], [IDL.Principal], ['query']),
    'recoverChip' : IDL.Func([IDL.Text, IDL.Nat], [IDL.Bool], []),
    'registerUser' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'requestId' : IDL.Func([], [Result], []),
    'spawnCreator' : IDL.Func([], [IDL.Text], []),
    'symbol' : IDL.Func([], [IDL.Text], ['query']),
    'testCall' : IDL.Func([], [IDL.Text], []),
    'totalSupply' : IDL.Func([], [IDL.Nat], ['query']),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
    'transferFrom' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat],
        [IDL.Bool],
        [],
      ),
    'updateAirDropRecord' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
    'updatePlayer' : IDL.Func([Player], [], ['oneway']),
    'updateProfile' : IDL.Func([Profile], [IDL.Bool], []),
  });
  return Token;
};
export const init = ({ IDL }) => {
  return [IDL.Text, IDL.Text, IDL.Nat, IDL.Nat, IDL.Principal];
};