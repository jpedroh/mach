module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/github',
    [
      '@semantic-release/exec',
      {
        publishCmd:
          'yarn lerna version ${nextRelease.version} --no-git-tag-version --no-changelog --yes'
      }
    ],
    [
      '@semantic-release/git',
      {
        message:
          'chore(release): ${nextRelease.version} [skip release]\n\n${nextRelease.notes}'
      }
    ]
  ],
  preset: 'angular',
  tagFormat: 'v${version}'
}
