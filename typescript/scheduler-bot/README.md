**Guide Outline**:

- [Setup](#setup)
  - [Install the Slack CLI](#install-the-slack-cli)
  - [Clone the Template](#clone-the-template)
- [Create a Link Trigger](#create-a-link-trigger)
- [Running Your Project Locally](#running-your-project-locally)
- [Testing](#testing)
- [Deploying Your App](#deploying-your-app)
  - [Viewing Activity Logs](#viewing-activity-logs)
- [Project Structure](#project-structure)
- [Resources](#resources)

---

## Setup

Before getting started, make sure you have a development workspace where you have permissions to install apps. If you
don’t have one set up, go ahead and [create one](https://slack.com/create). Also, please note that the workspace
requires any of [the Slack paid plans](https://slack.com/pricing).

### Install the Slack CLI

To use this sample, you first need to install and configure the Slack CLI. Step-by-step instructions can be found in our
[Quickstart Guide](https://api.slack.com/future/quickstart).

## Create a Link Trigger

`slack trigger create --trigger-def "triggers/message_trigger.ts"`

## Local development

`slack run`\
And you will get a error like,\
`🚫  Error: write tcp 000.00.000.000:00000->0.000.000.00:000: write: broken pipe`\
because API needs about 100 seconds to respond.

## Deploy

`slack deploy`
