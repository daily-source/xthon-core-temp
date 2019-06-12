<template>
  <div class="container is-fluid white-bg">
    <ReportCommentForm
      :state="reportCommentFormState"
      :comment-id="reportCommentId"
      :key="reportCommentId"
      v-on:close:modal="reportCommentFormState = false"
    ></ReportCommentForm>
    <UserDialog
      :spinner="userDialogSpinner"
      :state="userDialogModal"
      :disable-close= "userDialogSpinner"
      v-on:modal:close="closeModal()"
    >
      <div slot="header">{{userDialogHeading}}</div> 
      <div slot="content"><p>{{userDialogMessage}}</p></div> 
    </UserDialog>
    <div class="fundraiser-body__tab-section">
      <div class="fundraiser-lower__body-wrapper">
        <div class="tabs is-toggle">
          <div class="tabs__bottom-line"></div>
          <ul>
            <li @click="currentTab = 1" :class="{'is-active': currentTab === 1}"><a>Home</a></li>
            <li @click="loadMoreDonationsAndSwitchTab()" :class="{'is-active': currentTab === 2}">
              <a>Donors ({{fundraiser.counters.donationsCount}})</a>
            </li>
            <li @click="currentTab = 3" :class="{'is-active': currentTab === 3}">
              <a>Shares ({{fundraiser.shared_count}})</a>
            </li>
            <li @click="currentTab = 4" :class="{'is-active': currentTab === 4}">
              <a>Comments ({{fundraiser.counters.commentsCount}})</a>
            </li>
            <li @click="currentTab = 5" :class="{'is-active': currentTab === 5}">
              <a>Updates ({{fundraiser.counters.updatesCount}})</a>
            </li>
          </ul>
        </div>

        <div class="columns fundraiser-lower__columns">
          <div
            class="column fundraiser-lower__left-column"
            :class="{'is-8': currentTab === 1}"
          >
            <transition-group name="stretch">
              <div class="fundraiser-lower__tabs-tab" v-if="currentTab === 1" key="1">
                <div class="tab-section tab-section__updates">
                  <p v-if="canEdit" class="">
                    <a class="button is-light is-rounded is-medium" v-if="editing" @click="closeEditor()">Stop editing</a>
                    <a class="button is-light is-rounded is-medium" v-if="!editing" @click="openEditor()">Edit this section</a>
                  </p>
                  <div v-if="fundraiser.introText || editing">
                    <h2>More Info</h2>
                    <InlineRichTextEditor
                      ref="fundraiserParticipant"
                      error-text="This field can't be empty"
                      :value="fundraiser.introText"
                      :edition-is-enabled="editing"
                      placeholder="Add an intro text for this fundraiser"
                      location="fundraiser.introText"
                    ></InlineRichTextEditor>
                  </div>
                </div>
                <div class="tab-section tab-section__updates">
                  <h2>Updates <span><a class="button is-rounded is-medium is-warning is-pulled-right" @click="addNewUpdate()" v-if="editing">Add a new update</a></span></h2>
                  <InlineRichTextEditor
                    class="new-update-wrapper"
                    ref="newUpdate"
                    error-text="This field can't be empty"
                    :value="tempUpdateContent"
                    :edition-is-enabled="editing"
                    :default-open="true"
                    v-if="newUpdate"
                    placeholder="Add an update"
                    v-on:edit:close="closeNewUpdate()"
                    v-on:edit:save="saveNewUpdate($event)"
                  ></InlineRichTextEditor>

                  <div class="user-optional__updates-wrapper">
                    <FundraiserUpdates
                      :updates="updates"
                      :count="fundraiser.counters.updatesCount"
                      :fundraiser-id="fundraiser.id"
                      :key="'updates_' + fundraiser.id"
                      maxchar="700"
                      v-if="updates.length"
                    ></FundraiserUpdates>
                    <p v-else>There are no updates posted yet!</p>
                    <button class="button is-warning is-load-more" @click="loadMoreUpdates(true)" v-if="moreUpdates">Load more updates</button>
                  </div>
                </div>
                <p v-if="canEdit">
                  <a class="button is-light is-rounded is-medium" @click="closeEditor()" v-if="editing">Stop editing</a>
                </p>
                <h2>Nonprofit Organization</h2>
                <div class="tab-section tab-section__header">
                  <FundraiserNonprofitDetails :fundraiser="fundraiser" />
                </div>
                <div class="tab-section tab-section__comments">
                  <h2>Comments</h2>
                  <p v-if="comments.length === 0">No comments yet. Want to write the first one?</p>
                  <Comments
                    :comments="comments"
                    :more-comments="moreComments"
                    :fundraiser-id="fundraiser.id"
                    :key="'comments_' + fundraiser.id"
                    v-on:report:comment="openReportCommentForm($event)"
                    v-on:loadMoreComments="loadMoreComments(true)"
                  ></Comments>
                  <router-link
                    class="button fundraiser-lower__cta-start is-info is-large"
                    to="/fundraiser/create"
                  >Start your own fundraiser</router-link>
                </div>
              </div>
              <div class="fundraiser-lower__tabs-tab" v-if="currentTab === 2" key="2">
                <DonorsList
                  v-on:viewAllClicked="loadMoreDonationsAndSwitchTab()"
                  section-title="Donors"
                  view-all-cta="View all"
                  :donations="donationsByAmount"
                  layout="horizontal"
                  v-if="donationsByAmount.length"
                ></DonorsList>
                <div v-else>
                  <p>There are no donations yet. Want to be the first one?</p>
                  <DonateAction
                    :fundraiser-id="fundraiser.id"
                    trigger="fundraiser/lower/tab/donors">
                    <button class="button is-success">Donate now</button>
                  </DonateAction>
                </div>
              </div>
              <div class="fundraiser-lower__tabs-tab" v-if="currentTab === 4" key="4">
                <h2>Comments</h2>
                <Comments
                  :comments="comments"
                  :more-comments="moreComments"
                  :fundraiser-id="fundraiser.id"
                  v-on:loadMoreComments="loadMoreComments(true)"
                ></Comments>
                <div class="button fundraiser-lower__cta-start is-info is-large">
                  Start your own fundraiser
                </div>
              </div>
              <div class="fundraiser-lower__tabs-tab" v-if="currentTab === 5" key="5">
                <div class="tab-section tab-section__updates">
                  <p v-if="canEdit" class="">
                    <a class="button is-light is-rounded is-medium" v-if="editing" @click="closeEditor()">Stop editing</a>
                    <a class="button is-light is-rounded is-medium" v-if="!editing" @click="openEditor()">Edit this section</a>
                  </p>
                  <h2>Updates <span><a class="button is-rounded is-outlined is-medium is- is-pulled-right" @click="addNewUpdate()" v-if="editing">Add a new update</a></span></h2>
                  <InlineRichTextEditor
                    ref="newUpdate"
                    error-text="This field can't be empty"
                    :value="tempUpdateContent"
                    :edition-is-enabled="editing"
                    :default-open="true"
                    v-if="newUpdate"
                    placeholder="Add an update"
                    v-on:edit:close="closeNewUpdate()"
                    v-on:edit:save="saveNewUpdate()"
                  ></InlineRichTextEditor>
                  <div class="user-optional__updates-wrapper">
                    <FundraiserUpdates
                      :updates="updates"
                      :count="fundraiser.counters.updatesCount"
                      :fundraiser-id="fundraiser.id"
                      maxchar="700" />
                    <button class="button is-warning is-load-more" @click="loadMoreUpdates(true)" v-if="moreUpdates">Load more updates</button>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
            <div
              class="column fundraiser-lower__right-column"
              :class="{'is-4': currentTab === 1}"
              key="2"
              v-if="currentTab === 1"
            >
              <div class="tab-section tab-section__giving-level" v-if="fundraiser.giving_levels">
                <h4 class="lower-body-right-column__title">Choose a giving level</h4>
                <div class="user-optional__giving-level-wrapper">
                  <FundraiserGivingLevel
                    :level="givingLevel"
                    v-for="(givingLevel, index) in fundraiser.giving_levels"
                    :key="index"
                    :fundraiser="fundraiser" ></FundraiserGivingLevel>
                </div>
              </div>
              <div class="top-donors">
                <DonorsList
                  v-on:viewAllClicked="loadMoreDonationsAndSwitchTab()"
                  section-title="Donors"
                  view-all-cta="View all"
                  :donations="donationsByAmount"
                  limit="6"
                  order-by="amount"
                  layout="top"/>
              </div>
              <div class="recent-donations">
                <DonorsList
                  v-on:viewAllClicked="loadMoreDonationsAndSwitchTab()"
                  section-title="Recent Donations"
                  view-all-cta="View all"
                  :donations="donationsByDate"
                  ref="DonorsListByDate"
                  order-by="date"
                  limit="12"
                  layout="recent"/>
                <button class="button is-warning is-load-more" @click="loadMoreDonations(true, 'byDate')" v-if="moreDonationsByDate">Load more donations</button>
              </div>
              <div class="raised-through-sharing">
                <DonorsList
                  v-on:viewAllClicked="loadTab(3)"
                  section-title="Raised Through Sharing"
                  view-all-cta="View all"
                  :donations="donationsByAmount"
                  limit="3"
                  layout="sharing"/>
                <button class="button is-warning is-load-more" @click="loadMoreDonations()" v-if="moreDonations">Load more donations</button>
              </div>
              <div class="button fundraiser-pledge__cta is-success is-large">
                <DonateAction
                  :fundraiser-id="fundraiser.id"
                  trigger="fundraiser/lower/right/donors">
                  Donate now
                </DonateAction>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DonorsList from "Components/general/DonorsList.vue"
