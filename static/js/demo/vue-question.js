Vue.component('question', {
    data: function () {
        localtimestampepoch = parseFloat(this.timestamp)
        localtimeDate = new Date(localtimestampepoch * 1000)

        return {
            localtime: localtimeDate.toString(),
            toggleToLike: (this.liked == 'True'),
            toggleSuccess: false,
            numLikes: parseInt(this.numberlikes)
        }
    },
    props: ['questiontext', 'questionurl', 'moreinfo', 'username', 'userurl', 'numbercomments', 'timestamp', 'numberlikes', 'liked', 'tags'],
    template: `
    <!-- If you liked it, then toggleToLike is false, since when you toggle the like button it will unlike. -->
    <div class="card border-left-primary shadow h-10 py-2 mb-2">
        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <!-- Question goes here -->
                    <div class="mb-1">
                        <h5>
                            <a :href="'/' + questionurl">{{ questiontext }}</a>
                            <br>
                            <span v-for="tag in tags" class="badge badge-light text-lowercase">{{ tag }}</span>
                        </h5>
                    </div>
                    <!-- Username goes here -->
                    <div class="text-xs mb-1">
                        <a :href="'/' + userurl" style="color: #808080">{{ username }}</a> on {{ localtime }}
                    </div>
                    <!-- Details go here -->
                    <div class="mb-1">
                        <p v-html="moreinfo"></p>
                    </div>
                </div>

                <!-- Number of comments goes here -->
                <div class="col-auto">
                    <b>{{ numbercomments }}</b> <i class="fas fa-comments fa-2x text-gray-300"></i>
                </div>

                <!-- Number of likes goes here -->
                <div class="col-auto">
                    <b>&nbsp;&nbsp;{{ numLikes }}</b> 
                    <span v-if="!toggleToLike">
                        <i class="fas fa-thumbs-up fa-2x text-gray-300" v-on:click="
                            toggleToLike = !toggleToLike;
                            numLikes++;
                            toggleLike(1)
                        "></i>
                    </span>
                    <span v-else>
                        <i class="fas fa-thumbs-up fa-2x text-blue-300" v-on:click="
                            toggleToLike = !toggleToLike;
                            numLikes--;
                            toggleLike(0)
                        " style="color:#4e73df;"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>`,
    methods: {
        toggleLike: function (likeValue) {
            // If 1 then like. If 0 then remove the like. If -1 then give dislike.
            console.log(this.questionurl);
            console.log(likeValue);

            this.$http.post('/postlike', {toggle: likeValue, identifier: this.questionurl}).then(response => {

                // successfully sent
                console.log('true')
                return true;

            }, response => {
                // error callback
                console.log('false')
                return false;
            });

            // alert(likeValue);
        }
    }
})

new Vue({
    el: '#question',
    data: {
        message: 'Hello Vue.js!'
    }
})


