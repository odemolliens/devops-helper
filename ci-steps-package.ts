import { simpleLogger } from 'adash-ts-helper';
import cac from 'cac';
import simpleGit, { SimpleGit } from 'simple-git';
import packageJson from './package.json';
import { extractVersions } from './src/lib/utils';
import promoteAppVersion from './src/scripts/promote_app_version';

const cli = cac();
const logger = simpleLogger();

cli
  .command(
    'promote-app-version [REMOTE] [BRANCHES] <APP_VERSION>',
    'Promote app version description'
  )
  .option('--dryRun [dryRun]', 'Just run the script without doing nothing')
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
        appVersion = appVersion || extractVersions(currentBranch)[0];

        await promoteAppVersion({
          remote,
          appVersion,
          branches: parsedBranches,
          dryRun: !!options.dryRun,
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
