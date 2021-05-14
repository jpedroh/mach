module.exports = {
  plugins: [
    '@semantic-release/commit-analyzer',
    ['semantic-release-lerna', { generateNotes: true, publish: false }],
    '@semantic-release/changelog',
    '@semantic-release/github',
    [
      '@semantic-release/git',
      {
        message: 'chore(release): ${nextRelease.version} [skip release]',
        assets: [
          'CHANGELOG.md',
          'lerna.json',
          'package.json',
          'packages/*/package.json'
        ]
      }
    ]
  ],
  preset: 'angular',
  tagFormat: 'v${version}'
}
