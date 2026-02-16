import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";

module {
  type OldProject = {
    id : Text;
    name : Text;
    owner : Principal.Principal;
    polarity : Bool;
    bpm : Nat;
    musicalKey : Text;
    refPoints : [OldRefPoint];
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
    userProfiles : Map.Map<Principal.Principal, { name : Text }>;
  };

  type NewRefPoint = OldRefPoint;

  type BackgroundSettings = {
    color : Text;
    style : Text;
    brightness : Float;
  };

  type BrandingSettings = {
    logoUrl : Text;
    font : Text;
    theme : Text;
  };

  type TunnelSettings = {
    mode : Text;
    speed : Float;
    complexity : Int;
    depth : Float;
    rotation : Bool;
  };

  type NewProject = {
    id : Text;
    name : Text;
    owner : Principal.Principal;
    polarity : Bool;
    bpm : Nat;
    musicalKey : Text;
    refPoints : [NewRefPoint];
    backgroundSettings : BackgroundSettings;
    brandingSettings : BrandingSettings;
    tunnelSettings : TunnelSettings;
    image : ?Storage.ExternalBlob;
  };

  type NewUserProfile = {
    name : Text;
    avatar : ?Storage.ExternalBlob;
  };

  type NewActor = {
    projectStore : Map.Map<Text, NewProject>;
    userProfiles : Map.Map<Principal.Principal, NewUserProfile>;
  };

  type DefaultImage = {
    url : Text;
    description : Text;
  };

  public func run(old : OldActor) : NewActor {
    let newProjects = old.projectStore.map<Text, OldProject, NewProject>(
      func(_, oldProject) {
        {
          oldProject with
          backgroundSettings = {
            color = "default";
            style = "standard";
            brightness = 1.0;
          };
          brandingSettings = {
            logoUrl = "default/logo.png";
            font = "standard";
            theme = "light";
          };
          tunnelSettings = {
            mode = "classic";
            speed = 1.0;
            complexity = 5;
            depth = 10.0;
            rotation = false;
          };
          image = null;
        };
      }
    );

    let newUserProfiles = old.userProfiles.map<Principal, { name : Text }, NewUserProfile>(
      func(_, oldProfile) {
        {
          oldProfile with
          avatar = null;
        };
      }
    );

    {
      projectStore = newProjects;
      userProfiles = newUserProfiles;
    };
  };
};
