<template>
  <div>
    <Card style="margin: 30px; height: 88vh">
      <template #title>
        <div id="loader" style="max-width: fit-content; position: absolute; margin-top: 20px;" >
          <img src="../assets/loader.gif" width="80px" alt="Loading..."/>
        </div>
        <div style="float: left">
          Ask Jarvis <i class="pi pi-prime" style="font-size: 2rem"></i>
        </div>
        <i
          class="pi pi-trash"
          style="font-size: 1rem; float: right; cursor: pointer"
          @click="doDelete"
        ></i>

      </template>
      <template #content>

        <div
          id="chat-history"
          style="
            height: 75vh;
            overflow-y: scroll;
            margin-bottom: 0px;
            margin-top: 5px;
          "
        ></div>

        <InputText
          id="prompt"
          v-model="prompt"
          style="width: 93%; display: inline-block; margin-right: 10px"
          placeholder="Ask me anything..."
          v-on:keyup.enter="ask"
        />
        <Button label="Send" @click="ask"></Button>        
      </template>
    </Card>

    <div class="footer">
      <p class="footer-left">
        Powered by
        <a
          href="https://ai.google.dev/docs"
          target="_blank"
          >Google Gemini</a
        >
      </p>
      <p class="footer-right">
        Copyleft @ 2024 |
        <i
          class="pi pi-github"
          style="font-size: 1rem; cursor: pointer"          
        ></i>   
        <a href="https://github.com/ridhonovembri/chat-ai-google-gemini" target="_blank"> https://github.com/ridhonovembri/chat-ai-google-gemini</a>
      </p>
    </div>
  </div>
</template>
<script>
import Post from "@/api/http-post";

export default {
  data() {
    return {
      prompt: "",
    };
  },
  mounted(){
    const loader = document.getElementById('loader');
    loader.style.display = 'none'; // Show the loader
  },
  methods: {
    doDelete() {
      // console.log('delete')
      document.getElementById("chat-history").innerHTML = "";
    },

    async ask() {
      const chatHistory = document.getElementById("chat-history");
      chatHistory.innerHTML += `<div class="user-message">${this.prompt}</div>`;

      if (this.prompt === ''){
        this.prompt = 'Hi'
      }

      const user_input = this.prompt;
      this.prompt = "";

      loader.style.display = 'block';

      const result = await Post.response(
        JSON.stringify({ prompt: user_input })
        
      );
      // console.log("result", result.data.response);
      loader.style.display = 'none';

      chatHistory.innerHTML += `<div class="bot-message">${result.data.response}</div>`;

      chatHistory.scrollTop = chatHistory.scrollHeight;
    },
  },
};
</script>
<style>
.user-message {
  /* text-align: right; */
  padding: 10px;
  /* background-color: #f0a8a8; */
  border-radius: 10px;
  margin-bottom: 5px;
  margin-right: 5px;
  margin-left: 40px;
}

.bot-message {
  text-align: left;
  padding: 10px;
  background-color: #e0f0e0;
  border-radius: 10px;
  margin-bottom: 5px;
  margin-right: 5px;
  color: black;
}

.footer-left {
  float: left;
  font-size: 10px;
  margin-left: 20px;
}

.footer-right {
  float: right;
  font-size: 10px;
  margin-right: 20px;
}
</style>
