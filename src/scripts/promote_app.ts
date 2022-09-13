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
  readonly appVersion?: string;
  readonly dryRun: boolean;
}) {
  logger.info(`Git Reset Hard`.green);
  !dryRun && logger.debug(await git.reset(ResetMode.HARD));

  for (let index = 0; index < branches.length; index++) {
    const currentBranch = branches[index];
    const firstBranch = index == 0;

    const branchAndVersion = joinBranchVersion(currentBranch, appVersion);

    if (!firstBranch) {
      logger.info(`Create new branch ${branchAndVersion}`.green);
      try {
        !dryRun && logger.debug(await git.branch([ '-c', branchAndVersion ]));
      } catch (error) {
        console.error("<<>> error: " + error)
      }
    }

    logger.info(`Checkout ${branchAndVersion}`.green);
    !dryRun && logger.debug(await git.checkout(branchAndVersion));

    logger.info(`Pull ${branchAndVersion}`);
    !dryRun && logger.debug(await git.pull());

    if (!firstBranch) {
      const previousBranch = branches[index - 1];
      const previousBranchAndVersion = joinBranchVersion(
        previousBranch,
        appVersion
      );

      logger.info(
        `Merge ${previousBranchAndVersion} in ${branchAndVersion}`.green
      );
      !dryRun &&
        logger.debug(
          await git.merge([previousBranchAndVersion, '--commit', '--no-edit'])
        );

      logger.info(`Push ${remote} ${branchAndVersion}`.green);
      !dryRun && logger.debug(await git.push(remote, branchAndVersion));
    }
  }
}

function joinBranchVersion(branch: string, version: string) {
  return [branch, version].filter(Boolean).join('/');
}
