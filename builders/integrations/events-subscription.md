---
title: Events Subscription
description: Use Ethereum-like publish-subscribe functionality to subscribe to specific events on Moonbeam's Ethereum-compatible chain.
---

# Event Subscription

![Events Subscription Introduction](/images/testnet/testnet-pubsub-banner.png)

## Introduction

What are events? Why do you want to subscribe to them?  

As of the [Moonbase Alpha v2 release](https://moonbeam.network/announcements/testnet-upgrade-moonbase-alpha-v2/), you can now subscribe to events. 

## Subscribe to Events in Moonbeam

Event subscription is available when running a local Moonbeam development node or on the Moonbase Alpha TestNet. To subscribe to events on either network, you'll need the following configurations:

Moonbeam development node:

--8<-- 'text/metamask-local/development-node-details.md'

Moonbase Alpha:

--8<-- 'text/testnet/testnet-details.md'

To get started subscribing to events on Moonbeam, configure the [Web3 JS Library](/builders/tools/eth-libraries/web3.js/) to subscribe to specific events for a given address:

```javascript
const Web3 = require('web3');
/* You can use the Moonbase Alpha or Moonbeam development node RPC URL to instantiate Web3 */
const web3 = new Web3('wss://wss.testnet.moonbeam.network');

web3.eth.subscribe('logs', {
  address: 'ContractAddress',
  topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef']
}, (error, result) => {
  if (error) {
    console.error(error);
  }
})
.on("connected", function (subscriptionId) {
  console.log(subscriptionId);
})
.on("data", function (log) {
  console.log(log);
});
```

## Current Limitations
The pub/sub implementation in [Frontier](https://github.com/paritytech/frontier) is still in active development. This first version allows DApp developers (or users in general) to subscribe to specific event types, but there are still some limitations.

## Step-by-step Tutorials

For a more detailed step-by-step guide, check out our related event subscription tutorial:

- [Subscribe to Events in Moonbase Alpha](/tutorials/moonbase-alpha/events-subscription/)