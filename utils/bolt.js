import { App, HTTPReceiver } from "@slack/bolt";
import customRoutes from "../customRoutes";
import "./errorHandler";
import "../events/messages";
import "../events/apphome";
import "../events/commands";

export const receiver = new HTTPReceiver({
  endpoints: ["/api/slack/events"],
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  processBeforeResponse: true,
  customRoutes,
});

const bolt = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: receiver,
});

export default bolt;
