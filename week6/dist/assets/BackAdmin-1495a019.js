import{_ as h,r as i,o as l,c as _,a as o,b as t,w as n,d as e,k,F as m}from"./index-6e10f009.js";const{VITE_URL:p}={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"test8283",BASE_URL:"/vue-training/week6/dist/",MODE:"production",DEV:!1,PROD:!0},f={data(){return{token:""}},methods:{checkAdmin(){this.$http.post(`${p}/api/user/check`).catch(()=>{alert("請登入"),this.$router.push("/LogIn")})},logOut(){document.cookie="myToken=;expires=;",this.$swal("token 已清除"),this.$router.push("/home")}},mounted(){this.token=document.cookie.replace(/(?:(?:^|.*;\s*)myToken\s*=\s*([^;]*).*$)|^.*$/,"$1"),this.$http.defaults.headers.common.Authorization=this.token,this.checkAdmin()}},$=o("h1",{class:"text-center"}," 你現在在後頁面 ",-1),w={class:"d-flex gap-3 justify-content-center"},x=o("hr",null,null,-1);function V(v,r,A,g,a,c){const s=i("router-link"),u=i("router-view");return l(),_(m,null,[$,o("div",w,[t(s,{to:"/"},{default:n(()=>[e("回前台")]),_:1}),e(" | "),t(s,{to:"/BackAdmin/ProductsView",token:a.token},{default:n(()=>[e("產品列表")]),_:1},8,["token"]),e(" | "),t(s,{to:"/BackAdmin/OrderView"},{default:n(()=>[e("訂單列表")]),_:1}),e(" | "),o("a",{href:"#",onClick:r[0]||(r[0]=k((...d)=>c.logOut&&c.logOut(...d),["prevent"]))},"登出")]),x,t(u)],64)}const E=h(f,[["render",V]]);export{E as default};