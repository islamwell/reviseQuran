export async function onRequestGet(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const userId = url.searchParams.get('userId') || 'guest';

  try {
    let userData = null;
    if (env && env.USER_DATA_KV) {
      userData = await env.USER_DATA_KV.get(`user:${userId}`, { type: 'json' });
    }

    return new Response(JSON.stringify({
      success: true,
      userId,
      data: userData,
      timestamp: Date.now()
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const payload = await request.json();
    const { userId, data } = payload;

    if (!userId || !data) {
      return new Response(JSON.stringify({ success: false, error: 'Missing userId or data' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (env && env.USER_DATA_KV) {
      await env.USER_DATA_KV.put(`user:${userId}`, JSON.stringify({
        ...data,
        updatedAt: Date.now()
      }));
    }

    return new Response(JSON.stringify({
      success: true,
      userId,
      updatedAt: Date.now()
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
