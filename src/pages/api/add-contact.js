// File: src/pages/api/add-contact.js
import axios from 'axios';

export async function post({ request }) {
  try {
    const { email } = await request.json();

    // Add contact to Attio CRM
    await axios.post('https://api.attio.com/v2/objects/contact', {
      attributes: {
        email_address: email
      }
    }, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.ATTIO_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error adding contact to Attio:', error);
    return new Response(JSON.stringify({ success: false, error: 'Failed to add contact' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}