<template>
  <main id = "main">
    <div v-show = "!attemptedSent" id = "contact" class = "contact">
      <h1>Contact Me</h1>
      <p>I'm glad you would like to get in Touch!</p>
      <p>Please use the form below to send me an email</p>
      <form action="https://api.jackbailey.uk/emailform" method="POST">
        <label for="name">Name</label>
        <input type="text" class="contactBox" id="name" name="name">
        <label for="email">Your Email</label>
        <input type="email" class="contactBox" id="emailInput" name="email">
        <label for="emailBody">Message</label>
        <textarea type="body" class="contactBox" id="emailBody" name="emailBody"></textarea>
        <button type="submit">Submit</button>
      </form>
      <sub>Please make sure I can reply to you using the email you have provided</sub>
    
    </div>
    <div v-show = "attemptedSent" id = "confirmation" class = "confirmation">
      <div v-if = "success" class = "success">
        <h1>Thank You</h1>
        <p>Your message has been sent</p>
        <p>I will get back to you as soon as possible</p>
        <router-link to = "/contact" @click = "update()" >Go Back</router-link>
      </div>
      <div v-if = "!success" class = "nosuccess">
        <h1>Oops!</h1>
        <p>Something went wrong</p>
        <p>Please try again</p>
        <router-link to = "/contact" @click = "update()" >Go Back</router-link>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  name: 'Contact',
  data () {
    return {
      attemptedSent: false,
      success: false
    }
  },
  methods : {
    update() {
      this.$router.push('/contact')
      this.attemptedSent = false;
    },
  },
  created(){
    this.attemptedSent = this.$route.query.sent != null;
    if(this.attemptedSent){
      this.success = this.$route.query.sent == "true";
    }
  }
}

</script>



<style>
@import "../styles/Contact.css"
</style>