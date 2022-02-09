import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.26/vue.esm-browser.min.js';

const url = 'https://vue3-course-api.hexschool.io/v2/api';
const api_path = 'magshop';
const app = createApp({
  data() {
    return {
      temp:{},
      products: []
    };
  },

  methods: {
    checkLogin() {
        //取得我剛存的Token (Token僅需要設定一次)
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)magShopToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        // 把token存到header作為auth,以後request都用此token
        axios.defaults.headers.common['Authorization'] = token;

        //確認用此token是否有正確登入,也確認token是否有無過期
        axios.post(`${url}/user/check`)
        .then((res) => {
          this.getProducts();
        }).catch((err) => {
          console.dir(err);
          window.location = 'index.html'; //重新回到登入畫面
        })
    },

    getProducts() {
      axios.get(`${url}/${api_path}/admin/products/all`)
      .then( res => {
        this.products = res.data.products;
      })
    }
  },

  mounted() {
    this.checkLogin();   
  },
});

app.mount("#app");
