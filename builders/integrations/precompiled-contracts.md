---
title: Precompiled Contracts
description:  Learn how to use precompiled contracts on Moonbase Alpha, the Moonbeam Network TestNet that is unique for its complete Ethereum compatibility. 
---

# Precompiled Contracts

![Precompiled Contracts Introduction](/images/precompiled-contracts/precompiled-banner.png)

## Introduction

Ethereum provides precompiled contracts that are natively available contracts for running common yet complex operations such as hashing or encrpytion without the overhead of the EVM. Precompiled contracts are run on the client side and therefore do not require the EVM. Since the EVM is not required, the precompiles run fast and cost less. With the [release of Moonbase Alpha v2](https://moonbeam.network/announcements/moonbase-alpha-v2-contract-events-pub-sub-capabilities/) is the inclusion of some of these precompiled contracts.

## Precompiled Contracts on Moonbase Alpha

The precompiles currently available on Moonbase Alpha are [ecrecover](/tutorials/moonbase-alpha/precompiled-contracts/#verify-signatures-with-ecrecover), [sha256](/tutorials/moonbase-alpha/precompiled-contracts/#hashing-with-sha256), [ripemd-160](/tutorials/moonbase-alpha/precompiled-contracts/#hashing-with-ripemd-160), [identity function](/tutorials/moonbase-alpha/precompiled-contracts/#the-identity-function), and [modular exponentiation](/tutorials/moonbase-alpha/precompiled-contracts/#modular-exponentiation).

|     Address    | |    Precompiled Contract    | |  Description                      |
|:--------------:|-|:--------------------------:|-|:---------------------------------:|
|      0x01      | | ecrecover                  | | Recovers ECDSA signature          |
|      0x02      | | sha256                     | | SHA256 hash given data            |
|      0x03      | | ripemd160                  | | RIPEMD160 hash given data         |
|      0x04      | | identity function          | | datacopy given data               |
|      0x05      | | modular exponentiation     | | Calculates modular exponentiation |

## Step-by-step Tutorials

If you're interested in learning about how to use and interact with these precompiled contracts on Moonbeam, check out the following tutorial(s):

- [Using Precompiled Contracts on Moonbase Alpha](/tutorials/moonbase-alpha/precompiled-contracts/)