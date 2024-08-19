◉ Flags:
`https://flagsapi.com/${countryCode}/flat/64.png`

◉ API for Currency Rate:
`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/{endpoint}`

 const url=`${baseURL}/${fromCurr.value.toLowerCase()}.json`

    let response = await fetch(url);
    // console.log(response);
    let data= await response.json();

    let rate =data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
