# Available scripts

For a list of available scripts and their usage run the command:
`npx devops-helper --help`

1. `promote-app [REMOTE] [BRANCHES] <APP_VERSION> --dryRun`

   Merge all the changes of the first branch to the other branches (from left to right) for a specific app version, for me information about app version check [APPVERSION.md]().

   If you don't follow the versioned workflow, you can provide the `--noVersionedBranch` option to skip the version checks.

   \*BRANCHES parameters must be a valid JSON string array

   Example:
   - Manual branch name:
   `npx devops-helper promote-app repository.git "[\"develop\", \"uat\", \"lut\"]" 9.99.9`
   - Auto detect version:
   `npx devops-helper promote-app repository.git "[\"develop\", \"uat\", \"lut\"]"`
   - Without any versioned branches:
   `npx devops-helper promote-app repository.git "[\"develop\", \"uat\", \"lut\"]" --noVersionedBranch`

## Add a new script

1. Place the new script in the scripts folder
2. Edit the file devops-helper.ts and add the command that will invoke the script

## Lint, Coverage, Test...

- `yarn fix` to run the linter and automatically fix your code
