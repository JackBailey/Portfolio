<template>
  <main>
    <h1>Contact Me</h1>
    <p>I'm glad you would like to get in Touch!</p>
    <p>Please use the form below or any of the social media buttons</p>
    <form action="https://api.jackbailey.uk/emailform" method="POST">
      <div class = "names">
        <div class = "nameOuter">
          <input type="text" class="contactBox" id="firstName" placeholder="First Name" name="firstName">
        </div>
        <div class = "nameOuter">
          <input type="text" class="contactBox" id="lastName" placeholder="Last Name" name="lastName">
        </div>
        
      </div>
      <input type="email" class="contactBox" id="emailInput" placeholder="Your Email" name="email">
      <textarea type="body" class="contactBox" id="emailBody" placeholder="Body" name="emailBody"></textarea>
      <button type="submit">Submit</button>
    </form>
  </main>
</template>

<style>
@import "../styles/Contact.css"
</style>