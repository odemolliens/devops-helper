import { simpleLogger } from 'adash-ts-helper';
import 'colors';
import simpleGit, { ResetMode, SimpleGit } from 'simple-git';

const git: SimpleGit = simpleGit({});
const logger = simpleLogger();

export default async function promoteAppVersion({
  remote,
  branches,
  appVersion,
  dryRun = false,
}: {
  readonly remote: string;
  readonly branches: readonly string[];
  readonly appVersion: string;
  readonly dryRun: boolean;
}) {
  dryRun = true;
  logger.info(`Git Reset Hard`.green);
  !dryRun && logger.debug(await git.reset(ResetMode.HARD));

  for (let index = 0; index < branches.length; index++) {
    const currentBranch = branches[index];
    const firstBranch = index == 0;

    logger.info(`Checkout ${currentBranch}`.green);
    !dryRun && logger.debug(await git.checkout(`develop/${appVersion}`));

    logger.info(`Pull ${currentBranch}`);
    !dryRun && logger.debug(await git.pull());

    if (!firstBranch) {
      const previousBranch = branches[index - 1];

      logger.info(`Merge ${previousBranch} in ${currentBranch}`.green);
      !dryRun &&
        logger.debug(
          await git.merge([
            `${previousBranch}/${appVersion}`,
            '--commit',
            '--no-edit',
          ])
        );

      logger.info(`Push ${remote}`.green);
      !dryRun &&
        logger.debug(await git.push(remote, `${currentBranch}/${appVersion}`));
    }
  }
}
