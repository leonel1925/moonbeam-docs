---
title: Debug & Trace
description:  Learn how to leverage the Geth Debug API and OpenEthereum Trace module on Moonbeam
---

# Debug API & Trace Module

![Full Node Moonbeam Banner](/images/debugtrace/debugtrace-banner.png)

## Introduction

Both Geth's debug API and OpenEthereum's trace module provide non-standard RPC methods for getting a deeper insight into transaction processing.

With the release of Moonbase Alpha v7, as part of Moonbeam's goal of providing a seamless Ethereum experience for developers, both `debug_traceTransaction` and `trace_filter` RPC methods are now available.

Supporting both RPC methods is an important milestone because many projects, such as [The Graph](https://thegraph.com/) or [Blockscout](https://docs.blockscout.com/), rely on them to index blockchain data.

Both calls are quite heavy on the node's side. Therefore, it is required to make this RPC against a locally running node with either the `--ethapi=debug` flag for `debug_traceTransaction`, and/or the `--ethapi=trace` flag for `trace_filter`. Currently, you can spin up two different kinds of nodes:

 - **Moonbeam development node** — run your own Moonbeam instance in your private environment. To do so, you can follow [this guide](/builders/getting-started/local-node/). Make sure to check the [advanced flags section](/builders/getting-started/local-node/#advanced-flags-and-options)
 - **Moonbase Alpha node** — run a full node of the TestNet and access your own private endpoints. To do so, you can follow [this guide](/node-operators/networks/run-a-node/). Make sure to check the [advanced flags section](/node-operators/networks/run-a-node/#advanced-flags-and-options)

## Geth Debug API

The `debug_traceTransaction` RPC implementation follows [Geth's debug API guidelines](https://geth.ethereum.org/docs/rpc/ns-debug#debug_tracetransaction).

The RPC method requires the transaction hash to run. As optional parameters you can provide the following:

 - **disableStorage** — one input: boolean (default: _false_). Setting this to true disables storage capture
 - **disableMemory** — one input: boolean (default: _false_). Setting this to true disables memory capture
 - **disableStack** — one input: boolean (default: _false_). Setting this to true disables stack capture

JavaScript based transaction tracing is not supported at the moment.

## Trace Module

The `trace_filter` RPC implementation follows [OpenEthereum's trace module guidelines](https://openethereum.github.io/JSONRPC-trace-module#trace_filter).

The RPC method requires any of the following optional parameters:

 - **fromBlock** — one input: either block number (`hex`), `earliest` which is the genesis block or `latest` (default) best block available. Trace starting block
 - **toBlock** — one input: either block number (`hex`), `earliest` which is the genesis block or `latest` best block available. Trace ending block
 - **fromAddress** — one input: array of addresses. Filter transactions done from these addresses only. If an empty array is provided, no filtering is done with this field
 - **toAddress** — one input: array of addresses. Filter transactions done from these addresses only. If an empty array is provided, no filtering is done with this field
 - **after** — one input: offset (`uint`), default is `0`. Trace offset (or starting) number
 - **count** — one input: number of traces (`uint`). Number of traces to display in a batch

## Step-by-step Tutorials

 If you are interested in a more detailed step-by-step guide, go to our specific tutorials about using the `debug` and `trace` flags with Moonbeam:

 - Try the [Debug & Trace Module](/tutorials/moonbase-alpha/debug-&-trace/) on Moonbase Alpha