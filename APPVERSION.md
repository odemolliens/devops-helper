Git workflow
In order to ensure consistency at the Git level, a first strategy was suggested concerning branch names, workflow… This solution is similar to the principle used here: https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

— Main branches —
The main branches available are :

- « develop » for the development environment, to test new features in development, …
- « test » for the « QA » team, to ensure there is no regression, all the new features meet the expectations
- « master » for the production.
  These three branches must be « protected » and prevent any commits to be pushed directly.
  — Branch versioning ——
  The current strategy involves versioning each branch. The goal is to easily distinguish all versions made / in progress and to easily modify a version. This strategy has also been designed to integrate easily with the current CI/CD implementation.
  So, for example, we will have :
  develop/1.0.0
  test/1.0.0
  master/1.0.0
  And in progress something like develop/2.0.0
  We follow the standard semantics : X.Y.Z. (X = stands for a major version, Y = minor version, Z = patch version).
  —— Branch feature/fix name ——
  A specific convention has been defined to facilitate the follow-up of the branches.
  [typeOfTask]/[version]/[jiraTaskID]/[description]
- typeOfTask = "feat" or "fix"
- version = the version of the application concerned by this branch
- jiraTaskID = the ID of the Jira task associated to this branch
- description = a brief task description
  Example :
  "feat/7.0.0/TEAM-13/add-new-fature"
  —— Features ——
  Each feature to achieve, should be done through a branch. The strategy is quiet simple, each developer should create a branch from the corresponding develop version branch.
  For example, we have to create a new feature for the next release 8.0.0, we should create a branch from develop/8.0.0 as we know this is the target of the next release.
  To merge the branch in « develop », you must create a pull request.  
  — Fix ——
  As for features, each fix should be done from a branch.
  If there is a hotfix to achieve in the version master 7.0.0 for example, we can easily investigate and create a branch from develop/7.0.0 as we know that all the new features are already based on develop/8.0.0 there is no risk to deploy something not validated yet.
  When the fix is done, we can create a branch develop/7.0.1, merge it, and do the same process for test and master.
  With this workflow we can easily see which version is concerned and easily distinguish all the current version work in progress.
