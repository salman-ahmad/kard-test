# kard-interview

## Overview

Before starting you are expected to **Fork** this repository to your own local repo. All work should be done in your repo and when complete should be submitted via Pull Request.

The boilerplate is built on the following:

    - Node 10.x.x

To run the project run the following: 

`npm start`

**Your task is to create a text file from a transaction JSON file (provided) and write the file (JSON) format into the output folder.**<br />
All fields should contain values with pipe delimited format.
  
**Header should contain the following:**  
  V1.0|STARTFEED|Kard|[timeStamp in ISO format]|[# of total lines in this text file not including the header and the footer]
  
**Main content should contain the following:**  
- First row should always be the aggregate sum of the total commission issued to a specific user. *Please take into account for negative value as well
- Rest should display itemized transactions for a specific user.

1||[referringPartnerAccountId]||AGG|||[sum of the commissionToUserInCents]||  
2|[_id]|[referringPartnerAccountId]|[offer._id]|[status]|[transactionDate]|[merchantName]|[commissionToUserInCents]|[transactionAmountInCents]|[source]

**Footer should contain the following:**  
  ENDFEED|[total sum of commissionToUserInCents]|[total sum of the transactionAmountInCents];


**Expected Output:**  
      V1.0|STARTFEED|Kard|2020-01-30T17:43:48.227Z|10
      1||99988777||AGG|||138||
      2|5c76ee73fa71ed7e83c2d1dc|99988777|5c6eed1693b10aed52451b33|SETTLED|20190220|1-800 Postcards|43|35|WEB
      3|5c76ee73fa71ed7e83c2d1f3|99988777|5c6ef03193b10ad604451b36|SETTLED|20190209|1-800-inkfarm.com|69|52|WEB
      4|5c76ee75fa71ed7e83c2d1fc|99988777|5c6eed1693b10aed52451b33|PENDING|20190226|1-800 Postcards|-18|-76|WEB
      5|5c76ee75fa71ed7e83c2d204|99988777|5c6ef5fb93b10a5b03451b38|SETTLED|20190209|Unlimited Biking|21|70|WEB
      6|5c76ee75fa71ed7e83c2d216|99988777|5c71a88e5ea07867688b6628|PENDING|20190225|123Inkjets.com|5|68|WEB
      7|5c76ee75fa71ed7e83c2d220|99988777|5c740025b6b4d83197ad558f|SETTLED|20190223|1800lighting.com|-9|-37|WEB
      8||344311990||AGG|||37||
      9|5c76ee69fa71ed7e83c2d179|344311990|5c6eee2293b10a6126451b34|PENDING|20190208|1-800-FLORALS|17|31|WEB
      10|5c76ee69fa71ed7e83c2d179|344311990|5c6eee2293b10a6126451b34|SETTLED|20190208|1-800-FLORALS|20|52|WEB
      ENDFEED|175|265

--

**BONUS**
If you were able to finish the task within given time, feel free to refactor your code in a more readable manner.

## FAQ

**Can I use external libraries?** - Absolutely.  Do so thoughtfully and where necessary.

**Can I leave comments in code?** - Leaving comments to express your logic or your thoughts is great!.

**I couldn't complete everything in the alotted time, what do I do?** - Submit what you can. We don't expect a flawless system given the time constraints, we expect to see how you think.

**What if I have questions that aren't answered?** - Please contact one of the team members via email.