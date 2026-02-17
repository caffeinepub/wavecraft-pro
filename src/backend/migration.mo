import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";

module {
  type OldProject = {
    id : Text;
    name : Text;
    owner : Principal;
    polarity : Bool;
    bpm : Nat;
    musicalKey : Text;
    refPoints : [OldRefPoint];
    backgroundSettings : OldBackgroundSettings;
    brandingSettings : OldBrandingSettings;
    tunnelSettings : OldTunnelSettings;
    image : ?Storage.ExternalBlob;
  };

  type OldBackgroundSettings = {
    color : Text;
    style : Text;
    brightness : Float;
  };

  type OldBrandingSettings = {
    logoUrl : Text;
    font : Text;
    theme : Text;
  };

  type OldTunnelSettings = {
    mode : Text;
    speed : Float;
    complexity : Int;
    depth : Float;
    rotation : Bool;
  };

  type OldRefPoint = {
    id : Text;
    title : Text;
    description : Text;
    startTime : Float;
    endTime : Float;
    keySignature : Text;
    tenor : Text;
    bass : Text;
    chords : Text;
    harmonicAnalysis : Text;
  };

  type OldActor = {
    projectStore : Map.Map<Text, OldProject>;
    userProfiles : Map.Map<Principal, OldUserProfile>;
  };

  type OldUserProfile = {
    name : Text;
    avatar : ?Storage.ExternalBlob;
  };

  type NewProject = {
    id : Text;
    name : Text;
    owner : Principal;
    polarity : Bool;
    bpm : Nat;
    musicalKey : Text;
    refPoints : [OldRefPoint];
    backgroundSettings : OldBackgroundSettings;
    brandingSettings : OldBrandingSettings;
    tunnelSettings : OldTunnelSettings;
    image : ?Storage.ExternalBlob;
    published : Bool;
    isShared : Bool;
  };

  type NewActor = {
    projectStore : Map.Map<Text, NewProject>;
    userProfiles : Map.Map<Principal, OldUserProfile>;
  };

  public func run(old : OldActor) : NewActor {
    let projectStore = old.projectStore.map<Text, OldProject, NewProject>(
      func(_id, project) {
        { project with published = false; isShared = false };
      }
    );

    {
      old with projectStore;
    };
  };
};
