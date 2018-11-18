import Vue from 'vue'
import App from './App.vue'
import router from './router'
import wysiwyg from "vue-wysiwyg";

Vue.config.productionTip = false
Vue.use(wysiwyg, {
    // { [module]: boolean (set true to hide) }
    hideModules: { "bold": true },

    // you can override icons too, if desired
    // just keep in mind that you may need custom styles in your application to get everything to align
    // iconOverrides: { "bold": "<i></i>" },

    // if the image option is not set, images are inserted as base64
    image: {
        uploadURL: "http://localhost:3000/articles/uploadImage",
        dropzoneOptions: {}
    },

    // limit content height if you wish. If not set, editor size will grow with content.
    maxHeight: "5000px"
});
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')