---
title: ChainBridge
description: How to use ChainBridge to connect assets between Ethereum and Moonbeam using smart contracts
---
# ChainBridge's Ethereum Moonbeam Bridge

![ChainBridge Moonbeam banner](/images/chainbridge/chainbridge-banner.png)

## Introduction

A bridge allows two economically sovereign and technologically different chains to communicate with each other. They can range from centralized and trusted, to decentralized and trust minimized. One of the currently available solutions is [ChainBridge](https://github.com/ChainSafe/ChainBridge#installation), a modular multi-directional blockchain bridge built by [ChainSafe](https://chainsafe.io/). A ChainBridge implementation is now available in Moonbeam, which connects our Moonbase Alpha TestNet and Ethereum's Kovan/Rinkeby TestNets.
## How the Bridge Works

ChainBridge is, at its core, a message-passing protocol. Events on a source chain are used to send a message that is routed to the destination chain. There are three main roles:

 - Listener: extract events from a source chain and construct a message
 - Router: passes the message from the Listener to the Writer
 - Writer: interpret messages and submit transactions to the destination chain
 
ChainBridge currently relies on trusted relayers to perform these roles. However, it features a mechanism that prevents any individual relayer from abusing their power and mishandling funds. At a high-level, relayers create proposals in the target chain that are submitted for approval by other relayers. Approval voting happens also in the target chain, and each proposal is only executed after it meets a certain voting threshold. 

On both sides of the bridge, there are a set of smart contracts, where each has a specific function:

 - **Bridge contract** — users and relayers interact with this contract. It delegates calls to the handler contracts for deposits, starts a transaction on the source chain, and for executions of the proposals on the target chain
 - **Handler contracts** — validates the parameters provided by the user, creating a deposit/execution record
 - **Target contract** — as the name suggests, this is the contract we are going to interact with on each side of the bridge

### General Workflow


The general workflow is the following (from Chain A to Chain B):
 
  - A user initiates a transaction with the _deposit()_ function in the bridge contract of Chain A. Here, the user needs to input the target chain, the resource ID, and the _calldata_ (definitions after the diagram). After a few checks, the _deposit()_  function of the handler contract is called, which executes the corresponding call of the target contract.
  - After the function of the target contract in Chain A is executed, a _Deposit_ event is emitted by the bridge contract, which holds the necessary data to be executed on Chain B. This is called a proposal. Each proposal can have five status (inactive, active, passed, executed and cancelled). 
  - Relayers are always listening on both sides of the chain.  Once a relayer picks up the event, he initiates a voting on the proposal, which happens on the bridge contract on Chain B. This sets the state of the proposal from inactive to active.
  - Relayers must vote on the proposal. Every time a relayer votes, an event is emitted by the bridge contract that updates its status. Once a threshold is met, the status changes from active to passed. A relayer then executes the proposal on Chain B via the bridge contract.
  - After a few checks, the bridge executes the proposal in the target contract via the handler contract on Chain B. Another event is emitted, which updates the proposal status from passed to executed.

This workflow is summarized in the following diagram:

![ChainBridge Moonbeam diagram](/images/chainbridge/chainbridge-diagram.png)

The two target contracts on each side of the bridge are linked by doing a series of registrations in the corresponding handler contract via the bridge contract. These registrations currently can only be done by the bridge contract admin.

### General Definitions

Here we have put together a list of concepts applicable to the ChainBridge implementation (from Chain A to Chain B):

 - **ChainBridge Chain ID** — this is not to be confused with the chain ID of the network. It is a unique network identifier used by the protocol for each chain. It can be different from the actual chain ID of the network itself. For example, for Moonbase Alpha and Rinkeby, we've set the ChainBridge chain ID to 43 and 4 respectively (Kovan was set to 42)
 - **Resource ID** — is a 32 bytes word that is intended to uniquely identify an asset in a cross-chain environment. Note that the least significant byte is reserved for the chainId, so we would have 31 bytes in total to represent an asset of a chain in our bridge. For example, this may express tokenX on Chain A is equivalent to tokenY on Chain B
 - **Calldata** — is the parameter required for the handler that includes the information necessary to execute the proposal on Chain B. The exact serialization is defined for each handler. You can find more information [here](https://chainbridge.chainsafe.io/chains/ethereum/#erc20-erc721-handlers)
### Generic Handler

The Generic Handler offers the possibility of executing a function in chain A and creating a proposal to execute another function in chain B (similar to the general workflow diagram). This provides a compelling way of connecting two independent blockchains.

The generic handler address is:
```
{{ networks.moonbase.chainbridge.generic_handler }}
```

If you are interested in implementing this functionality, you can reach out directly to us via our [Discord server](https://discord.com/invite/PfpUATX). We'll be happy to discuss this implementation.

### Moonbase Alpha ChainBridge UI

If you want to play around with transferring ERC20S tokens from Moonbase Alpha to Kovan or Rinkeby without having to set up the contracts in Remix, you can checkout our [Moonbase Alpha ChainBridge UI](https://moonbase-chainbridge.netlify.app/transfer).

## Step-by-step Tutorials

If you are interested in a more detailed step-by-step guide, go to our specific tutorial about using the Ethereum Moonbeam ChainBridge:

- [Transfer Tokens with ChainBridge's Ethereum Moonbeam Bridge](/tutorials/moonbase-alpha/chainbridge/)

