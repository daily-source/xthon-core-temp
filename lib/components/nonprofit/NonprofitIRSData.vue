<template>
  <div class="nonprofit-irs-data__wrapper">
    <div class="nonprofit-extended">
      <div class="nonprofit-data-section__irs-data">
        <div class="columns">
          <div class="column is-9">
            <div class="table-row columns">
              <div class="table-heading column is-4"><p>Name:</p></div>
              <div class="table-data column is-8">
                <div v-if="!nonprofit.data.name">
                  <InlineFieldEditor
                    layout="inline"
                    type="textarea"
                    ref="nonprofitName"
                    :allow-empty="false"
                    :remove-returns="true"
                    error-text="This field can't be empty"
                    :value="nonprofit.NAME"
                    :edition-is-enabled="editing"
                    location="nonprofit.data.name"
                    v-on:next:field="openEdition('nonprofitAbout')"
                    v-on:previous:field="emitPreviousField()"
                  ></InlineFieldEditor>
                </div>
                <div v-else>
                  <InlineFieldEditor
                    layout="inline"
                    type="textarea"
                    ref="nonprofitName"
                    :allow-empty="false"
                    :remove-returns="true"
                    error-text="This field can't be empty"
                    :edition-is-enabled="editing"
                    :value="nonprofit.data.name"
                    location="nonprofit.data.name"
                    v-on:next:field="emitNextField()"
                    v-on:previous:field="emitPreviousField()"
                  ></InlineFieldEditor>
                </div>
              </div>
            </div>
            <div class="table-row columns">
              <div class="table-heading column is-4"><p>Deductibility:</p></div>
              <div class="table-data column is-8"><p>501(c)({{nonprofit.SUBSECTION}}) nonprofit. Donations are 100% deductible</p></div>
            </div>
            <div class="table-row columns">
              <div class="table-heading column is-4"><p>Classification:</p></div>
              <div class="table-data column is-8"><p v-html="nonprofit.CLASSIFICATION"></p></div>
            </div>
            <div class="table-row columns">
              <div class="table-heading column is-4"><p>Type/Activity:</p></div>
              <div class="table-data column is-8"><p>{{nonprofit.NTEE_CD.length > 1 ? nonprofit.NTEE_CD : nonprofit.ACTIVITY}}</p></div>
            </div>
            <div class="table-row columns">
              <div class="table-heading column is-4"><p>Address:</p></div>
              <div class="table-data column is-8">
                <p>
                  <span v-html="nonprofit.STREET"></span>,
                  <span v-html="nonprofit.CITY"></span>,
                  <span v-html="nonprofit.STATE"></span>,
                  <span v-html="nonprofit.ZIP"></span>
                </p>
              </div>
            </div>
            <div class="table-row columns">
              <div class="table-heading column is-4"><p>Employer ID Number (EIN):</p></div>
              <div class="table-data column is-8"><p>{{nonprofit.EIN}}</p></div>
            </div>
            <div class="helper-text">
              *Data from IRS.gov
            </div>
          </div>
          <div class="column is-3">
            <div class="nonprofit-description__manage-cta">
              <button
                @click="enableEdition()"
                class="unselectable button is-medium is-rounded"
                v-if="!claimed">Claim this organization
              </button>
              <div v-if="claimed">
                <button
                  @click="enableEdition()"
                  class="unselectable button is-medium is-rounded"
                  v-if="!editing && canEdit">Manage this organization
                </button>
                <button
                  @click="closeEdition()"
                  class="unselectable button is-medium is-rounded"
                  v-if="editing">Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: [ "nonprofit", "editing", "canEdit" ],
  components: {
    InlineFieldEditor: () => import("Components/input/InlineFieldEditor.vue")
  },
  methods: {
    enableEdition () {
      this.$emit("edit:open")
    },
    closeEdition () {
      this.$emit("edit:close")
    },
    openEdition (fieldName) {
      this.$refs[fieldName].openEdition()
    },
    emitPreviousField () {
      this.$emit("edit:previous")
    },
    emitNextField () {
      this.$emit("edit:next")
    }
  },
  computed: {
    claimed () {
      return this.$store.state.nonprofit.data.claimed
    }
  }
}
</script>

<style scoped lang="scss">
.nonprofit-extended {
  padding-top: 20px;
  padding-bottom: 40px;

  .helper-text {
    font-size: 12px;
  }

  &__icon {
    display: flex;
    flex-direction: row;
    align-content: center;

    .icon {
      width: 30px;
      text-align: center;
      display: block;
    }
  }
  &__media {
    margin-bottom: 20px;

    .icon {
      margin-bottom: 20px;
    }
  }
  &__about {
    @include tablet {
      width: 50%;
    }
    @include widescreen {
      width: 66.66667%;
    }
  }
  &__icons {
    @include tablet {
      width: 50%;
    }
    @include widescreen {
      width: 33.33333%;
    }
  }

  &__share-figure {
    margin: 30px 0;

    img {
      width: 100%;
    }
  }

  .table-row {
    font-size: 20px;    
  }
  .table-heading {
    font-weight: bold;
  }
  .table-heading,
  .table-data {
    padding-bottom: 0;
    p {
      margin-bottom: 0;
    }
  }
}

.nonprofit-description {
  margin-bottom: 30px;
  font-size: 20px;
  line-height: 1.5;

  @include tablet {
    padding: 0 70px;
  }

  &__manage-cta {
    display: flex;
    height: 100%;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-end;
    button {
      font-size: 1.1rem;
    }
  }
}


</style>
