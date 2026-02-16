import Map "mo:core/Map";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  public type UserProfile = {
    name : Text;
  };

  public type Project = {
    id : Text;
    name : Text;
    owner : Principal;
    polarity : Bool;
    bpm : Nat;
    musicalKey : Text;
    refPoints : [RefPoint];
  };

  public type RefPoint = {
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

  let projectStore = Map.empty<Text, Project>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // Project Management
  public query ({ caller }) func listProjects() : async [Text] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can list projects");
    };

    let isAdmin = AccessControl.isAdmin(accessControlState, caller);
    let projectIds = projectStore.keys().toArray().filter(
      func(id : Text) : Bool {
        switch (projectStore.get(id)) {
          case (null) { false };
          case (?project) {
            isAdmin or Principal.equal(project.owner, caller)
          };
        }
      }
    );
    projectIds;
  };

  public shared ({ caller }) func createProject(name : Text, polarity : Bool, bpm : Nat, musicalKey : Text) : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can create projects");
    };

    let projectId = caller.toText() # "-" # name # "-" # projectStore.size().toText();

    let project : Project = {
      id = projectId;
      name;
      owner = caller;
      polarity;
      bpm;
      musicalKey;
      refPoints = [];
    };
    projectStore.add(projectId, project);
    projectId;
  };

  public shared ({ caller }) func updateProject(id : Text, name : Text, polarity : Bool, bpm : Nat, musicalKey : Text, refPoints : [RefPoint]) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can update projects");
    };

    switch (projectStore.get(id)) {
      case (null) { Runtime.trap("Project does not exist") };
      case (?project) {
        let isAdmin = AccessControl.isAdmin(accessControlState, caller);
        if (not isAdmin and not Principal.equal(project.owner, caller)) {
          Runtime.trap("Unauthorized: Can only update your own projects");
        };

        let updated : Project = {
          id;
          name;
          owner = project.owner;
          polarity;
          bpm;
          musicalKey;
          refPoints;
        };
        projectStore.add(id, updated);
      };
    };
  };

  public shared ({ caller }) func deleteProject(id : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can delete projects");
    };

    switch (projectStore.get(id)) {
      case (null) { Runtime.trap("Project does not exist") };
      case (?project) {
        let isAdmin = AccessControl.isAdmin(accessControlState, caller);
        if (not isAdmin and not Principal.equal(project.owner, caller)) {
          Runtime.trap("Unauthorized: Can only delete your own projects");
        };
        projectStore.remove(id);
      };
    };
  };

  public shared ({ caller }) func renameProject(id : Text, newName : Text) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can rename projects");
    };

    switch (projectStore.get(id)) {
      case (null) { Runtime.trap("Project does not exist") };
      case (?project) {
        let isAdmin = AccessControl.isAdmin(accessControlState, caller);
        if (not isAdmin and not Principal.equal(project.owner, caller)) {
          Runtime.trap("Unauthorized: Can only rename your own projects");
        };

        let updated : Project = { project with name = newName };
        projectStore.add(id, updated);
      };
    };
  };

  public query ({ caller }) func getProject(id : Text) : async Project {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can view projects");
    };

    switch (projectStore.get(id)) {
      case (null) { Runtime.trap("Project does not exist") };
      case (?project) {
        let isAdmin = AccessControl.isAdmin(accessControlState, caller);
        if (not isAdmin and not Principal.equal(project.owner, caller)) {
          Runtime.trap("Unauthorized: Can only view your own projects");
        };
        project;
      };
    };
  };
};
