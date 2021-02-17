/*
 * @NOTE: don't forget to recompile this file on changes
 * @NOTE: `git config core.hooksPath` should be EMPTY
 *
 * What means each message-part:
 * https://www.npmjs.com/package/conventional-commits-parser
 *
 * Default rules:
 * https://commitlint.js.org/#/reference-rules
 */
import type { UserConfig } from '@commitlint/types';
// eslint-disable-next-line import/no-extraneous-dependencies
import conventionalCommitsParser from 'conventional-commits-parser';

const COMMIT_TYPES = [
  'feat', // @NOTE: implementation of functionality
  'fix', // @NOTE: bugfix
  'wip', // @NOTE: work in progress
  'ci', // @NOTE: continuous integration related issues
  'chore', // @NOTE: should be moved in the starter-project
];
const ISSUE_PREFIXES = ['QWE-', 'ASD-'];

const commitParser = (commitMessage: string) => {
  // https://github.com/conventional-changelog/conventional-changelog/tree/master/packages/conventional-commits-parser
  return conventionalCommitsParser.sync(commitMessage, {
    mergePattern: /^Merge (.*)$/,
    revertPattern: /^Revert (.*)$/,
    issuePrefixes: ISSUE_PREFIXES,
    issuePrefixesCaseSensitive: true,
  });
};

const Configuration: UserConfig = {
  /**
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed
   */
  // extends: ['@commitlint/config-conventional'],

  /**
   * Any rules defined here will override rules from @commitlint/config-conventional
   */

  // https://commitlint.js.org/#/reference-rules
  rules: {
    'local-plugin': [2, 'always'],
  },

  /**
   * Functions that return true if commitlint should ignore the given message.
   */
  // ignores: [(commit) => commit === ''],

  /**
   * In case you want to develop your plugins locally without the need to publish to npm,
   * you can send declare your plugins inside your project locally.
   *
   * @NOTE: Please be aware that you can declare only one local plugin.
   */
  plugins: [
    {
      rules: {
        'local-plugin': ({ raw }) => {
          const commit = commitParser(raw);
          const refs = commit.references;
          const type = commit.type;
          const errors: string[] = [];
          if (refs.length === 0 && !type) {
            errors.push('Issue-reference or Commit-type is required');
            errors.push(`Use one of COMMIT_TYPES: ${COMMIT_TYPES} (example: "${COMMIT_TYPES[0]}: issue description")`);
            errors.push(
              `Or add ISSUE_PREFIXES: ${ISSUE_PREFIXES} in commit message (example: "${ISSUE_PREFIXES[0]}123: issue description")`,
            );
          } else {
            if (type && COMMIT_TYPES.includes(type) === false) {
              errors.push(`Unknown commit type: "${type}". Use one of the following: ${COMMIT_TYPES}`);
            }
            if (!type && refs.length === 0) {
              errors.push(
                `There are no allowed Issue-references in Commit-message. Use one of the following: ${ISSUE_PREFIXES}`,
              );
            }
          }
          // console.info(commit);
          return result(
            errors.length === 0,
            [
              'There are some errors reported by commitlint:',
              //
              ...errors.map((error) => `- ${error}`),
            ].join('\n      '),
          );
          function result(isPassed: boolean, notPassedMessage?: string): [boolean, string] {
            return [isPassed, notPassedMessage];
          }
        },
      },
    },
  ],
};

export default Configuration;
