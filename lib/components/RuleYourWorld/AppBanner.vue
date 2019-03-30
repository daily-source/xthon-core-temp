<template>
  <section id="banner" class='banner'>
    <img src="@/assets/img/banner-img.jpg" class='banner__background' alt="Banner Image">
    <div class="banner__contents">
      <h2 class="has-text-weight-bold has-text-uppercase">AN EYE-OPENING EXERCISE</h2>
      <p>Pretend you rule the world and you get to decide who is considered rich, poor and middle class. There are only two rules. One is: no double standards. No having one standard for African people and another for European people. The other rule is the average person not be placed lower or higher than middle class.</p>
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
    background-color: rgba(0,0,0,.55);
  }

  &__background {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 10;
  }

  &__contents {
    position: relative;
    z-index: 30;
    max-width: 70%;
    margin-left: auto;
    margin-right: auto;
    padding-left: 2rem;
    padding-right: 2rem;

    h2 {
      font-size: 28px;
    }

    p {
      color: #fff;
      font-size: 1.25rem;
    }
  }
}
</style>
