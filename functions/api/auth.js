export async function onRequestPost(context) {
  const { request } = context;
  
  try {
    const body = await request.json();
    const { action, email, name, providerToken } = body;
    
    if (action === 'login_email') {
      if (!email || !email.includes('@')) {
        return new Response(JSON.stringify({ success: false, error: 'Invalid email address' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        });
      }
      
      const userId = 'usr_' + btoa(email).replace(/[^a-zA-Z0-9]/g, '').substring(0, 16);
      
      return new Response(JSON.stringify({
        success: true,
        user: {
          id: userId,
          email: email,
          name: email.split('@')[0],
          provider: 'email'
        },
        token: 'jwt_' + Date.now() + '_' + userId
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (action === 'login_google') {
      const userId = 'usr_g_' + (providerToken ? providerToken.substring(0, 12) : Date.now());
      
      return new Response(JSON.stringify({
        success: true,
        user: {
          id: userId,
          email: email || 'user@gmail.com',
          name: name || 'Quran Student',
          provider: 'google'
        },
        token: 'jwt_g_' + Date.now()
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: false, error: 'Unknown action' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
