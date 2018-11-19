<template>
  
  <work-page-renderer
    title="旅の記憶"
    thumbnail="~/assets/img/eye-catch.jpg"
  >
    <p>オーストラリアの大人向け絵本作家ショーン・タンの作品を原作とした大人向け舞台作品。</p>
    <p>丈20センチほどの小型の人形を用い、人形遣い4名で演じる作品。時には人形遣い自身も登場人物となり、物語に加わる。</p>
    <p>筑波大学人形劇団NEU 2018年度夏公演作品。いいだ世界人形劇フェスタ2018参加作品。</p>
  </work-page-renderer>

</template>

<script>

  import WorkPageRenderer from '~/components/WorkPageRenderer.vue';
  import ImageBox from '~/components/ImageBox.vue';
  
  export default {

    components: {

      WorkPageRenderer,
      ImageBox,

    },

  };

</script>