import React from 'react';
import './Contact.css'

function Contact() {
  return (
    <div>
        <div class="contact-form">
  <form action="https://formspree.io/f/xyzgzozz" method="POST">
    <div>
        <h2>GET IN TOUCH.</h2>
        <br/>
      <label>Name:</label>
      <input id="name" name="name" required="" type="text" />
    </div>
    <div>
      <label>Email:</label>
      <input id="email" name="_replyto" required="" type="email" />
    </div>
    <div>
      <label>Message:</label>
      <textarea id="message" name="message" required=""></textarea>
    </div>
    <div>
      <button type="submit">Send</button>
    </div>
  </form>
</div>

    </div>
  )
}

export default Contact