---
title: Chainlink
description: How to use request data from a Chainlink Oracle in your Moonbeam Ethereum Dapp using smart contracts or Javascript
---

# Chainlink Oracle

![Chainlink Moonbeam Banner](/images/chainlink/chainlink-banner.png)

## Introduction

Developers can now use [Chainlink's decentralized Oracle network](https://chain.link/) to fetch data in the Moonbase Alpha TestNet. Chainlink Oracles can be used in a couple different ways, with the [Basic Request Model](https://docs.chain.link/docs/architecture-request-model) and [Price Feeds](https://docs.chain.link/docs/architecture-decentralized-model). 

## The Client Contract

The Client contract is the element that starts the communication with the Oracle by sending a request. You can use the Moonbase Alpha Client contract or your own custom Client contract to retrieve data.

### Moonbase Alpha Client Contract

To simplify the process of requesting price feeds, there is a custom Moonbase Alpha Client contract deployed at `{{ networks.moonbase.chainlink.client_contract }}`.

### Run your Client Contract

If you want to run your Client contract but use our Oracle node, you can do so with the following information:

|  Contract Type  |     |                      Address                      |
| :-------------: | --- | :-----------------------------------------------: |
| Oracle Contract |     | {{ networks.moonbase.chainlink.oracle_contract }} |
|   LINK Token    |     |  {{ networks.moonbase.chainlink.link_contract }}  |

Remember that the LINK token payment is set to zero.

### Requests

Chainlink's Oracles can tentatively provide many different types of data feeds with the use of external adapters. However, for simplicity, our Oracle node is configured to deliver only price feeds.

If you are interested in running your own Oracle node in Moonbeam, please visit [this guide](/node-operators/oracles/chainlink-node/). Also, we recommend going through [Chainlink's documentation site](https://docs.chain.link/docs).

## Step-by-step Tutorials

For a more detailed step-by-step guide on how to request data from the Chainlink oracle, check out the following tutorial:

- [Using the Chainlink Oracle with Moonbeam](/tutorials/moonbase-alpha/oracles/chainlink/)