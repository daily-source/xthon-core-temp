<template>
  <section id="banner" class='banner'>
    <img src="@/assets/img/banner-img.jpg" class='banner__background' alt="Banner Image">
    <div class="banner__contents">
      <h2 class="has-text-weight-bold has-text-uppercase">AN EYE-OPENING EXERCISE</h2>
      <p>To start, pretend you rule the world and get to decide who is called rich, poor and middle class. There are only two rules. 1) No double standards. No having one standard for African people and another for European people. 2) The average person must be middle class. In other words, the person in the middle must be in the middle class. Enter your choices below.</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.banner {
  min-height: 520px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @include widescreen {
    min-height: 620px;
  }

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 20;
    background-color: rgba(0,0,0,.45);
  }

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 110%;
    object-fit: cover;
    z-index: 10;
  }

  &__contents {
    position: relative;
    z-index: 30;
    max-width: 70%;
    margin-top: 12%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 4rem;
    padding-right: 4rem;

    @include desktop {
      margin-top: 12%;
    }

    h2 {
      font-size: 30px;
    }

    p {
      color: #fff;
      font-size: 1.25rem;
    }
  }
}
</style>
