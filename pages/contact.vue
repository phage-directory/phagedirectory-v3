<template>
  <div class="Contact">

    <Context>
      <template #context>
        <NodeForm v-if="form" :src="form"/>
      </template>

      <div class="" v-html="$md.render(intro || '')" />
      <div class="" v-html="$md.render(content || '')" />
    </Context>

  </div>
</template>




<script>

import Context from '~/templates/context.vue'
import NodeForm from '~/components/render/NodeForm.vue'

export default {

  components: {
    NodeForm,
    Context,
  },

  layout: 'contentframe',
  middleware: 'pageload',
  meta: {
    tableQuery: "_content-forms"
  },

  data () {
    return {
      intro: this.$cytosis.findField('contact-intro', this.$store.state['Content'], 'Markdown' ),
      content: this.$cytosis.findField('contact-content', this.$store.state['Content'], 'Markdown' ),
      form: this.$cytosis.findOne('form-contact', this.$store.state['Content'] ),

      // content: this.$cytosis.find('Content.contact-page', {'Content': this.$store.state['Content']} )[0]['fields']['Markdown'],
      // form: this.$cytosis.find('Content.form-contact', {'Content': this.$store.state['Content']} )[0],
      // images: this.$cytosis.find('Content.contact-page', {'Content': this.$store.state['Content']} )[0]['fields']['Attachments'],
    }
  },

  mounted () {

    if(this.$segmentize) {
      this.$segmentize({
        segment: this.$segment,
        type: 'page',
        event: 'Groups',
        data: {
          path: this.$route.path,
        }
      })
    }
    
  },
  
}
</script>

<style>
</style>

