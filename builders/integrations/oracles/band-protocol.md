---
title: Band Protocol
description: How to use request data from a Band Protocol Oracle in your Moonbeam Ethereum DApp using smart contracts or javascript
---
# Band Protocol Oracle

![Band Protocol Moonbeam Diagram](/images/band/band-banner.png)

## Introduction

Developers have two ways to fetch prices from Band’s oracle infrastructure. On one hand, they can use Band’s smart contracts on Moonbeam. Doing so, they access data that is on-chain and is updated either at regular intervals or when price slippage is more than a target amount (different for each token). On the other hand, devs can use the Javascript helper library, which uses an API endpoint to fetch the data using similar functions as those from the smart contracts, but this implementation bypasses the blockchain entirely.  This can be useful if your DApp front-end needs direct access to the data.

The Aggregator Contract address can be found in the following table:

|     Network    | |         Aggregator Contract Address        |
|:--------------:|-|:------------------------------------------:|
| Moonbase Alpha | | 0xDA7a001b254CD22e46d3eAB04d937489c93174C3 |

## Supported Token
Price queries with any denomination are available as long as the base and quote symbols are supported (_base_/_quote_). For example:

 - `BTC/USD`
 - `BTC/ETH`
 - `ETH/EUR`

At the time of writing, the list of supported symbols can be found by following [this link](https://data.bandprotocol.com). There are more than 146 price pairs available to query.

## Querying Prices
As stated before, developers can leverage two methods to query prices from Band's oracle: 

 - Band's smart contract on Moonbeam (deployed to Moonbase Alpha TestNet for now)
 - Javascript helper library

## Step-by-step Tutorials

For a more detailed step-by-step guide on how to get on-chain data for Moonbeam using Band's oracle infrastructure, check out the following tutorial:

- [Using Band Protocol Oracle with Moonbeam](/tutorials/moonbase-alpha/oracles/band-protocol/)