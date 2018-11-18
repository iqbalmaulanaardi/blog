<template>
  <div class="my-2">
    <router-view/>
  </div>
</template>
<script>
import allarticles from '@/components/AllBlogs.vue'
import detailarticle from '@/components/DetailedBlog.vue'
import addarticle from '@/components/Addarticle.vue'
export default {
  name: 'blog',
  data () {
    return {
      blogs: []
    }
  },
  components: {
    allarticles,
    detailarticle,
    addarticle
  }
}
</script>
