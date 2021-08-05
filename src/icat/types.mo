import Principal "mo:base/Principal";

module {
  public type UserId = Principal;

  public type NewProfile = {
    name: Text;
    gender: Nat;
    birthdate: Nat;
    hungry: Nat;
    thirsty: Nat;
    happyness:Nat;
    water: Nat;
    food: Nat;
    music: Nat;
    last_drink: Nat;
    last_feed: Nat;
    last_play: Nat;
    imgUrl: Text;
    fighting: Nat;
    pregnancy: Nat;
  };

  public type Profile = {
    id: UserId;
    name: Text;
    gender: Nat;
    birthdate: Nat;
    hungry: Nat;
    thirsty: Nat;
    happyness:Nat;
    water: Nat;
    food: Nat;
    music: Nat;
    last_drink: Nat;
    last_feed: Nat;
    last_play: Nat;
    imgUrl: Text;
    fighting: Nat;
    pregnancy: Nat;
  };

  public type Player = {
   id: UserId ;
   water: Nat;
   food: Nat;
   music: Nat;
  };

  public type CatInfo ={
    name: Text;
    gender: Nat;
    birthdate: Nat;
    hungry: Nat;
    thirsty: Nat;
    happyness:Nat;
    last_drink: Nat;
    last_feed: Nat;
    last_play: Nat;
    fighting: Nat;
    pregnancy: Nat;
  };

};


