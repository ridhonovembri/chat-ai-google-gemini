import http from "@/api/http";

class Post {
  chat(data) {
    // console.log('api', data)
    return http.post("/chat", data);
  }
  response(data) {
    // console.log('api', data)
    return http.post("/response", data);
  }
}

export default new Post();