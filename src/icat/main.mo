import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Hash "mo:base/Hash";
import Nat "mo:base/Nat";
import Database "./database";
import Types "./types";
import Utils "./utils";
import Random "mo:base/Random";
import Result "mo:base/Result";
import Nft "nft";


actor class Token(_name: Text, _symbol: Text, _decimals: Nat, _totalSupply: Nat, _owner: Principal) {
    private stable var owner_ : Principal = _owner;
    private stable let name_ : Text = _name;
    private stable let decimals_ : Nat = _decimals;
    private stable let symbol_ : Text = _symbol;
    private stable var totalSupply_ : Nat = _totalSupply;

    private var balances =  HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
    private var allowances = HashMap.HashMap<Principal, HashMap.HashMap<Principal, Nat>>(1, Principal.equal, Principal.hash);
    private var players = HashMap.HashMap<Principal,Text>(1,Principal.equal,Principal.hash);
    private var airDropList = HashMap.HashMap<Principal,Nat>(1,Principal.equal,Principal.hash);
    balances.put(owner_, totalSupply_);
    
    var directory: Database.Directory = Database.Directory();
    type NewProfile = Types.NewProfile;
    type Profile = Types.Profile;
    type UserId = Types.UserId;
    type CatInfo =Types.CatInfo;
    type Player = Types.Player;

    var nftDataMap : HashMap.HashMap<Principal, Nft.Nft> = HashMap.HashMap<Principal, Nft.Nft>(0, Principal.equal, Principal.hash);
    var creatorMap :HashMap.HashMap<Principal,HashMap.HashMap<Nat,Principal>> =HashMap.HashMap<Principal,HashMap.HashMap<Nat,Principal>> (0,Principal.equal,Principal.hash);
    var nftMap : HashMap.HashMap<Nat,Principal> = HashMap.HashMap<Nat, Principal>(0, Nat.equal, Hash.hash);

    var idCounter : Nat = 0;

    /// Transfers value amount of tokens to Principal to.
    public shared(msg) func transfer(to: Principal, value: Nat) : async Bool {
        Debug.print (Principal.toText(msg.caller)); 
        switch (balances.get(msg.caller)) {
            case (?from_balance) {
                if (from_balance >= value) {
                    var from_balance_new = from_balance - value;
                    assert(from_balance_new <= from_balance);
                    balances.put(msg.caller, from_balance_new);

                    var to_balance_new = switch (balances.get(to)) {
                        case (?to_balance) {
                            to_balance + value;
                        };
                        case (_) {
                            value;
                        };
                    };
                    assert(to_balance_new >= value);
                    balances.put(to, to_balance_new);
                    return true;
                } else {
                     Debug.print (Principal.toText(msg.caller));
                    return false;
                };
            };
            case (_) {
                Debug.print (Principal.toText(msg.caller));
                return false;
            };
        }
    };


    /// Transfers value amount of tokens from Principal from to Principal to.
    public shared(msg) func transferFrom(from: Principal, to: Principal, value: Nat) : async Bool {
        switch (balances.get(from), allowances.get(from)) {
            case (?from_balance, ?allowance_from) {
                switch (allowance_from.get(msg.caller)) {
                    case (?allowance) {
                        if (from_balance >= value and allowance >= value) {
                            var from_balance_new = from_balance - value;
                            assert(from_balance_new <= from_balance);
                            balances.put(from, from_balance_new);

                            var to_balance_new = switch (balances.get(to)) {
                                case (?to_balance) {
                                   to_balance + value;
                                };
                                case (_) {
                                    value;
                                };
                            };
                            assert(to_balance_new >= value);
                            balances.put(to, to_balance_new);

                            var allowance_new = allowance - value;
                            assert(allowance_new <= allowance);
                            allowance_from.put(msg.caller, allowance_new);
                            allowances.put(from, allowance_from);
                            return true;                            
                        } else {
                            return false;
                        };
                    };
                    case (_) {
                        return false;
                    };
                }
            };
            case (_) {
                return false;
            };
        }
    };

    /// Allows spender to withdraw from your account multiple times, up to the value amount. 
    /// If this function is called again it overwrites the current allowance with value.
    public shared(msg) func approve(spender: Principal, value: Nat) : async Bool {
        switch(allowances.get(msg.caller)) {
            case (?allowances_caller) {
                allowances_caller.put(spender, value);
                allowances.put(msg.caller, allowances_caller);
                return true;
            };
            case (_) {
                var temp = HashMap.HashMap<Principal, Nat>(1, Principal.equal, Principal.hash);
                temp.put(spender, value);
                allowances.put(msg.caller, temp);
                return true;
            };
        }
    };

    /// Creates value tokens and assigns them to Principal to, increasing the total supply.
    public shared(msg) func mint(to: Principal, value: Nat): async Bool {
        assert(msg.caller == owner_);
        switch (balances.get(to)) {
            case (?to_balance) {
                balances.put(to, to_balance + value);
                totalSupply_ += value;
                return true;
            };
            case (_) {
                balances.put(to, value);
                totalSupply_ += value;
                return true;
            };
        }
    };

    public shared(msg) func burn(from: Principal, value: Nat): async Bool {
        assert(msg.caller == owner_ or msg.caller == from);
        switch (balances.get(from)) {
            case (?from_balance) {
                if(from_balance >= value) {
                    balances.put(from, from_balance - value);
                    totalSupply_ -= value;
                    return true;
                } else {
                    return false;
                }
            };
            case (_) {
                return false;
            };
        }
    };

    public query func balanceOf(who: Principal) : async Nat {
        Debug.print (Principal.toText(who));
        switch (balances.get(who)) {
            case (?balance) {
                return balance;
            };
            case (_) {
                return 0;
            };
        }
    };

    public query func allowance(owner: Principal, spender: Principal) : async Nat {
        switch(allowances.get(owner)) {
            case (?allowance_owner) {
                switch(allowance_owner.get(spender)) {
                    case (?allowance) {
                        return allowance;
                    };
                    case (_) {
                        return 0;
                    };
                }
            };
            case (_) {
                return 0;
            };
        }
    };

    public query func totalSupply() : async Nat {
        return totalSupply_;
    };

    public query func name() : async Text {
        return name_;
    };

    public query func decimals() : async Nat {
        return decimals_;
    };

    public query func symbol() : async Text {
        return symbol_;
    };

    public query func owner() : async Principal {
        return owner_;
    };

     public func greet(name : Text) : async Text {
        return "Hello, " # name # "!";
    };

    
    

    /// get Principal from Principal ID text
    public func getPrincipal(idstr : Text) : async Principal {
       let principal_ : Principal = Principal.fromText(idstr);
        return principal_;
    };
    
   

    /// register for player
    public func registerUser(principal_str : Text ,password : Text) : async Bool{
       let principal : Principal =  Principal.fromText(principal_str); 
       switch(players.get(principal)){
           case(?from_player){
               return false;
           };
           case(_){
             players.put(principal, password);
             airDropList.put(principal, 0);
               return true;
           };
       }             
    };  

    /// modify player password

    public func modifyPassWord(principal_str : Text ,new_password : Text) : async Bool{
      let principal : Principal =  Principal.fromText(principal_str);
      players.put(principal, new_password);
      return true;
    };
    
    /// log in for player
    public func logIn( principal_str : Text , password : Text ) : async Bool{
     let principal : Principal =  Principal.fromText(principal_str);
     switch(players.get(principal)){
         case(?save_password){
             if(save_password == password){
                 return true;

             } else return false;
         };
         case(_){
             return false;
         };
     }
     
    };

    // claim airdrop token record. 
    public func updateAirDropRecord(principal: Principal , timeStamp : Nat ) : async Bool{
        switch(airDropList.get(principal)){
            case(?last_record){
                if(timeStamp > last_record ){
                    airDropList.put(principal,timeStamp);
                    return true;
                }else{
                    return false;
                };
            };
            case(_){
             return false;
            };

        }
    };

    public func getAirdropLastRecord(principal : Principal ): async ? Nat {
       airDropList.get(principal)
    };

 
    /// Value amount of tokens airdrop to Principal by principal ID.
    public shared(msg) func airDrop(toStr: Text, value: Nat) : async Bool {
        let to : Principal =  Principal.fromText(toStr); 
        switch (balances.get(owner_)) {
            case (?from_balance) {
                if (from_balance >= value) {
                    var from_balance_new = from_balance - value;
                    assert(from_balance_new <= from_balance);
                    balances.put(owner_, from_balance_new);

                    var to_balance_new = switch (balances.get(to)) {
                        case (?to_balance) {
                            to_balance + value;
                        };
                        case (_) {
                            value;
                        };
                    };
                    assert(to_balance_new >= value);
                    balances.put(to, to_balance_new);
                    return true;
                } else {
                    return false;
                };
            };
            case (_) {
                return false;
            };
        }
    };


    /// Value amount of tokens deduct from Principal by principal ID.
    public shared(msg) func recoverChip(from_str: Text, value: Nat) : async Bool {
        let from : Principal =  Principal.fromText(from_str); 
        switch (balances.get(from)) {
            case (?from_balance) {
                if (from_balance >= value) {
                    var from_balance_new = from_balance - value;
                    assert(from_balance_new <= from_balance);
                    balances.put(from, from_balance_new);

                    var to_balance_new = switch (balances.get(owner_)) {
                        case (?to_balance) {
                            to_balance + value;
                        };
                        case (_) {
                            value;
                        };
                    };
                    assert(to_balance_new >= value);
                    balances.put(owner_, to_balance_new);
                    return true;
                } else {
                    return false;
                };
            };
            case (_) {
                return false;
            };
        }
    };

    // icat functions


    public func createNewCat(userId: UserId, timeStamp: Nat,new_gender : Nat): async Profile{
        var new_fighting =0;
        var new_pregnancy = 0;
        if(new_gender == 0){
            new_pregnancy := 1;
        }else{           
            new_fighting :=1;
        };
        let  profile :Profile ={
                id =userId;
                name = "";
                gender = new_gender;
                birthdate = timeStamp;
                hungry = 100;
                thirsty = 100;
                happyness = 0;
                imgUrl = "";
                food =0;
                water =0;
                music =0;
                last_drink=timeStamp;
                last_feed=timeStamp;
                last_play=timeStamp;
                fighting= new_fighting;
                pregnancy=new_pregnancy;
        };
        directory.updateOne(userId,profile);
        return profile;
    };


    public func getICatInfo(userId : UserId) : async ? Profile {
        directory.findOne(userId)
    };

    public func updateProfile(profile : Profile) : async Bool {
        directory.updateOne(profile.id, profile);
        return true;
    };


    public shared(msg) func checkState() :async Player{
        Debug.print (Principal.toText(msg.caller)); 
        switch(directory.findPlayer(msg.caller)){
            case(?p){
                return p;
            };
            case(None){
                let np= directory.createPlayer(msg.caller);
                let map =  HashMap.HashMap< Nat,Principal>(0, Nat.equal, Hash.hash);
                creatorMap.put(msg.caller, map);
                return np;
            };
        }
    };

    // player functions
    public func createPlayerFromFront(principal : Principal) : async Player {
        let player =directory.createPlayer(principal);
        return player ;
    };

    public shared(msg) func createPlayer() : async Player {
        let player =directory.createPlayer(msg.caller);
        return player ;
    };

    public func updatePlayer(player : Player){
        directory.updatePlayer(player.id, player);
    };

    public func findPlayer(id : Principal) : async ?Player {
        return directory.findPlayer(id);
    };


    public func createCatInfo( owner : Principal,timeStamp: Nat,gender :Nat) : async CatInfo{
      
        let new_gender = gender;     
        var new_fighting =0;
        var new_pregnancy = 0;
        if(new_gender == 0){
            new_pregnancy := 1;
        }else{           
            new_fighting :=1;
        };
        let  info :CatInfo ={
                name = "";
                gender = new_gender;
                birthdate = timeStamp;
                hungry = 100;
                thirsty = 100;
                happyness = 0;
                last_drink=timeStamp;
                last_feed=timeStamp;
                last_play=timeStamp;
                fighting= new_fighting;
                pregnancy=new_pregnancy;
        };
       
        return info;
    };


    public func checkUserHasCat(owner : Principal) : async Bool {
        switch(creatorMap.get(owner)){
            case(?v){
                return v.size() > 0;
            };
            case(None){
                return false;
            };
        }
    }; 

    public shared(msg) func testCall() :async  Text {
         Principal.toText(msg.caller)

    };

    // NFT part

    public shared(msg) func requestId() : async Result.Result<Nat, Text> {
        switch(creatorMap.get(msg.caller)) {
            case (?v) {
                idCounter := idCounter + 1;
                return #ok(idCounter);
            };
            case (None) {
                return #err("Invalid Request");
            }
        }
    };


    public shared query func getNftAddress(id : Nat) : async ?Principal {
        return nftMap.get(id);
    };

    public shared query func getNft(principal :Principal) : async ?Nft.Nft {
        return nftDataMap.get(principal);
    };

    public shared query func getNftById( id : Nat) : async Result.Result<Nft.Nft, Text> {
        switch(nftMap.get(id)){
            case(?principal){
                switch(nftDataMap.get(principal)){
                    case(?nft){
                       return #ok(nft);
                    };
                    case(None){
                        return #err("EMPTY NFT!");
                    };
                }
            };
            case(None){
                return #err("Invalid Id!");
            };
        }

    };


    public shared(msg) func spawnCreator() : async Text {
    
        switch(creatorMap.get(msg.caller)) {
            case (?v) {
                return Principal.toText(msg.caller);
            };
            case (None) {
               let map =  HashMap.HashMap<Nat,Principal>(0, Nat.equal, Hash.hash);
                creatorMap.put(msg.caller, map);
                return Principal.toText(msg.caller);
            };
        };

        return "Ok";
    };

    

    public shared(msg) func mintNft(data : [Nat8], catInfo :CatInfo ) : async Result.Result<Principal, Text> {
         
         switch(creatorMap.get(msg.caller)){
             case(?map){
                 idCounter := idCounter + 1;
                 let minted = await Nft.Nft(msg.caller, idCounter, data, catInfo);
                 // put nft data in to map
                 nftDataMap.put(Principal.fromActor(minted),minted);
                 // link nft principal to id
                 nftMap.put(idCounter,Principal.fromActor(minted));
                 map.put(idCounter,Principal.fromActor(minted));
                 creatorMap.put(msg.caller,map);
                 return #ok(Principal.fromActor(minted));
             };

             case(None){
                 return #err("Not Authorized");
             };
         }
    };
    public func mintNftByFront(data : [Nat8], catInfo :CatInfo , creator :Principal) : async Result.Result<Principal, Text> {
         
         switch(creatorMap.get(creator)){
             case(?map){
                 idCounter := idCounter + 1;
                 let minted = await Nft.Nft(creator, idCounter, data, catInfo);
                 // put nft data in to map
                 nftDataMap.put(Principal.fromActor(minted),minted);
                 // link nft principal to id
                 nftMap.put(idCounter,Principal.fromActor(minted));
                 map.put(idCounter,Principal.fromActor(minted));
                 creatorMap.put(creator,map);
                 return #ok(Principal.fromActor(minted));
             };

             case(None){
                 return #err("Not Authorized");
             };
         }
    };

   

};


