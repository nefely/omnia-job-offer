module.exports = function handler(request, response) {
  response.setHeader('Cache-Control', 'private, no-store');
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    return response.status(405).json({ error: 'Method not allowed' });
  }
  const code = request.headers['x-vercel-ip-country'];
  const country = typeof code === 'string' && /^[A-Z]{2}$/.test(code) && !['XX', 'T1'].includes(code) ? code : null;
  if (request.method === 'HEAD') return response.status(200).end();
  return response.status(200).json({ country });
};
