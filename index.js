'use strict';

const core = require('@actions/core');
const github = require('@actions/github');


async function fetchPR() {
  try {

    const repository = process.env.GITHUB_REPOSITORY;
    const [owner, repo] = repository.split("/");

    const octokit = github.getOctokit(process.env.GITHUB_TOKEN);

    const {'data': data} = await octokit.pulls.get({
      owner: owner,
      repo: repo,
      pull_number: process.env.PR_NUMBER,
    });

    core.setOutput('first-comment', data.body);
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports.run = fetchPR;

fetchPR();