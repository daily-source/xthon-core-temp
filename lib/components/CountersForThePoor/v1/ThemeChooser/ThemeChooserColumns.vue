<template>
  <div class='theme-chooser--columns columns'>
    <div 
      class='theme-chooser__column column'
      v-for='theme in imageOpts'
      @click='setSelectedIndex(theme.id)'
      :key='theme.id'
    >
      <div 
        :class='["theme-chooser__img-container", {"theme-chooser__img-container--selected": selectedIndex == theme.id}]'
      >
        <img
          :src='theme.imageSrc' 
          class='theme-chooser__img'
          alt='Featured Image'
        >
      </div>
    </div>
    <div 
      class='theme-chooser__column theme-chooser__column--no-img column'
      v-for='theme in noImageOpts'
      @click='setSelectedIndex(theme.id)'
      :key='theme.id'
    >
      <div 
        :class='[
          "theme-chooser-no-img__text", 
          {"theme-chooser-no-img__text--selected": selectedIndex == theme.id}
        ]'
      >
        No Image
      </div>
    </div>
  </div>
</template>

<script>
import themeChooser from 'Core/util/themeChooser'

export default {
  name: 'ThemeChooserColumns',

  mixins: [themeChooser],
}
</script>

<style lang="scss" scoped>
@mixin selected-effect ($color, $border-color: transparent, $border-color-selected: $primary) {
  border: 2px solid $border-color;
  border-radius: $border-radius;
  position: relative;
  transition: all .2s ease;
  overflow: hidden;
  transform: scale(1);

  &:before {
    content: '';
    background-color: $color;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
    opacity: 1;
    transition: all .2s ease;
    border-radius: $border-radius;
  }

  &--selected,
  &:hover {
    border-color: $border-color-selected;

    &:before {
      opacity: 0
    }
  }

  &--selected {
    transform: scale(1.05);
  }
}

.theme-chooser {
  &__column {
    cursor: pointer;
    display: flex;
    align-items: stretch;
  }

  &__img-container {
    width: 100%;
    height: 100%;

    @include selected-effect(rgba(0,0,0,.5))
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__column--no-img {
    display: flex;
    align-items: stretch;
  }

  &-no-img__text {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border-radius: $border-radius;
    border: 2px solid #dadada;
    font-size: 1.125rem;
    font-weight: 700;
    text-transform: uppercase;
    background-color: #eee;

    @include selected-effect(rgba(0,0,0,.7), #dadada);
  }
}
</style>
