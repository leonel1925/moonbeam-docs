---
title: Covalent API
description: Querying Blockchain Data with the Covalent API Moonbeam
---

# Getting Started with the Covalent API

![The Graph on Moonbeam](/images/covalent/covalentbannerimage.png)

## Introduction

Covalent provides a unified API to bring full transparency and visibility to assets across all blockchain networks. Simply put, Covalent offers a single API that allows you to pull detailed, granular blockchain transaction data from multiple blockchains with no code. The unified Covalent API allows you to create entirely new applications or augment existing ones without configuring or maintaining infrastructure. Covalent supports Moonbase Alpha and plans to support Moonbeam and Moonriver.

## Types of Endpoints

The Covalent API has two classes of endpoints:

 - **Class A** — endpoints that return enriched blockchain data applicable to all blockchain networks, eg: balances, transactions, log events, etc
 - **Class B** — endpoints that are for a specific protocol on a blockchain, e.g. Uniswap is Ethereum-only and is not applicable to other blockchain networks

## Fundamentals of the Covalent API
 - The Covalent API is RESTful and it is designed around the main resources that are available through the web interface
 - The current version of the API is version 1 
 - The default return format for all endpoints is JSON 
 - All requests require authentication; you will need [a free API Key](https://www.covalenthq.com/platform/#/auth/register/) to use the Covalent API
 - The root URL of the API is https://api.covalenthq.com/v1/ 
 - All requests are done over HTTPS (calls over plain HTTP will fail)
 - The refresh rate of the APIs is real-time: 30s or 2 blocks, and batch 10m or 40 blocks  

## Supported Endpoints
 - **Balances** — Get token balances for an address. Returns a list of all ERC20 and NFT token balances including ERC721 and ERC1155 along with their current spot prices (if available)
 - **Transactions** — Retrieves all transactions for an address including decoded log events. Does a deep-crawl of the blockchain to 
 retrieve all transactions that reference this address
 - **Transfers** — Get ERC20 token transfers for an address along with historical token prices (if available)
 - **Token Holders** — Return a paginated list of token holders
 - **Log Events (Smart Contract)** — Return a paginated list of decoded log events emitted by a particular smart contract
 - **Log Events (Topic Hash)** — Return a paginated list of decoded log events with one or more topic hashes separated by a comma


### Request Formatting
   | Endpoint |     | Format |
   | :---------- | :-: | :------------------- |
   |      Balances       |     |          api.covalenthq.com/v1/1287/address/{address}/balances_v2/          |
   |      Transactions       |     |           api.covalenthq.com/v1/1287/address/{address}/transactions_v2/|
   |      Transfers       |     |           api.covalenthq.com/v1/1287/address/{address}/transfers_v2/           |
   |      Token Holders       |     |           api.covalenthq.com/v1/1287/tokens/{contract_address}/token_holders/           |
   |      Log Events (Smart Contract)       |     |           api.covalenthq.com/v1/1287/events/address/{contract_address}/           |
   |      Log Events (Topic Hash)      |     |           api.covalenthq.com/v1/1287/events/topics/{topic}/           |

## Community Built Libraries
Covalent currently has libraries in Python, Node, and Go, which are built and maintained by the community as part of the [Covalent Alchemists Program](https://www.covalenthq.com/ambassador/). The tools have been built by the community to provide value to users of the Covalent API and are [available here](https://www.covalenthq.com/docs/tools/community).

!!! note
    Note: These tools are NOT maintained by Covalent and users should do their due diligence in evaluating these tools before using them in their projects.


## Step-by-step Tutorials

To get started with the Covalent API, check out the following detailed, step-by-step guides:

- [Using Covalent API on Moonbase Alpha](/tutorials/moonbase-alpha/indexers/covalent-api/)