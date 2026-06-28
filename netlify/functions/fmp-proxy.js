exports.handler = async function(event) {
  const ticker = event.queryStringParameters && event.queryStringParameters.ticker;
  const type = event.queryStringParameters && event.queryStringParameters.type || 'profile';
  const KEY = process.env.FMP_API_KEY || 'I9BOJfwkuwlQsyOrDsZGZv3zfhszchrb';

  if (!ticker) {
    return { statusCode: 400, body: JSON.stringify({ error: 'No ticker provided' }) };
  }

  const urls = {
    profile: `https://financialmodelingprep.com/stable/profile?symbol=${ticker}&apikey=${KEY}`,
    ratios: `https://financialmodelingprep.com/stable/ratios-ttm?symbol=${ticker}&apikey=${KEY}`
  };

  try {
    const response = await fetch(urls[type] || urls.profile);
    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