Vue.component('answer', {
    data: function () {
        localtimestampepoch = parseFloat(this.timestamp)
        localtimeDate = new Date(localtimestampepoch * 1000)

        return {
            localtime: localtimeDate.toString(),
            toggleToLike: (this.liked == 'True'),
            numLikes: parseInt(this.numberlikes),
            show: false
        }
    },
    props: ['answertext', 'username', 'userurl', 'numberlikes', 'liked', 'timestamp', 'answerid'],
    template: `
        <div class="card rounded-0 h-100 py-2">
            <div class="card-body">
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">
                        <!-- Answer goes here -->
                        <div class="mb-0">
                            <p v-html="answertext"></p>

                            <!-- Username goes here -->
                            <div class="text-xs mb-1">
                                <a :href="userurl" style="color: #808080">{{ username }}</a> on {{ localtime }}
                            </div>
                        </div>
                    </div>

                    <!-- Number of likes goes here -->
                    <div class="col-auto">
                        <b>&nbsp;&nbsp;{{ numLikes }}</b> 
                        <span v-if="!toggleToLike">
                            <i class="fas fa-thumbs-up fa-2x text-gray-300" v-on:click="
                                toggleToLike = !toggleToLike;
                                numLikes++;
                                toggleLike(1)
                            "></i>
                        </span>
                        <span v-else>
                            <i class="fas fa-thumbs-up fa-2x text-blue-300" v-on:click="
                                toggleToLike = !toggleToLike;
                                numLikes--;
                                toggleLike(0)
                            " style="color:#4e73df;"></i>
                        </span>
                    </div>

                </div>
                <div class="row no-gutters align-items-center">
                    <div class="col mr-2">

                        <hr>

                        <slot name="comments"></slot>

                        <hr>

                        <a href="javascript:void(0)" v-on:click="show=true" v-if="!show" style="font-size:x-small">Add a comment</a>

                        <form method="post" v-if="show">
                            <div class="form-group" style="overflow:auto">
                                <textarea type="text" name="comment" class="form-control" id="comment" style="margin-top: 0px; margin-bottom: 0px; height: 189px;"></textarea>
                                <input type="hidden" id="answerid" name="answerid" :value="answerid"></input>
                            </div>
                            <button type="submit" class="btn btn-success">Submit</button>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>`,
    methods: {
        toggleLike: function (likeValue) {
            // If 1 then like. If 0 then remove the like. If -1 then give dislike.
            console.log(this.answerid);
            console.log(likeValue);

            this.$http.post('/postlike', {toggle: likeValue, identifier: this.answerid}).then(response => {

                // successfully sent
                console.log('true')
                return true;

            }, response => {
                // error callback
                console.log('false')
                return false;
            });

            // alert(likeValue);
        }
    }
})

Vue.component('comment', {
    data: function () {
        localtimestampepoch = parseFloat(this.timestamp)
        localtimeDate = new Date(localtimestampepoch * 1000)

        return {
            localtime: localtimeDate.toString(),
            show: false
        }
    },
    props: ['text', 'username', 'userurl', 'timestamp'],
    template: `
    <div>
        <div class="mb-0" style="font-size:small">
            {{ text }}
        </div>
        <div class="text-xs mb-1" style="text-align:right">
            <a :href="userurl" style="color: #808080">{{ username }}</a> on {{ localtime }}
        </div>
    </div>
`
})

new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue.js!'
    }
})

Vue.component('addanswer', {
    data: function () {
        return {
            value: '',
            tags: [],
            mainMessage: ''
        }
    },
    props: ['showheader', 'submiturl'],
    template: `
    <div class="card rounded-0 h-100 py-2">
        <h5 class="card-header" v-if="showheader==='True'">Add an Answer</h5>

        <div class="card-body">
            <div class="row no-gutters align-items-center">
                <div class="col mr-2">
                    <form v-bind:action="submiturl" method="post">
                        <div class="form-group" style="overflow: auto;">
                            <div style="height: 189px; border:1px solid black; resize:both; overflow:auto; border-color:#808080" @focusout="updateMainMessage" v-html="mainMessage" contenteditable="true"></div>
                            <textarea class="d-none" name="message" :value="mainMessage"></textarea>

                            <span v-for="tag in tags" class="badge badge-primary text-lowercase">{{ tag }}</span>
                            <input type="hidden" id="tags" name="tags" class="form-control" style="margin-top: 0px; margin-bottom: 0px;" v-model:value="value" v-on:input="updatetags(value)"></input>
                            <button type="submit" class="btn btn-success">Submit</button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    </div>
    `,
    methods: {
        updatetags: async function (newtags) {
            // tags is a string like 'tag1, tag2  , tag3'
            console.log(this.tags)
            console.log(newtags)
            this.tags.length = 0; // The more performant way to clear a list in javascript

            var splitlist = newtags.split(',');

            for (tag in splitlist) {
                this.tags.push(splitlist[tag].trim())
            };
            console.log(this.tags) // => 'not updated'
            await this.$nextTick();
            console.log(this.tags) // => 'updated'
        },
        updateMainMessage: function (e) {
            console.log(e.target.innerText)
            console.log(e.target.innerHTML)
            this.mainMessage = e.target.innerHTML;
        }
    }
})

new Vue({
    el: '#addanswer'
})