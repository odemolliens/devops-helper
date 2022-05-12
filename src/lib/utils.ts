export function extractVersions(data: unknown) {
  const versionRegExp = /\/(?<version>\d+\.\d{2}\.\d)/g; // matches 5.25.0 from feat/5.25.0/SYST-000-title
  const strData = JSON.stringify(data);
  const versions = strData
    .match(versionRegExp)
    .map((v) => v.replace(/\//g, ''))
    .flat();
  return versions;
}
