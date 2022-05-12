# Getting started

To setup the project run the following commands

- `yarn`

## Add a new script

1. Place the new script in the scripts folder
2. Edit the file devops-helper.ts and add the command that will invoke the script

## Lint, Coverage, Test...

- `yarn fix` to run the linter and automatically fix your code

# Available scripts

For a list of available scripts and their usage run the command:
`npx ts-node devops-helper --help`

1. `promote-app-version [REMOTE] [BRANCHES] <APP_VERSION> --dryRun`

   Merge all the changes of the first branch to the other branches (from left to right) for a specific app version

   \*The BRANCHES parameters must be a valid JSON string array

   Example:
   `npx ts-node devops-helper promote-app-version repository.git "[\"develop\", \"uat\", \"lut\"]" 9.99.9 --dryRun`
