
<!-- 

  Capsid — What's New

 -->


<template>
  <div :class="atom.fields['Data:Classes']" class="Capsid-item Capsid-new _card _color-bg-white _padding _margin-none" >
    <div class="_flex-1 _md-p_fix" v-html="$md.render(atom.fields['Markdown'] || '')" />
    <div v-if="atom.fields['Data:Tags']" class="Capsid-item-taglist _margin-top" >
      <span v-for="item of atom.fields['Data:Tags']" :key="item" :class="item == 'Promoted' || item == 'Promotion' ? '--sponsor' : ''" class="Capsid-item-tag _tag _margin-bottom-none-i" >{{ item }}</span>
    </div>
  </div>
</template>

<script>

// import { mapState } from 'vuex'

export default {
  props: {
    'atom': Object
  },
}
</script>

