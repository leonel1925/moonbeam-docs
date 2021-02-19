---
title: Eth Comparison
description: It can seem daunting to move to a Polkadot parachain if you’re used to Ethereum. Here’s what to expect when using Moonbeam for the first time.
---

## Differences Between Moonbeam and Ethereum

## Introduction

While Moonbeam strives to be compatible with Ethereum's Web3 API and EVM, there are a number of important Moonbeam differences.

This guide will outline some of the main differences, and what to expect when using Moonbeam for the first time.

## Consensus Mechanism

In short, consensus is a way for different parties to come to an ageement over a shared state. As blocks are created, different nodes in the network must agree which block will represent the next valid state.

Moonbeam uses a block production mechanism based on the [Polkadot consensus](https://wiki.polkadot.network/docs/en/learn-consensus), which is Proof of Stake-based . In such mechanism, there are collators and validators. [Collators](https://wiki.polkadot.network/docs/en/learn-collator) mantain parachains (in this case Moonbeam) by collecting transactions from users and producing state transition proofs for the Relay Chain [validators](https://wiki.polkadot.network/docs/en/learn-validator). The collators set (nodes that produce blocks) are selected based on the stake the have in the network. 

This is very different when compared to Ethereum's Proof of Work, which means that Proof of Work concepts, such as difficulty, uncles, hashrate, etc., generally don’t have meaning within Moonbeam.  

For APIs that return values related to Ethereum’s Proof of Work, we return default values.  Existing Ethereum contracts that rely on Proof of Work internals (e.g., mining pool contracts) will almost certainly not work as expected on Moonbeam.

## Probabilistic vs Instant Finality

First, Moonbeam uses a Proof of Stake-based consensus mechanism, which means that Proof of Work concepts, such as difficulty, uncles, hashrate, etc., generally don’t have meaning within Moonbeam.  For APIs that return values related to Ethereum’s Proof of Work, we return default values.  Existing Ethereum contracts that rely on Proof of Work internals (e.g., mining pool contracts) will almost certainly not work as expected on Moonbeam.

Another significant difference between Moonbeam and Ethereum is that Moonbeam includes an extensive set of on-chain governance features based on Substrate functionality.  These onchain governance modules include functionality to power upgrades to the blockchain itself based on token weighted voting.

##What Stays the Same
If you're moving portions of your existing workloads and state off of Ethereum Layer 1 to Moonbeam, you can expect minimal required changes (aside from the exceptions noted above). Your applications, contracts, and tools will largely remain unchanged.

Moonbeam supports:

* **Solidity-Based Smart Contracts**
* **Ecosystem Tools** (e.g., block explorers, front-end development libraries, wallets)
* **Development Tools** (e.g., Truffle, Remix, MetaMask)
* **Ethereum Tokens via Bridges** (e.g., token movement, state visibility, message passing)

## Governance and Staking

Write about how Moonbeam has Governance and Staking, Substrate based features.
