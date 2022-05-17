# Available scripts

For a list of available scripts and their usage run the command:
`npx devops-helper --help`

1. `promote-app [REMOTE] [BRANCHES] <APP_VERSION> --dryRun`

   Merge all the changes of the first branch to the other branches (from left to right) for a specific app version, for me information about app version check [APPVERSION.md]().

   If you don't follow the versioned workflow, you can provide the `--noVersionedBranch` option to skip the version checks.

   \*BRANCHES parameters must be a valid JSON string array

   Example:
   - Auto detected version from the branch name:

   Your current branch is: `branch_1/1.2.3`

   `npx --yes devops-helper promote-app https://gitlab-ci-token:ACCESS_TOKEN@gitlab.com/REPOSITORY "[\"branch_1\", \"branch_2\", \"branch_3\"]"`

   it will merge `branch_1/1.2.3` into `branch_2/1.2.3`, and `branch_2/1.2.3` into `branch_3/1.2.3`

   - Manually set version:

   `npx --yes devops-helper promote-app https://gitlab-ci-token:ACCESS_TOKEN@gitlab.com/REPOSITORY "[\"develop\", \"uat\", \"store\"]" 9.99.9`

   It will merge `branch_1/9.99.9` into `branch_2/9.99.9`, and `branch_2/9.99.9` into `branch_3/9.99.9`

   - Without any versioned branches:

   `npx --yes devops-helper promote-app https://gitlab-ci-token:ACCESS_TOKEN@gitlab.com/REPOSITORY "[\"branch_1\", \"branch_2\", \"branch_3\"]" --noVersionedBranch`

   It will merge `branch_1` into `branch_2`, and `branch_2` into `branch_3`


⚠️ ⚠️ Don't forget to set `ACCESS_TOKEN` and `REPOSITORY`

The `ACCESS_TOKEN` can be created from [there](https://gitlab.com/-/profile/personal_access_tokens), just the `write_repository` is required
## Add a new script

1. Place the new script in the scripts folder
2. Edit the file devops-helper.ts and add the command that will invoke the script

## Lint, Coverage, Test...

- `yarn fix` to run the linter and automatically fix your code
