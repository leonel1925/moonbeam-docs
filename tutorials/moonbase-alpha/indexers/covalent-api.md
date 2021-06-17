---
title: Covalent API
description: Learn how to query blockchain data with the Covalent API on the Moonbeam Network.
---

# Using the Covalent API on Moonbase Alpha

![The Graph on Moonbeam](/images/covalent/covalentbannerimage.png)

## Introduction

Covalent provides a unified API to bring full transparency and visibility to assets across all blockchain networks. Covalent supports Moonbase Alpha and plans to support Moonbeam and Moonriver. If you're interested in learning more check out the [Covalent API](/builders/integrations/indexers/covalent-api/) page of our documentation.

In this guide, you will learn how to use the Covalent API to query blockchain data on Moonbase Alpha.

## Checking Prerequisites

All requests require authentication; you will need [a free API Key](https://www.covalenthq.com/platform/#/auth/register/) to use the Covalent API. 
Also, you will need the following:

 - Have MetaMask installed and [connected to Moonbase](/getting-started/moonbase/metamask/)
 - Have an account with funds, which you can get from [Mission Control](/builders/getting-started/moonbase-alpha/#get-tokens)

## Using the Covalent API on Moonbase Alpha

First, make sure you have [your API Key](https://www.covalenthq.com/platform/#/auth/register/) which begins with “ckey_”. For this API call, you’re going to need the following: 

 - Your API Key
 - Moonbase Alpha Chain ID: 1287
 - Contract Address (ERTH Token in this example): 0x08B40414525687731C23F430CEBb424b332b3d35

### Using Curl

The token holders endpoint returns a list of all the token holders of a particular token.

To call the token holders endpoing, try running the command below in a terminal window after replacing the placeholder with your API key:

```
curl https://api.covalenthq.com/v1/1287/tokens/\
0x08B40414525687731C23F430CEBb424b332b3d35/token_holders/ \
-u <YOUR-API-KEY>:
```

!!! note
    The colon `:` after the API key is important because otherwise you will be prompted for a password (which is not needed).


The Covalent API will return a list of token holders for the ERTH token. Unless you already owned some ERTH tokens, your address will be missing from that list. Head over to the [Moonbase Alpha ERC-20 Faucet](https://moonbase-minterc20.netlify.app/) to generate some ERTH tokens for yourself. Now repeat the same Covalent API request as above. The Covalent API updates in real-time, so you should now see your address in the list of token holders for the ERTH token.

### Javascript Examples
Copy and paste the below code block into your preferred environment, or [JSFiddle](https://jsfiddle.net/). After setting the API key, set the address constant. Remember our chain ID is `1287` for Moonbase Alpha.

=== "Using Fetch"
    ```js
      // set your API key
    const APIKEY = '<YOUR-API-KEY>';

    function getData() {
      const address = '0xFEC4f9D5B322Aa834056E85946A32c35A3f5aDD8'; //example
      const chainId = '1287'; //Moonbeam Testnet (Moonbase Alpha Chain ID)
      const url = new URL(`https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/`);
      
      url.search = new URLSearchParams({
          key: APIKEY
      })

      // use fetch API to get Covalent data
      fetch(url)
      .then((resp) => resp.json())
      .then(function(data) {
          const result = data.data;
    
          console.log(result)
          return result
          }
    )}

      getData();
    ```

=== "Using Async"
    ```js
      // set your API key
      const APIKEY = '<YOUR-API-KEY>';
    const address = '0xFEC4f9D5B322Aa834056E85946A32c35A3f5aDD8'; //example
    const chainId = '1287'; //Moonbeam Testnet (Moonbase Alpha Chain ID)
    const url = new URL(`https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/`);

      url.search = new URLSearchParams({
          key: APIKEY
      })

      async function getData() {
        const response = await fetch(url);
        const result = await response.json();
        console.log(result)
        return result;
    }

    getData();
    ```

The output should resemble the below. The balances endpoint returns a list of all ERC20 and NFT token balances including ERC721 and ERC1155 along with their current spot prices (if available).

![Javascript Console Output](/images/covalent/covalentjs.png)

### Python Example

Covalent doesn’t have an official API wrapper. To query the API directly you will have to use the Python [requests library](https://pypi.org/project/requests/). Install requests into your environment from the command line with `pip install requests`. Then import it and use it in your code. Use the HTTP verbs get methods to return the information from the API. Copy and paste the below code block into your preferred environment and run it. The output should look similiar to the screenshot above, however the formatting may vary depending on your environment.

```python
import requests

def fetch_wallet_balance(address):
	api_url = 'https://api.covalenthq.com'
    endpoint = f'/v1/1287/address/{address}/balances_v2/'
    url = api_url + endpoint
    r = requests.get(url, auth=('<YOUR-API-KEY>',''))
    print(r.json())
    return(r.json())

#Example address request
fetch_wallet_balance('0xFEC4f9D5B322Aa834056E85946A32c35A3f5aDD8')

```

!!! note
    The 2nd parameter of `auth` is empty, because there is no password required - your API key is all that's needed.


