
// example.js

import { sendEmail } from './send-email';

sendEmail(
    'user@domain.com',
       'text',
    'text',
 { cc: 'juju.washerandbye@gmail.com' }
).then(() => {
    console.log('Your message was successfully sent!');
});
