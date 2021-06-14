---
title: Razor Network
description: How to use request data from a Razor Network Oracle in your Moonbeam Ethereum DApp using smart contracts
---
# Razor Network Oracle

![Razor Network Moonbeam Diagram](/images/razor/razor-banner.png)

## Introduction

Developers can now fetch prices from Razor Network’s oracle using a Bridge contract deployed on the Moonbase Alpha TestNet. This Bridge acts as middleware, and events emitted by it are fetched by the Razor Network's oracle infrastructure, sending prices to the Bridge contract.

To access these price feeds, we need to interact with the Bridge contract address, which can be found in the following table:

|     Network    | |         Contract Address        |
|:--------------:|-|:------------------------------------------:|
| Moonbase Alpha | | 0x53f7660Ea48289B5DA42f1d79Eb9d4F5eB83D3BE |

## Jobs

Each data-feed has a Job ID attached to it. For example:

|    Job ID    | |    Underlying Price [USD]  |
|:------------:|-|:--------------------------:|
|       1      | |            ETH             |
|       2      | |            BTC             |
|       3      | |      Microsoft Stocks      |

You can check Job IDs for each data-feed at the following [link](https://razorscan.io/#/custom). Price feeds are updated every 5 minutes. More information can be found in [Razor's documentation website][https://docs.razor.network/].

## Bridge Contract

Contracts can query on-chain data such as token prices, from Razor Network's oracle by implementing the interface of the Bridge contract, which exposes the `getResult` and `getJob` functions.

```
pragma solidity 0.6.11;

interface Razor {
    
    function getResult(uint256 id) external view returns (uint256);
    
    function getJob(uint256 id) external view returns(string memory url, string memory selector, string memory name, bool repeat, uint256 result);
}
```
### Moonbase Alpha Bridge Contract

We've deployed the bridge contract in the Moonbase Alpha TestNet (at address `{{ networks.moonbase.razor.bridge_address }}`) so you can quickly check the information fed from Razor Network's oracle. 

## Step-by-step Tutorials

For a more detailed step-by-step guide on how to use the Razor interface and Moonbase Alpha bridge contract to retrieve data, check out the following tutorial:

- [Using Razor Network Oracle with Moonbeam](/tutorials/moonbase-alpha/oracles/razor-network/)