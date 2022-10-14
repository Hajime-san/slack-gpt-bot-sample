# Slack GPT Bot sample

## 1. Collect your dataset
- Creat a Slack app with below permissions.\
`users:read.email`,`channels:history`,`groups:history`,`im:history`,`mpim:history`
- Scraping Slack channels messages by user\
`cd typescript/scraper && deno run --allow-net --allow-write --arrow-read index.ts`
- **Plsease check the bias of your collected dataset before step 2**

## 2. Train the model
- Train your dataset.txt on the service like `Google Colab`, or your local machine.
  - [https://github.com/tanreinama/gpt2-japanese#gpt2-japanese](https://github.com/tanreinama/gpt2-japanese#gpt2-japanese)
- Build and test your model in container.
  - [README.MD](.docker/README.MD)

## 3. Deploy container
- It takes about 5 to 10 minutes.

## 4. Deploy Slack app
- Let' go!
  - [README.MD](typescript/scheduler-bot/README.md)
