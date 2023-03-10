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
    console.log("process.env.GITHUB_REPOSITORY------>  111", process.env.GITHUB_REPOSITORY);
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
