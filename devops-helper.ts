import { simpleLogger } from 'adash-ts-helper';
import cac from 'cac';
import simpleGit, { SimpleGit } from 'simple-git';
import packageJson from './package.json';
import { extractVersions } from './src/lib/utils';
import promoteApp from './src/scripts/promote_app';

const cli = cac();
const logger = simpleLogger();

cli
  .command(
    'promote-app [REMOTE] [BRANCHES] <APP_VERSION>',
  )
  .option('--dryRun [dryRun]', 'Just run the script without doing nothing', { default: false })
  .option('--noVersionedBranch [noVersionedBranch]', 'Skip version checks', { default: false })
  .action(
    async (
      remote: string,
      branches: string,
      appVersion: string,
      options: any
    ) => {
      try {
        const git: SimpleGit = simpleGit({});
        const currentBranch = (await git.branch()).current;
        const parsedBranches = JSON.parse(branches);

        if (!options.noVersionedBranch) {
          appVersion = appVersion || extractVersions(currentBranch)[0];

          if (!appVersion) {
            throw Error("Cannot detect the app version from the branch name. Please provide the app version, rename the branch to follow the versioned workflow or use the --noVersionedBranch option.")
          }
        }

        await promoteApp({
          remote,
          appVersion: options.noVersionedBranch ? undefined : appVersion,
          branches: parsedBranches,
          dryRun: options.dryRun,
        });

        logger.info('done');
      } catch (e) {
        logger.error(e);
      }
    }
  );

cli.command('').action(cli.outputHelp);

cli.help();
cli.version(packageJson.version);
cli.parse();
