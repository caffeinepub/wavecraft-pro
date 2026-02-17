import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Float "mo:core/Float";
import Int "mo:core/Int";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";
import AccessControl "authorization/access-control";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Migration "migration";

(with migration = Migration.run)
actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type BackgroundSettings = {
    color : Text;
    style : Text;
    brightness : Float;
  };

  public type BrandingSettings = {
    logoUrl : Text;
    font : Text;
    theme : Text;
  };

  public type TunnelSettings = {
    mode : Text;
    speed : Float;
    complexity : Int;
    depth : Float;
    rotation : Bool;
  };

  public type Project = {
    id : Text;
    name : Text;
    owner : Principal;
    polarity : Bool;
    bpm : Nat;
    musicalKey : Text;
    refPoints : [RefPoint];
    backgroundSettings : BackgroundSettings;
    brandingSettings : BrandingSettings;
    tunnelSettings : TunnelSettings;
    image : ?Storage.ExternalBlob;
    published : Bool;
    isShared : Bool;
  };

  public type Template = {
    id : Text;
    name : Text;
    description : Text;
    polarity : Bool;
    bpm : Nat;
    musicalKey : Text;
    refPoints : [RefPoint];
    backgroundSettings : BackgroundSettings;
    brandingSettings : BrandingSettings;
    tunnelSettings : TunnelSettings;
    image : ?Storage.ExternalBlob;
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

  public type UserProfile = {
    name : Text;
    avatar : ?Storage.ExternalBlob;
  };

  public type ProjectFilters = {
    owner : ?Principal;
    keyword : ?Text;
    bpmRange : ?(Nat, Nat);
  };

  public type ProjectSummary = {
    id : Text;
    name : Text;
    owner : Principal;
    bpm : Nat;
    image : ?Storage.ExternalBlob;
    published : Bool;
    isShared : Bool;
  };

  public type ProjectStatistics = {
    totalProjects : Nat;
    projectsPerUser : [(Principal, Nat)];
    averageBpm : Float;
    polarityCount : Nat;
    mostCommonKey : Text;
  };

  let projectStore = Map.empty<Text, Project>();
  let templateStore = Map.empty<Text, Template>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
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

  public shared ({ caller }) func saveCallerUserProfile(
    name : Text,
    avatar : ?Storage.ExternalBlob,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    let profile : UserProfile = { name; avatar };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func listProjects(filters : ProjectFilters, limit : Nat, offset : Nat) : async [ProjectSummary] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can list projects");
    };

    let allProjects = projectStore.values().toArray();

    let filteredProjects = allProjects.filter(
      func(project) {
        switch (filters.owner, filters.keyword, filters.bpmRange) {
          case (?owner, _, _) {
            if (not Principal.equal(project.owner, owner)) { return false };
          };
          case (_, ?keyword, _) {
            if (not project.name.contains(#text keyword)) { return false };
          };
          case (_, _, ?(minBpm, maxBpm)) {
            if (project.bpm < minBpm or project.bpm > maxBpm) { return false };
          };
          case (null, null, null) { () };
        };
        true;
      }
    );

    let end = Nat.min(offset + limit, filteredProjects.size());
    if (offset >= filteredProjects.size()) { return [] };

    let paginated = filteredProjects.sliceToArray(offset, end);

    let result = paginated.map(
      func(project) {
        {
          id = project.id;
          name = project.name;
          owner = project.owner;
          bpm = project.bpm;
          image = project.image;
          published = project.published;
          isShared = project.isShared;
        };
      }
    );

    result;
  };

  public query ({ caller }) func getPublishedProjects(limit : Nat, offset : Nat) : async [ProjectSummary] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can list projects");
    };

    let allProjects = projectStore.values().toArray();
    let publishedProjects = allProjects.filter(
      func(project) {
        project.published;
      }
    );

    let end = Nat.min(offset + limit, publishedProjects.size());
    if (offset >= publishedProjects.size()) { return [] };

    let paginated = publishedProjects.sliceToArray(offset, end);

    paginated.map(
      func(project) {
        {
          id = project.id;
          name = project.name;
          owner = project.owner;
          bpm = project.bpm;
          image = project.image;
          published = project.published;
          isShared = project.isShared;
        };
      }
    );
  };

  public query ({ caller }) func getSharedProjects(limit : Nat, offset : Nat) : async [ProjectSummary] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can list projects");
    };

    let allProjects = projectStore.values().toArray();
    let sharedProjects = allProjects.filter(
      func(project) {
        project.isShared;
      }
    );

    let end = Nat.min(offset + limit, sharedProjects.size());
    if (offset >= sharedProjects.size()) { return [] };

    let paginated = sharedProjects.sliceToArray(offset, end);

    paginated.map(
      func(project) {
        {
          id = project.id;
          name = project.name;
          owner = project.owner;
          bpm = project.bpm;
          image = project.image;
          published = project.published;
          isShared = project.isShared;
        };
      }
    );
  };

  public query ({ caller }) func getProjectStatistics() : async ProjectStatistics {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can get statistics");
    };

    let projects = projectStore.values().toArray();
    let totalProjects = projects.size();

    var sumBpm : Nat = 0;
    var countPolarity : Nat = 0;

    let keyCount = Map.empty<Text, Nat>();
    let projectsPerUser = Map.empty<Principal, Nat>();

    for (p in projects.values()) {
      sumBpm += p.bpm;
      if (p.polarity) { countPolarity += 1 };

      let userCount = switch (projectsPerUser.get(p.owner)) {
        case (null) { 0 };
        case (?count) { count };
      };
      projectsPerUser.add(p.owner, userCount + 1);

      let key = p.musicalKey;
      let kCount = switch (keyCount.get(key)) {
        case (null) { 0 };
        case (?count) { count };
      };
      keyCount.add(key, kCount + 1);
    };

    var mostCommonKey = "";
    var mostCommonKeyCount = 0;
    for ((key, count) in keyCount.entries()) {
      if (count > mostCommonKeyCount) {
        mostCommonKey := key;
        mostCommonKeyCount := count;
      };
    };

    let averageBpm = if (totalProjects > 0) {
      sumBpm.toFloat() / totalProjects.toFloat();
    } else { 0.0 };

    {
      totalProjects;
      projectsPerUser = projectsPerUser.toArray();
      averageBpm;
      polarityCount = countPolarity;
      mostCommonKey;
    };
  };

  public shared ({ caller }) func createProject(
    name : Text,
    polarity : Bool,
    bpm : Nat,
    musicalKey : Text,
    backgroundSettings : BackgroundSettings,
    brandingSettings : BrandingSettings,
    tunnelSettings : TunnelSettings,
    image : ?Storage.ExternalBlob,
    published : Bool,
    isShared : Bool,
  ) : async Text {
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
      backgroundSettings;
      brandingSettings;
      tunnelSettings;
      image;
      published;
      isShared;
    };
    projectStore.add(projectId, project);
    projectId;
  };

  public shared ({ caller }) func updateProject(
    id : Text,
    name : Text,
    polarity : Bool,
    bpm : Nat,
    musicalKey : Text,
    refPoints : [RefPoint],
    backgroundSettings : BackgroundSettings,
    brandingSettings : BrandingSettings,
    tunnelSettings : TunnelSettings,
    image : ?Storage.ExternalBlob,
    published : Bool,
    isShared : Bool,
  ) : async () {
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
          backgroundSettings;
          brandingSettings;
          tunnelSettings;
          image;
          published;
          isShared;
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
        let updated = { project with name = newName };
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
        let isOwner = Principal.equal(project.owner, caller);
        let isPublished = project.published;

        if (not isAdmin and not isOwner and not isPublished) {
          Runtime.trap("Unauthorized: Can only view your own projects or published projects");
        };
        project;
      };
    };
  };

  public query ({ caller }) func getTemplates(limit : Nat, offset : Nat) : async [Template] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can get templates");
    };

    let allTemplates = templateStore.values().toArray();

    let end = Nat.min(offset + limit, allTemplates.size());
    if (offset >= allTemplates.size()) { return [] };

    allTemplates.sliceToArray(offset, end);
  };

  public shared ({ caller }) func addTemplate(
    name : Text,
    description : Text,
    polarity : Bool,
    bpm : Nat,
    musicalKey : Text,
    backgroundSettings : BackgroundSettings,
    brandingSettings : BrandingSettings,
    tunnelSettings : TunnelSettings,
    image : ?Storage.ExternalBlob,
  ) : async Text {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add templates");
    };

    let templateId = "template-" # name # "-" # templateStore.size().toText();
    let template : Template = {
      id = templateId;
      name;
      description;
      polarity;
      bpm;
      musicalKey;
      refPoints = [];
      backgroundSettings;
      brandingSettings;
      tunnelSettings;
      image;
    };
    templateStore.add(templateId, template);
    templateId;
  };

  public shared ({ caller }) func updateBackgroundSettings(
    projectId : Text,
    newSettings : BackgroundSettings,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can update background settings");
    };

    switch (projectStore.get(projectId)) {
      case (null) { Runtime.trap("Project does not exist") };
      case (?project) {
        let isAdmin = AccessControl.isAdmin(accessControlState, caller);
        if (not isAdmin and not Principal.equal(project.owner, caller)) {
          Runtime.trap("Unauthorized: Can only update your own projects");
        };

        let updated = { project with backgroundSettings = newSettings };
        projectStore.add(projectId, updated);
      };
    };
  };

  public shared ({ caller }) func updateBrandingSettings(
    projectId : Text,
    newSettings : BrandingSettings,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can update branding settings");
    };

    switch (projectStore.get(projectId)) {
      case (null) { Runtime.trap("Project does not exist") };
      case (?project) {
        let isAdmin = AccessControl.isAdmin(accessControlState, caller);
        if (not isAdmin and not Principal.equal(project.owner, caller)) {
          Runtime.trap("Unauthorized: Can only update your own projects");
        };

        let updated = { project with brandingSettings = newSettings };
        projectStore.add(projectId, updated);
      };
    };
  };

  public shared ({ caller }) func updateTunnelSettings(
    projectId : Text,
    newSettings : TunnelSettings,
  ) : async () {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized: Only users can update tunnel settings");
    };

    switch (projectStore.get(projectId)) {
      case (null) { Runtime.trap("Project does not exist") };
      case (?project) {
        let isAdmin = AccessControl.isAdmin(accessControlState, caller);
        if (not isAdmin and not Principal.equal(project.owner, caller)) {
          Runtime.trap("Unauthorized: Can only update your own projects");
        };

        let updated = { project with tunnelSettings = newSettings };
        projectStore.add(projectId, updated);
      };
    };
  };
};
