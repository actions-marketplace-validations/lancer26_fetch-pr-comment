'use strict';

const core = require('@actions/core');
const github = require('@actions/github');


async function fetchPR() {
  try {

    const repository = process.env.GITHUB_REPOSITORY;
    const [owner, repo] = repository.split("/");

    console.log(process.env);

    const octokit = github.getOctokit(process.env.ACTIONS_RUNTIME_TOKEN);

    const { data: comments } = await octokit.issues.listComments({
      owner: owner,
      repo: repo,
      issue_number: process.env.PR_NUMBER,
    });

    console.log("???")

    const payload = JSON.stringify(github.context.payload, undefined, 2);
    console.log(`The event payload: ${payload}`);

    const firstCommnet = JSON.stringify(comments[0], undefined, 2);
    console.log(`first comments ${firstCommnet}`)
  } catch (error) {
    core.setFailed(error.message);
  }
}

module.exports.run = fetchPR;

fetchPR();