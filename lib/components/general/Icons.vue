<template>
  <div class="icon-wrapper">
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'link'">
      <path :fill="color" d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'camera'">
      <path :fill="color" d="M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'crop-square'">
      <path :fill="color" d="M18,18H6V6H18M18,4H6A2,2 0 0,0 4,6V18A2,2 0 0,0 6,20H18A2,2 0 0,0 20,18V6C20,4.89 19.1,4 18,4Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'crop-landscape'">
      <path :fill="color" d="M19,17H5V7H19M19,5H5A2,2 0 0,0 3,7V17A2,2 0 0,0 5,19H19A2,2 0 0,0 21,17V7C21,5.89 20.1,5 19,5Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'crop-portrait'">
      <path :fill="color" d="M17,19H7V5H17M17,3H7A2,2 0 0,0 5,5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V5C19,3.89 18.1,3 17,3Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'email'">
      <path :fill="color" d="M4,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4C2.89,20 2,19.1 2,18V6C2,4.89 2.89,4 4,4M12,11L20,6H4L12,11M4,18H20V8.37L12,13.36L4,8.37V18Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'calendar'">
      <path :fill="color" d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'check'">
      <path :fill="color" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'chart'">
      <path :fill="color" d="M3.5,18.5L9.5,12.5L13.5,16.5L22,6.92L20.59,5.5L13.5,13.5L9.5,9.5L2,17L3.5,18.5Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'gmail'">
      <path :fill="color" d="M20,18H18V9.25L12,13L6,9.25V18H4V6H5.2L12,10.25L18.8,6H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'linkedin'">
      <path :fill="color" d="M19,3A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3H19M18.5,18.5V13.2A3.26,3.26 0 0,0 15.24,9.94C14.39,9.94 13.4,10.46 12.92,11.24V10.13H10.13V18.5H12.92V13.57C12.92,12.8 13.54,12.17 14.31,12.17A1.4,1.4 0 0,1 15.71,13.57V18.5H18.5M6.88,8.56A1.68,1.68 0 0,0 8.56,6.88C8.56,5.95 7.81,5.19 6.88,5.19A1.69,1.69 0 0,0 5.19,6.88C5.19,7.81 5.95,8.56 6.88,8.56M8.27,18.5V10.13H5.5V18.5H8.27Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'chain'">
      <path :fill="color"  d="M10.59,13.41C11,13.8 11,14.44 10.59,14.83C10.2,15.22 9.56,15.22 9.17,14.83C7.22,12.88 7.22,9.71 9.17,7.76V7.76L12.71,4.22C14.66,2.27 17.83,2.27 19.78,4.22C21.73,6.17 21.73,9.34 19.78,11.29L18.29,12.78C18.3,11.96 18.17,11.14 17.89,10.36L18.36,9.88C19.54,8.71 19.54,6.81 18.36,5.64C17.19,4.46 15.29,4.46 14.12,5.64L10.59,9.17C9.41,10.34 9.41,12.24 10.59,13.41M13.41,9.17C13.8,8.78 14.44,8.78 14.83,9.17C16.78,11.12 16.78,14.29 14.83,16.24V16.24L11.29,19.78C9.34,21.73 6.17,21.73 4.22,19.78C2.27,17.83 2.27,14.66 4.22,12.71L5.71,11.22C5.7,12.04 5.83,12.86 6.11,13.65L5.64,14.12C4.46,15.29 4.46,17.19 5.64,18.36C6.81,19.54 8.71,19.54 9.88,18.36L13.41,14.83C14.59,13.66 14.59,11.76 13.41,10.59C13,10.2 13,9.56 13.41,9.17Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'location'">
      <path :fill="color" d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'share'">
      <path :fill="color" d="M18,16.08C17.24,16.08 16.56,16.38 16.04,16.85L8.91,12.7C8.96,12.47 9,12.24 9,12C9,11.76 8.96,11.53 8.91,11.3L15.96,7.19C16.5,7.69 17.21,8 18,8A3,3 0 0,0 21,5A3,3 0 0,0 18,2A3,3 0 0,0 15,5C15,5.24 15.04,5.47 15.09,5.7L8.04,9.81C7.5,9.31 6.79,9 6,9A3,3 0 0,0 3,12A3,3 0 0,0 6,15C6.79,15 7.5,14.69 8.04,14.19L15.16,18.34C15.11,18.55 15.08,18.77 15.08,19C15.08,20.61 16.39,21.91 18,21.91C19.61,21.91 20.92,20.61 20.92,19A2.92,2.92 0 0,0 18,16.08Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'bubble'">
      <path :fill="color" d="M20,2H4A2,2 0 0,0 2,4V22L6,18H20A2,2 0 0,0 22,16V4A2,2 0 0,0 20,2M20,16H6L4,18V4H20" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'money'">
      <path :fill="color" d="M11.8,10.9C9.53,10.31 8.8,9.7 8.8,8.75C8.8,7.66 9.81,6.9 11.5,6.9C13.28,6.9 13.94,7.75 14,9H16.21C16.14,7.28 15.09,5.7 13,5.19V3H10V5.16C8.06,5.58 6.5,6.84 6.5,8.77C6.5,11.08 8.41,12.23 11.2,12.9C13.7,13.5 14.2,14.38 14.2,15.31C14.2,16 13.71,17.1 11.5,17.1C9.44,17.1 8.63,16.18 8.5,15H6.32C6.44,17.19 8.08,18.42 10,18.83V21H13V18.85C14.95,18.5 16.5,17.35 16.5,15.3C16.5,12.46 14.07,11.5 11.8,10.9Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'facebook'">
      <path :fill="color" d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'instagram'">
      <path :fill="color" d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4C4,18.39 5.61,20 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6C20,5.61 18.39,4 16.4,4H7.6M17.25,5.5A1.25,1.25 0 0,1 18.5,6.75A1.25,1.25 0 0,1 17.25,8A1.25,1.25 0 0,1 16,6.75A1.25,1.25 0 0,1 17.25,5.5M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'plus'">
      <path :fill="color" d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'target'">
      <path :fill="color" d="M11,2V4.07C7.38,4.53 4.53,7.38 4.07,11H2V13H4.07C4.53,16.62 7.38,19.47 11,19.93V22H13V19.93C16.62,19.47 19.47,16.62 19.93,13H22V11H19.93C19.47,7.38 16.62,4.53 13,4.07V2M11,6.08V8H13V6.09C15.5,6.5 17.5,8.5 17.92,11H16V13H17.91C17.5,15.5 15.5,17.5 13,17.92V16H11V17.91C8.5,17.5 6.5,15.5 6.08,13H8V11H6.09C6.5,8.5 8.5,6.5 11,6.08M12,11A1,1 0 0,0 11,12A1,1 0 0,0 12,13A1,1 0 0,0 13,12A1,1 0 0,0 12,11Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'alarm'">
      <path :fill="color" d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,4M12.5,8H11V14L15.75,16.85L16.5,15.62L12.5,13.25V8M7.88,3.39L6.6,1.86L2,5.71L3.29,7.24L7.88,3.39M22,5.72L17.4,1.86L16.11,3.39L20.71,7.25L22,5.72Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'twitter'">
      <path :fill="color" d="M22.46,6C21.69,6.35 20.86,6.58 20,6.69C20.88,6.16 21.56,5.32 21.88,4.31C21.05,4.81 20.13,5.16 19.16,5.36C18.37,4.5 17.26,4 16,4C13.65,4 11.73,5.92 11.73,8.29C11.73,8.63 11.77,8.96 11.84,9.27C8.28,9.09 5.11,7.38 3,4.79C2.63,5.42 2.42,6.16 2.42,6.94C2.42,8.43 3.17,9.75 4.33,10.5C3.62,10.5 2.96,10.3 2.38,10C2.38,10 2.38,10 2.38,10.03C2.38,12.11 3.86,13.85 5.82,14.24C5.46,14.34 5.08,14.39 4.69,14.39C4.42,14.39 4.15,14.36 3.89,14.31C4.43,16 6,17.26 7.89,17.29C6.43,18.45 4.58,19.13 2.56,19.13C2.22,19.13 1.88,19.11 1.54,19.07C3.44,20.29 5.7,21 8.12,21C16,21 20.33,14.46 20.33,8.79C20.33,8.6 20.33,8.42 20.32,8.23C21.16,7.63 21.88,6.87 22.46,6Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'chevron-down'">
      <path :fill="color" d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'user'">
      <path :fill="color" d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'credit-card'">
      <path :fill="color" d="M20,8H4V6H20M20,18H4V12H20M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'pencil'">
      <path :fill="color" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'close-circle'">
      <path :fill="color" d="M12,2C17.53,2 22,6.47 22,12C22,17.53 17.53,22 12,22C6.47,22 2,17.53 2,12C2,6.47 6.47,2 12,2M15.59,7L12,10.59L8.41,7L7,8.41L10.59,12L7,15.59L8.41,17L12,13.41L15.59,17L17,15.59L13.41,12L17,8.41L15.59,7Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'lock'">
      <path :fill="color" d="M12,17A2,2 0 0,0 14,15C14,13.89 13.1,13 12,13A2,2 0 0,0 10,15A2,2 0 0,0 12,17M18,8A2,2 0 0,1 20,10V20A2,2 0 0,1 18,22H6A2,2 0 0,1 4,20V10C4,8.89 4.9,8 6,8H7V6A5,5 0 0,1 12,1A5,5 0 0,1 17,6V8H18M12,3A3,3 0 0,0 9,6V8H15V6A3,3 0 0,0 12,3Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'alert'">
      <path :fill="color" d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'usd'">
      <path :fill="color" d="M7,15H9C9,16.08 10.37,17 12,17C13.63,17 15,16.08 15,15C15,13.9 13.96,13.5 11.76,12.97C9.64,12.44 7,11.78 7,9C7,7.21 8.47,5.69 10.5,5.18V3H13.5V5.18C15.53,5.69 17,7.21 17,9H15C15,7.92 13.63,7 12,7C10.37,7 9,7.92 9,9C9,10.1 10.04,10.5 12.24,11.03C14.36,11.56 17,12.22 17,15C17,16.79 15.53,18.31 13.5,18.82V21H10.5V18.82C8.47,18.31 7,16.79 7,15Z" />
    </svg>
    <svg :style="{width: `${iconwidth}`, height: `${iconheight}`, stroke: `${color}`}" :width="iconwidth" :height="iconheight" v-if="icon === 'search'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:serif="http://www.serif.com/" viewBox="0 0 213 213" version="1.1" xml:space="preserve" style="fill: none; fill-rule:evenodd;clip-rule:evenodd;">
      <g transform="matrix(1,0,0,1,-10379.2,-74.9986)">
        <g transform="matrix(8.33333,0,0,8.33333,0,0)">
          <g transform="matrix(1,0,0,1,1255.69,12.7766)">
            <path d="M0,12.825C3.542,12.825 6.413,9.954 6.413,6.412C6.413,2.87 3.542,0 0,0C-3.542,0 -6.413,2.87 -6.413,6.412C-6.413,9.954 -3.542,12.825 0,12.825Z" style="stroke-width:1.83px;"/>
          </g>
        </g>
        <g transform="matrix(8.33333,0,0,8.33333,0,0)">
          <g transform="matrix(0.70716,0.707054,0.707054,-0.70716,1263.88,22.6599)">
            <path d="M-1.384,-3.341L8.066,-3.341" style="stroke-width:1.83px;stroke-linecap:round;"/>
          </g>
        </g>
      </g>
    </svg>
    
    <svg xmlns="http://www.w3.org/2000/svg" :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 4" v-if='icon === "minus"'>
      <path id="minus" d="M86.088,224H65.912a2,2,0,0,0,0,4H86.088a2,2,0,0,0,0-4Z" transform="translate(-64 -224)" :fill="color"/>
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if="icon === 'times'">
      <path id="iconfinder_times_1608952" d="M326,385.313a1.87,1.87,0,0,1-.566,1.374l-2.747,2.747a1.951,1.951,0,0,1-2.747,0L314,383.495l-5.939,5.939a1.951,1.951,0,0,1-2.747,0l-2.747-2.747a1.951,1.951,0,0,1,0-2.747L308.505,378l-5.939-5.939a1.951,1.951,0,0,1,0-2.747l2.747-2.747a1.951,1.951,0,0,1,2.747,0L314,372.505l5.939-5.939a1.951,1.951,0,0,1,2.747,0l2.747,2.747a1.951,1.951,0,0,1,0,2.747L319.495,378l5.939,5.939A1.87,1.87,0,0,1,326,385.313Z" transform="translate(-302 -366)" :fill="color"/>
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" viewBox="0 0 24 32" v-if='icon === "map-marker"'>
      <g id="iconfinder_71_Pin_106156" transform="translate(-64)">
        <g id="Group_6" data-name="Group 6" transform="translate(64)">
          <path id="Path_3" data-name="Path 3" d="M76,0A12,12,0,0,0,64,12c0,6.627,12,20,12,20S88,18.627,88,12A12,12,0,0,0,76,0Zm0,20a8,8,0,1,1,8-8A8,8,0,0,1,76,20Z" transform="translate(-64)" :fill="color"/>
        </g>
      </g>
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" :style="{width: `${iconwidth}`, height: `${iconheight}`}" :width="iconwidth" :height="iconheight" v-if='icon === "gear"' viewBox="0 0 24 24">
      <path id="iconfinder_cog_1190544" d="M24.6,11.6H23.176a1.4,1.4,0,0,1-.992-2.4l1.016-1a1.4,1.4,0,0,0,0-2L21.78,4.8a1.4,1.4,0,0,0-2,0L18.8,5.816a1.4,1.4,0,0,1-2.4-.992V3.4A1.4,1.4,0,0,0,15,2H13a1.4,1.4,0,0,0-1.4,1.4V4.824a1.4,1.4,0,0,1-2.4.992L8.2,4.8a1.4,1.4,0,0,0-2,0L4.8,6.22a1.4,1.4,0,0,0,0,2l1.016.98a1.4,1.4,0,0,1-.992,2.4H3.4A1.4,1.4,0,0,0,2,13v2a1.4,1.4,0,0,0,1.4,1.4H4.824a1.4,1.4,0,0,1,.992,2.4L4.8,19.8a1.4,1.4,0,0,0,0,2l1.42,1.4a1.4,1.4,0,0,0,2,0l.98-1.016a1.4,1.4,0,0,1,2.4.992V24.6A1.4,1.4,0,0,0,13,26h2a1.4,1.4,0,0,0,1.4-1.4V23.176a1.4,1.4,0,0,1,2.4-.992l1,1.016a1.4,1.4,0,0,0,2,0l1.4-1.42a1.4,1.4,0,0,0,0-2l-1.016-.98a1.4,1.4,0,0,1,.992-2.4H24.6A1.4,1.4,0,0,0,26,15V13a1.4,1.4,0,0,0-1.4-1.4ZM14,18.532A4.532,4.532,0,1,1,18.532,14,4.532,4.532,0,0,1,14,18.532Z" transform="translate(-2 -2)" :fill="color"/>
    </svg>

    <svg xmlns="http://www.w3.org/2000/svg" :width="iconwidth" :height="iconheight" viewBox="0 0 24 24" v-if='icon === "trash-can"'>
      <g id="iconfinder_oui-icons-05_1172245" transform="translate(-1 -1)">
        <rect id="Rectangle_1" data-name="Rectangle 1" width="6" height="2" transform="translate(10 3)" fill='none'/>
        <path id="Path_1" data-name="Path 1" d="M19.933,21,20.94,7H5.06L6.067,21ZM14.144,10a1.154,1.154,0,0,1,2.288,0v8a1.154,1.154,0,0,1-2.288,0ZM9.568,10a1.079,1.079,0,0,1,1.144-1,1.079,1.079,0,0,1,1.144,1v8a1.079,1.079,0,0,1-1.144,1,1.079,1.079,0,0,1-1.144-1Z" transform="translate(0 2)" fill="none"/>
        <path id="Path_2" data-name="Path 2" d="M2.091,7.545H3.247L4.273,23.975A1.091,1.091,0,0,0,5.364,25H20.636a1.091,1.091,0,0,0,1.091-1.025L22.753,7.545h1.156a1.091,1.091,0,1,0,0-2.182H18.455V3.182A2.182,2.182,0,0,0,16.273,1H9.727A2.182,2.182,0,0,0,7.545,3.182V5.364H2.091a1.091,1.091,0,1,0,0,2.182ZM9.727,3.182h6.545V5.364H9.727ZM8.636,7.545H20.571l-.96,15.273H6.389L5.429,7.545Z" :fill='color'/>
        <path id="Path_3" data-name="Path 3" d="M10,19a1,1,0,0,0,1-1V10a1,1,0,0,0-2,0v8A1,1,0,0,0,10,19Z" transform="translate(0.8 1.333)" :fill='color'/>
        <path id="Path_4" data-name="Path 4" d="M14,19a1,1,0,0,0,1-1V10a1,1,0,0,0-2,0v8A1,1,0,0,0,14,19Z" transform="translate(1.2 1.333)" :fill='color' />
      </g>
    </svg>

    <svg id="photo" xmlns="http://www.w3.org/2000/svg" :width="iconwidth" :height="iconheight" viewBox="0 0 24 16.697" v-if='icon === "photo"'>
      <path id="Path_1" data-name="Path 1" d="M5.644,4.2A1.737,1.737,0,1,0,3.907,5.942,1.742,1.742,0,0,0,5.644,4.2M1.666,15.086s-.017.023-.041.061H22.375l0-.006L15.288,5.5a.973.973,0,0,0-1.679,0L9.227,11.466,7.615,9.27a.973.973,0,0,0-1.678,0Zm21.41.684H.923V.928H23.077V15.769Zm.923.464V.464A.463.463,0,0,0,23.539,0H.462A.463.463,0,0,0,0,.464V16.233a.463.463,0,0,0,.461.464H23.539A.463.463,0,0,0,24,16.233" :fill='color'/>
    </svg>

  </div>
</template>

<style scoped lang="scss">
.icon-wrapper {
  line-height: 0;
}
</style>

<script>
export default {
  props: [ "icon", "iconwidth", "iconheight", "color" ]
}
</script>
