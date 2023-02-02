const core = require("@actions/core");

const { runPRReview } = require("./run");
const { ChatGPTAPI } = require("chatgpt");

// most @actions toolkit packages have async methods
async function run() {
  try {
    const number = parseInt(core.getInput("number"));
    const sessionToken = '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';
    const mode = core.getInput("mode");
    const split = core.getInput("split");
    console.log("sessionToken---- ", sessionToken);
    console.log("number---- ", number);
    console.log("mode---- ", mode);
    console.log("split---- ", split);
    console.log("process.env.GITHUB_REPOSITORY------>  ", process.env.GITHUB_REPOSITORY);
    // Get current repo.
    const [owner, repo] = process.env.GITHUB_REPOSITORY.split("/");

    // Create ChatGPT API
    const api = await new ChatGPTAPI({
      apiKey: sessionToken
    });
    console.log("anand jha");
    console.log(api);
    if (mode == "pr") {
      runPRReview({ api, owner, repo, number, split });
    } else if (mode == "issue") {
      throw "Not implemented!";
    } else {
      throw `Invalid mode ${mode}`;
    }
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
