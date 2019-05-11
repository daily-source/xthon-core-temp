<template>
  <footer
    class="footer"
    id="footer"
  >
    <div class="footer__contents">
      <div class="container">
        <div class="columns">
          <div class="column is-4 footer__navigation-col">
            <template v-if="$slots.footer__navigation">
              <slot name="footer__navigation"></slot>
            </template>
            <template v-else>
              <ul class="footer__navigation">
                <li><a href="#">News</a></li>
                <li><a href="#">Discussions</a></li>
                <li><a href="#">Donate</a></li>
                <li><a href="#">Volunteer</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Tech support</a></li>
                <li><a href="#">Site Feedback</a></li>
                <li><a href="#">Contact Us</a></li>
              </ul>
            </template>
          </div>
          <div class="column is-4 footer__logo-col">
            <div class="footer__logo-container">
              <p> A project of: </p>
              <router-link to='/'>
                <img
                class='footer__logo'
                src="@/assets/img/max-good-logo-428x180.png"
                alt="Maximum for Good Logo"
                >
              </router-link>
            </div>
          </div>
          <div class="column is-4 footer__logo-col">
            <div class="footer__motto">
              <template v-if="$slots.footer__motto">
                <slot name="footer__motto"></slot>
              </template>
              <template v-else>
                <p> Helping non-profits and their supporters <br/> <strong>RAISE MONEY.  RAISE AWARENESS. <br/> CHANGE THE WORLD</strong>  </p>
                <button class="btn button is-primary">Learn More</button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer__copyright">
      <div class="container-fluid">
        <template v-if="$slots.footer__copyright">
          <slot name="footer__copyright"></slot>
        </template>
        <p> <small>Copyright (c) 2006-2019 DailySource.  All rights reserved.  Terms of Service.</small> </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "SharedFooter"
}
</script>

<style lang="scss">
  #footer {
    color: $color-text;
    padding: 0;
    background-color: $color-light-gray;
    border-top: 1px solid $color-medium-gray;

  }

  .footer__contents {
    display: flex;
    justify-content: space-between;
    padding-top: 2em;
    padding-bottom: 2em;
  }

  .footer__navigation {
    list-style: none;
    columns: 2;
    margin-left: 0;
    padding: 0;
    margin-top: 12px;
  }

  .footer__navigation a,
  .footer__navigation a:visited {
    color: $color-text !important;
    text-transform: none;
  }

  .footer__logo-container {
    text-align: center;
  }

  .footer__logo-container img {
    max-width: 180px;
    width: 100%;
  }


  .footer__motto {
    font-size: 1.125em;
    text-align: center;
    line-height: 30px;

    .btn {
      font-size: 0.75em;
      padding: .5em;
      letter-spacing: normal;
      height: auto;
    }
  }

  .footer__copyright {
    text-align: center;
    background-color: darken($color-medium-gray, 1%);
    padding-bottom: 1em;
    padding-top: 1em;

    p {
      margin-bottom: 0;
      color: $white;
      text-align: center;
    }
  }
</style>
