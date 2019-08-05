<template>
  <div class="recent-challenges">
    <div class="recent-challenges__columns columns">
      <div class="column">
        <challenge-widget />
      </div>
      <div class="column">
        <challenge-widget />
      </div>
      <div class="column">
        <challenge-widget />
      </div>
      <div class="column">
        <challenge-widget />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecentChallenges',

  components: {
    ChallengeWidget: () => import('Components/CharitableChallenges/ChallengeWidget')
  },
}
</script>
