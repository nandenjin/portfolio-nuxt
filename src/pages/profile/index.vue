
<template>
  <main class="theme--document">
    <h1 class="theme--title">
      Profile
    </h1>

    <div class="profile theme-margin-lr">
      <div>
        <image-box class="avatar" src="~/assets/img/profile.jpg" alt="" />
      </div>
      <div>
        <h1>Kazumi Inada / 稲田 和巳</h1>
        <h2>Designer / Engineer</h2>
        <div class="lang-section" lang="ja">
          <p>1997年、大阪府生まれ。2017年より筑波大学情報学群 情報メディア創成学類に所属。</p>
          <p>工学・芸術に興味を持ち、メディアアート・グラフィックデザイン・舞台芸術などの創作活動を行う。技術的・芸術的魅力を共に活かすものづくりに取り組んでいる。</p>
        </div>
        <div class="lang-section" lang="en">
          <p>Born in 1997 at Osaka, Japan. Belonging University of Tsukuba, College of Media Arts, Science and Technology from 2017.</p>
          <p>Creating things such as media arts, graphic design works and stage performances with collapsing border between technology and arts.</p>
        </div>
        <ul class="skills">
          <li>Web Design & Development</li>
          <ul>
            <li>HTML / CSS / JavaScript / SASS / SCSS</li>
            <li>Webpack / VueJS / NuxtJS</li>
            <li>WebGL(THREE.js) / WebSocket</li>
            <li>Node.js / Python / PHP</li>
          </ul>
          <li>Graphic Design & Media</li>
          <ul>
            <li>Adobe Photoshop, Illustrator</li>
            <li>Adobe Lighroom, Premiere</li>
            <li>Adobe XD</li>
            <li>Hand-drawn Illustrations</li>
          </ul>
          <li>Hardware & Material Design</li>
          <ul>
            <li>Arduino</li>
            <li>Digital Fabrications with raser cutters & 3D printers</li>
          </ul>
          <li>Stage Technologies</li>
          <ul>
            <li>Sound & Lighting Design</li>
          </ul>
        </ul>
        <p><b>Contact: </b> hello at nandenjin dot com</p>
      </div>
    </div>
  </main>
</template>

<script>

  import ImageBox from '~/components/ImageBox.vue'

  export default {

    components: {

      ImageBox

    },

    head: {

      title: 'Profile | Kazumi Inada / 稲田和巳'

    }

  }

</script>

<style lang="sass" scoped>

  @import '~/assets/style/themes.sass'

  .profile
    font-size: 12.5px

    .avatar
      width: 120px
      height: 120px
      margin: 30px 0
      border-radius: 15px

    h1
      margin-top: 80px
      margin-bottom: 20px
      font-size: 1.4em

    h2
      margin: 40px 0
      color: #888
      font-size: 1.05em

    .lang-section
      margin: 15px 0

    p
      margin: 5px 0
      line-height: 2em

    .skills
      margin: 50px 0
      font-size: 0.8em

      ul
        margin: 10px 0
        padding-right: 15px

      li
        margin: 5px 0

</style>
