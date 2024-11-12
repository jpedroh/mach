/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/git',
  ],
  preset: 'angular',
  tagFormat: 'v${version}',
  branches: ['main'],
}
