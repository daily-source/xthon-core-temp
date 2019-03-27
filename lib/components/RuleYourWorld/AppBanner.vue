<template>
  <section id="banner" class='banner'>
    <img src="@/assets/img/banner-img.jpg" class='banner__background' alt="Banner Image">
    <div class="banner__contents">
      <div class="container">
        <h2 class="has-text-weight-bold has-text-uppercase">THIS IS AN EYE-OPENING EXERCISE</h2>
        <p>Pretend you rule the world and get to decide how many people are considered rich, poor and middle class. There are only two rules. One is no double standards. No having one standard for French people and another for Haitian people. The numbers below fully adjust for costs of living, so $1,000 buys the same amount in every country. To learn how experts can easily calculate this, click here. The other rule is the average person not be placed lower or higher than middle class. So a maximum of 49% can be in the rich levels and 49% in the poor levels.</p>
      </div>
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

    p {
      color: #fff;
    }
  }
}
</style>
