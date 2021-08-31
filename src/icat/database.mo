import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Option "mo:base/Option";
import Principal "mo:base/Principal";
import Types "./types";
import Order "mo:base/Order";
import Nft "nft";

module {
  type NewProfile = Types.NewProfile;
  type Player = Types.Player;
  type Profile = Types.Profile;
  type UserId = Types.UserId;
   
  public class Directory() {
    // The "database" is just a local hash map
    let hashMap = HashMap.HashMap<UserId, Profile>(1, isEq, Principal.hash);
    let players = HashMap.HashMap<UserId, Player>(1, isEq, Principal.hash);
  
    public func createOne(userId: UserId, profile: NewProfile) {
      hashMap.put(userId, makeProfile(userId, profile));
    };

    public func updateOne(userId: UserId, profile: Profile) {
      hashMap.put(userId, profile);
    };

    public func findOne(userId: UserId): ? Profile {
      hashMap.get(userId)
    };

    public func findMany(userIds: [UserId]): [Profile] {
      func getProfile(userId: UserId): Profile {
        Option.unwrap<Profile>(hashMap.get(userId))
      };
      Array.map<UserId, Profile>(userIds, getProfile)
    };

    public func findBy(term: Text): [Profile] {
      var profiles: [Profile] = [];
      for ((id, profile) in hashMap.entries()) {
        let fullName = profile.name;
        if (includesText(fullName, term)) {
          profiles := Array.append<Profile>(profiles, [profile]);
        };
      };
      profiles
    };

    // database for players
    public func createPlayer(userId: UserId)  : Player{
      let player = makePlayer(userId);
      players.put(userId, player);
      return player;
    };

    public func updatePlayer(userId: UserId, player: Player) {
      players.put(userId, player);
    };

    public func findPlayer(userId: UserId): ? Player {
      players.get(userId)
    };

    public func findPlayers(userIds: [UserId]): [Player] {
      func getPlayer(userId: UserId): Player {
        Option.unwrap<Player>(players.get(userId))
      };
      Array.map<UserId, Player>(userIds, getPlayer)
    };

    func makePlayer(userId: UserId ): Player {
      {
        id = userId;
        water = 0;
        food = 0;
        music = 0;
      }
    };

    

    // Helpers

    func makeProfile(userId: UserId, profile: NewProfile): Profile {
      {
        id = userId;
        name = profile.name;
        gender = profile.gender;
        birthdate = profile.birthdate;
        hungry = profile.hungry;
        thirsty = profile.thirsty;
        happyness = profile.happyness;  
        food =profile.food;
        water =profile.water;
        music =profile.music;
        last_drink=profile.last_drink;
        last_feed=profile.last_feed;
        last_play=profile.last_play;
        imgUrl = profile.imgUrl;
        fighting= profile.fighting;
        pregnancy= profile.pregnancy;
      }
    };

    
    func includesText(string: Text, term: Text): Bool {
      let stringArray = Iter.toArray<Char>(string.chars());
      let termArray = Iter.toArray<Char>(term.chars());

      var i = 0;
      var j = 0;

      while (i < stringArray.size() and j < termArray.size()) {
        if (stringArray[i] == termArray[j]) {
          i += 1;
          j += 1;
          if (j == termArray.size()) { return true; }
        } else {
          i += 1;
          j := 0;
        }
      };
      false
    };
  };

  func isEq(x: UserId, y: UserId): Bool { x == y };


  
  // sort data 

  /*

  func mergeSort(arr : [Profile]): [Profile]{
    var temp : [Profile] = [];
    internalMergeSort(arr, temp, 0, arr.size()-1);

    return arr;
  };

  func internalMergeSort ( arr : [Profile], temp : [Profile], left : Nat, right : Nat ){
    if(left < right ) {
        let middle : Nat = (left+right)/2;
        internalMergeSort(arr, temp, left, middle);         
        internalMergeSort(arr, temp, middle+1, right);       
        mergeSortedArray(arr, temp, left, middle, right);  
    }
  };

  func mergeSortedArray( arr : [Profile], temp : [Profile], left : Nat, middle : Nat, right : Nat){
    let i : Nat =left;      
    let j : Nat = middle+1;
    let k : Nat =0;
    while (i<=middle and j<=right){
      if(arr[i].fighting <= arr[j].fighting) {
       temp[k] := arr[i];
       k += 1;
       i += 1;
      }else{
       temp[k] := arr[j];
        k += 1;
        j += 1;
      }
    };
    while (i <=middle){
        temp[k] := arr[i];
        k += 1;
        i += 1;
    };
    while ( j<=right){
        temp[k] := arr[j];
        k += 1;
        j += 1;
    };
    i := 0;
    while (i < k){
     arr[left+i] := temp[i];
     i += 1;
    };

};

*/


};
