---
title: Debug & Trace
description:  Learn how to leverage the Geth Debug API and OpenEthereum Trace module on Moonbeam
---

# Debug API & Trace Module

![Full Node Moonbeam Banner](/images/debugtrace/debugtrace-banner.png)

## Introduction

With the release of Moonbase Alpha v7, as part of Moonbeam's goal of providing a seamless Ethereum experience for developers, both `debug_traceTransaction` and `trace_filter` RPC methods are now available. To use both features you need to have a node running with the `debug` and `trace` flags.

This guide will show you how to use the `debug_traceTransaction` and `trace_filter` RPC methods against a locally running Moonbase Alpha full node. To spin up a full node, check out our [Run a Node](/node-operators/networks/run-a-node/) documentation.


## Try it on Moonbase Alpha 

For this example, a local Moonbase Alpha full node is used, with the RPC HTTP endpoint at `http://127.0.0.1:9933`. If you have a running node, you should see a similar terminal log:

![Debug API](/images/debugtrace/debugtrace-images1.png)

For example, for the `debug_traceTransaction` call, you can make the following JSON RPC request in your terminal (in this case, for the transaction hash `0x04978f83e778d715eb074352091b2159c0689b5ae2da2554e8fe8e609ab463bf`):

```
curl http://localhost:9933 -H "Content-Type:application/json;charset=utf-8" -d \
  '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"debug_traceTransaction",
    "params": ["0x04978f83e778d715eb074352091b2159c0689b5ae2da2554e8fe8e609ab463bf"]
  }'
```

The node responds with the step-by-step replayed transaction information (response was cropped as it is quite long):

![Trace Debug Node Running](/images/debugtrace/debugtrace-images2.png)

For the `trace_filter` call, you can make the following JSON RPC request in your terminal (in this case, the filter is from block 20000 to 25000, only for transactions where the recipient is  `0x4E0078423a39EfBC1F8B5104540aC2650a756577`, it will start with a zero offset and provide the first 20 traces):

```
curl http://localhost:9933 -H "Content-Type:application/json;charset=utf-8" -d \
  '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"trace_filter", "params":[{"fromBlock":"0x4E20","toBlock":"0x5014","toAddress":["0x4E0078423a39EfBC1F8B5104540aC2650a756577"],"after":0,"count":20}]
  }'
```

The node responds with the trace information corresponding to the filter (response was cropped as it is quite long).

![Trace Filter Node Running](/images/debugtrace/debugtrace-images3.png)
