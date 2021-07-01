export default ({ IDL }) => {
  const UserId = IDL.Principal;
  const UserId_2 = UserId;
  const Profile_2 = IDL.Record({
    'id' : UserId,
    'imgUrl' : IDL.Text,
    'music' : IDL.Nat,
    'thirsty' : IDL.Nat,
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
  });
  const Profile = Profile_2;
  const Token = IDL.Service({
    'airDrop' : IDL.Func([IDL.Text, IDL.Nat], [IDL.Bool], []),
    'allowance' : IDL.Func(
        [IDL.Principal, IDL.Principal],
        [IDL.Nat],
        ['query'],
      ),
    'approve' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
    'balanceOf' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'balanceOfFromtr' : IDL.Func([IDL.Text], [IDL.Nat], ['query']),
    'burn' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
    'createNewCat' : IDL.Func([UserId_2, IDL.Nat], [Profile], []),
    'decimals' : IDL.Func([], [IDL.Nat], ['query']),
    'getAirdropLastRecord' : IDL.Func([IDL.Principal], [IDL.Opt(IDL.Nat)], []),
    'getICatInfo' : IDL.Func([UserId_2], [IDL.Opt(Profile)], []),
    'getPrincipal' : IDL.Func([IDL.Text], [IDL.Principal], []),
    'greet' : IDL.Func([IDL.Text], [IDL.Text], []),
    'logIn' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'mint' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
    'modifyPassWord' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'name' : IDL.Func([], [IDL.Text], ['query']),
    'owner' : IDL.Func([], [IDL.Principal], ['query']),
    'recoverChip' : IDL.Func([IDL.Text, IDL.Nat], [IDL.Bool], []),
    'registerUser' : IDL.Func([IDL.Text, IDL.Text], [IDL.Bool], []),
    'symbol' : IDL.Func([], [IDL.Text], ['query']),
    'totalSupply' : IDL.Func([], [IDL.Nat], ['query']),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
    'transferFrom' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Nat],
        [IDL.Bool],
        [],
      ),
    'updateAirDropRecord' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Bool], []),
    'updateProfile' : IDL.Func([Profile], [IDL.Bool], []),
  });
  return Token;
};
export const init = ({ IDL }) => {
  return [IDL.Text, IDL.Text, IDL.Nat, IDL.Nat, IDL.Principal];
};