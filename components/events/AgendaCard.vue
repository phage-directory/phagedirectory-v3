
<!-- 
  
  Used by agenda to display an event

 -->
<template>

  <div class="AgendaCard">
    <!-- <div class="AgendaCard-header _grid-3-2 _grid-gap-small _align-vertically _margin-bottom-half-xs _padding-bottom-half " > -->
    <div class="AgendaCard-header _grid-3-2 _grid-gap-small _align-vertically _margin-bottom-half-xs " >
      <h6 class="_padding-none"><slot name="type" /></h6>
      <div class="_right-sm"><slot name="date" /></div>
    </div>
    <div class="AgendaCard-main">
      <slot name="main" />
    </div>
  </div>

</template>


<script>


export default {

  components: {
  },

  data: function () {
    return {
      // intro: this.$cytosis.find('Content.capsid-intro', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      // banner: this.$cytosis.find('Content.capsid-banner', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
      // placeholder: this.$cytosis.find('Content.capsid-placeholder', this.$store.state.cytosis.tables)[0]['fields']['Markdown'],
    }
  },

  methods: {
    handleSubmit() {
      // todo: use axios w/ the mailchimp API instead of default mailchimp
      return false
    }
  }

}
</script>