export default {
  props: [ "fundraiser", "editing", "canEdit" ],
  components: {
    FundraiserGivingLevel: () => import("Components/fundraiser/FundraiserGivingLevel.vue"),
    FundraiserNonprofitDetails: () => import("Components/fundraiser/FundraiserNonprofitDetails.vue"),
    FundraiserUpdates: () => import("Components/fundraiser/FundraiserUpdates.vue"),
    Comments: () => import("Components/general/Comments.vue"),
    ReportCommentForm: () => import("Components/general/ReportCommentForm.vue"),
    DonateAction: () => import("Components/general/DonateAction.vue"),
    DonorsList,
    InlineRichTextEditor: () => import("Components/input/InlineRichTextEditor.vue"),
    UserDialog: () => import("Components/general/UserDialog.vue")
  },
  data () {
    return {
      currentTab: 1,
      mounted: false,
      tempUpdateContent: "",
      newUpdate: false,
      userDialogSpinner: true,
      userDialogModal: false,
      userDialogHeading: "Processing...",
      userDialogMessage: "",
      reportCommentFormState: false,
      reportCommentId: null
    }
  },
  computed: {
    // temporary computed property
    moreDonations () {
      return this.$store.state.donations.byAmount.data.length < this.$store.state.fundraiser.counters.donationsCount
    },

    fundraiserId () {
      return this.$route.params.id
    },
    moreDonationsByAmount () {
      return true
    },
    moreDonationsByDate () {
      if (this.mounted) {
        return this.donationsByDate.length < this.$store.state.fundraiser.counters.donationsCount &&
                this.donationsByDate.length < this.$refs.DonorsListByDate._props.limit
      } else {
        return false
      }
    },
    moreUpdates () {
      return this.$store.state.updates.data.length < this.$store.state.fundraiser.counters.updatesCount
    },
    moreComments () {
      return this.$store.state.comments.data.length < this.$store.state.fundraiser.counters.commentsCount
    },
    donationsByAmount () {
      return this.$store.state.donations["byAmount"].data
    },
    donationsByDate () {
      return this.$store.state.donations["byDate"].data
    },
    updates () {
      return this.$store.state.updates.data
    },
    comments () {
      return this.$store.state.comments.data
    },
    common () {
      return this.$store.state.common
    }
  },
  methods: {
    /**
     * Fetch the comments for this fundraiser.
     * This was abstracted to a function so that it can be reused.
     */
    loadMoreComments (paginated = false) {
      if (this.fundraiser.counters.commentsCount === 0) {
        return
      }
      return this.$store.dispatch("FETCH_COMMENTS", { fundraiserId: this.fundraiserId, paginated: paginated })
        .then(data => {
          return data
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * Fetch the donations for this fundraiser.
     * This was abstracted to a function so that it can be reused.
     */
    loadMoreDonations (paginated = false, sortBy = "byAmount", showAll = false) {
      if (!this.moreDonationsByDate) {
        return
      }
      return this.$store.dispatch("FETCH_DONATIONS", {
        fundraiserId: this.fundraiserId,
        paginated: paginated,
        showAll: showAll,
        limit: showAll ? 50 : this.$store.state.donations[sortBy].limit,
        sortBy: sortBy
      })
        .then(data => {
          return data
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * Fetch the updates for this fundraiser.
     * This was abstracted to a function so that it can be reused.
     */
    loadMoreUpdates (paginated = false) {
      if (!this.moreUpdates) {
        return
      }
      return new Promise((resolve, reject) => {
        return this.$store.dispatch("FETCH_UPDATES", {
          fundraiserId: this.fundraiserId,
          paginated: paginated
        })
          .then(data => {
            resolve(data)
          })
          .catch(err => {
            reject(err)
          })
      })
    },
    /**
     * Select the active tab.
     */
    loadTab (tab) {
      this.currentTab = tab
    },
    /**
     * Recursively keep loading updates until the update in the params is found.
     * Or until there are no more updates to load from the DB.
     * This is needed when the visiting URL includes an update parameter,
     * which indicates a visitor coming from a shared update in the fundraiser page.
     */
    loadUpdatesAndScrollTo (itemId) {
      const target = `#update_${itemId}`

      var targetExists = this.updates.find(update => {
        return update.id === parseInt(itemId, 10)
      })
      if (targetExists) {
        this.$scrollTo(target, { offset: -200 })
      } else {
        if (this.moreUpdates) {
          return this.loadMoreUpdates(true)
            .then(data => {
              if (data) {
                return this.loadUpdatesAndScrollTo(itemId)
              }
            })
            .catch(err => {
              return err
            })
        } else {
          return { code: 404 }
        }
      }
    },
    /**
     * Recursively keep loading comments until the selected one in the params is found.
     * Or until there are no more comments to load from the DB.
     * This is needed when the visiting URL includes a comment parameter,
     * which indicates a visitor coming from a shared comment in the fundraiser page.
     */
    loadCommentsAndScrollTo (itemId) {
      const target = `#comment_${itemId}`

      var targetExists = false
      this.comments.forEach(comment => {
        if (comment.id === parseInt(itemId, 10)) {
          targetExists = true
        }

        if (comment.replies && comment.replies.length) {
          var a = comment.replies.find(reply => {
            return reply.id === parseInt(itemId, 10)
          })
          if (a) {
            targetExists = true
          }
        }
      })

      if (targetExists) {
        this.$scrollTo(target, { offset: -200 })
      } else {
        if (this.moreComments && this.mounted) {
          return this.loadMoreComments(true)
            .then(data => {
              if (data) {
                return this.loadCommentsAndScrollTo(itemId)
              }
            })
            .catch(err => {
              return err
            })
        } else {
          return { code: 404 }
        }
      }
    },
    loadMoreDonationsAndSwitchTab () {
      this.loadTab(2)
      this.loadMoreDonations(true, "byAmount", true)
    },
    closeEditor () {
      this.$emit("edit:close")
    },
    openEditor () {
      this.$emit("edit:open")
    },
    addNewUpdate () {
      this.newUpdate = true
    },
    closeNewUpdate () {
      this.newUpdate = false
      this.tempUpdateContent = ""
    },
    closeModal () {
      this.userDialogModal = false
    },
    saveNewUpdate ($event) {
      if ($event.value) {
        this.userDialogModal = true
        this.userDialogSpinner = true
        this.$store.dispatch("ADD_NEW_UPDATE", {
          fundraiserId: this.fundraiser.id,
          content: $event.value,
          userId: this.$store.state.user.auth0.sub,
          token: this.$store.state.user.tokenData.accessToken
        }).then(() => {
            this.userDialogModal = true
            this.userDialogSpinner = false
            this.errorMessage = "The update has been added."
            setTimeout(() => {
              this.userDialogModal = false
            }, 3000)
        })
          .catch(err => {
            this.userDialogModal = true
            this.userDialogSpinner = false
            this.userDialogMessage = `Error: ${err.message}. Please reload the page.`
          })
      }
    },
    executeMounted () {
      this.$store.commit("RESET_DONATIONS")
      this.$store.commit("RESET_UPDATES")
      this.$store.commit("RESET_COMMENTS")

      this.loadMoreUpdates(false)
      this.loadMoreComments(false)
      this.loadMoreDonations(false, "byAmount", false)
      this.loadMoreDonations(false, "byDate", false)
    },
    openReportCommentForm (payload) {
      this.reportCommentFormState = true
      this.reportCommentId = payload.commentId
    }
  },
  /**
   * Load updates, comments and donations on the mounted hook.
   * Below-the-fold items, are only loaded in the client, not in the server.
   */
  mounted () {
    this.mounted = true
    this.executeMounted()

    /**
     * If there's an update ID in the URL params, recursively load updates and scroll to them.
     */
    const updateId = this.$route.query.update_id
    if (updateId && this.moreUpdates) {
      this.currentTab = 5
      setTimeout(() => {
        this.loadUpdatesAndScrollTo(updateId)
      }, 4500)
    }

    /**
     * If there's a comment ID in the URL params, recursively load comments and scroll to them.
     */
    const commentId = this.$route.query.comment_id
    if (commentId && this.moreComments) {
      this.currentTab = 4
      setTimeout(() => {
        this.loadCommentsAndScrollTo(commentId)
      }, 4500)
    }
  },
  watch: {
    /**
     * Automatically load a new set of updates if the user chooses the Updates tab.
     * This way there are 2x updates shown in the tab compared to the main (default) home view,
     * where there are by default just 1x updates being shown.
     */
    currentTab (newVal) {
      if (newVal === 5) {
        if (this.moreUpdates) {
          this.loadMoreUpdates(true)
        }
      }
    },

    /**
     * As the view will be reused even if the ein param changes, we need to watch it
     * and fetch again the data for the other sections.
     */
    fundraiserId: function (fundraiserId) {
      this.executeMounted()
    },
    tempUpdateContent: function (newVal) {
      console.log(newVal)
    }
  }
}
</script>

<style scoped lang="scss">
.fundraiser-lower {
  &__body-wrapper {
    padding-bottom: 20px;

    h1 {
      color: $color-text;
    }

    .tabs {
      position: relative;
      &__bottom-line {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 100%;
        border-bottom: 1px solid #dbdbdb;
      }
    }
    .tabs.is-toggle li:first-child a {
      border-radius: 9px 0 0 0 !important;
    }
    .tabs.is-toggle li:last-child a {
      border-radius: 0 9px 0 0 !important;
    }

    .tabs {
      @include tablet {
      }
      ul {
        justify-content: center;

        @include tablet {
          justify-content: flex-start;
        }
      }
    }
  }

  &__cta-start {
    margin: 50px auto;
    border-radius: 10px;
    display: flex;
    font-size: 16px;
    include tablet {
      font-size: 22px;
      width: 70%;
    }
  }
  &__left-column {
    padding-right: 0.5rem;
  }
  &__right-column {
    @include tablet {
      padding-left: 2.7rem;
    }
  }
}
.fundraiser-pledge {
  &__cta {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    text-align: center;
  }
}

.is-load-more {
  margin-bottom: 40px;
}
.user-optional__giving-level-wrapper {
  margin-bottom: 30px;
}
.new-update-wrapper {
  margin-top: 80px;
}
</style>
