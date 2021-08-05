import Principal "mo:base/Principal";
import Type "./types";

actor class Nft(creator : Principal, id : Nat, payloadData : [Nat8], catInfo : Type.CatInfo) {

    type CatInfo =Type.CatInfo;
    type Data = {
        info : CatInfo;
        data : [Nat8]; // We're being lazy pals - sending the data as a Nat8 Array

    };

    var owner : Principal = creator;

    let data : Data = {
        info = catInfo;
        data = payloadData;
    };

    

    public shared(msg) func transferOwner(newOwner : Principal) : async () {
        if (msg.caller != owner) {
            return;
        };

        owner := newOwner;
        return;
    };

    public query func getData() : async Data {
        return data;
    };

    public query func getOwner() : async Principal {
        return owner;
    };

    public query func getId() : async Nat {
        return id;
    };
}