<template>
  <div class="main_container">
    <div class="land_cont">
      <div class="first_sec position-relative pt-4">
        <Nav />

        <div class="main_first mt-4 d-flex justify-content-center align-items-center">
          <div class="cont">
            <h1><span>Aella</span> Assessment</h1>

          </div>
        </div>
      </div>

      <div v-if="details == null" class="second_sec py-5">
        <div class="cont">
          <div class="position-relative mb-5 card_main_cont">
            <div class="card_cont">
              <h1 class="mb-4">Load Youtube Video and Comments</h1>

              <div class="d-flex justify-content-center">
                <form>
                  <div class="form-group">
                    <div class="col-md-12">
                      <label class="form-labe">Youtube ID</label>
                      <input class="form-control" type="text" v-model="youtube_id"/>
                    </div>
                  </div><br>
                  <button v-if="loading" class="btn btn-primary" type="button">Processing</button>
                  <button v-else class="btn btn-primary" type="button" @click="fetchVideo">Load Video</button>
                </form>
              </div>

            </div>
          </div>
        </div>
      </div>


      <div v-if="details != null" class="second_sec py-5">
        <div class="cont">
          <div class="position-relative mb-5 card_main_cont">
            <div class="card_cont">
              <!-- <h1 class="mb-4">Load Youtube Video and Comments</h1> -->
              <div class="container mt-5">
                <div class="row  d-flex justify-content-center">
                  <div class="col-md-2"></div>
                    <div class="col-md-8">
                        <center><iframe style="width: 100%;" height="315" :src="'https://www.youtube.com/embed/'+details.id"></iframe></center> 
                        <div class="headings d-flex justify-content-between align-items-center mb-3"><br>
                          <h5>{{details?.snippet?.localized?.title}}</h5><br>                         
                        </div>
                        <p>{{details?.snippet?.localized?.description}}</p>

                        <div class="headings d-flex justify-content-between align-items-center mb-3">
                          <h5>Comments({{details?.statistics?.commentCount}})</h5>                          
                          <div class="buttons">
                              <span class="badge bg-white d-flex flex-row align-items-center">
                                  <span class="text-primary">Likes({{details?.statistics?.likeCount}})</span>&nbsp;
                                  <span class="text-danger">Views({{details?.statistics?.viewCount}})</span>
                              </span>                              
                          </div>                          
                        </div>
                        
                        <div v-for="(data, index) in comments " :key="index" class="card p-3">
                          <div class="d-flex justify-content-between align-items-center">
                            <div class="user d-flex flex-row align-items-center">
                              <img :src="data?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl" width="30" class="user-img rounded-circle mr-2">
                              <span><small class="font-weight-bold text-primary">{{data?.snippet?.topLevelComment?.snippet?.authorDisplayName}}</small> <small class="font-weight-bold">{{data?.snippet?.topLevelComment?.snippet?.textDisplay}}</small></span>                              
                            </div>
                            <small>{{getFormattedDate(data?.snippet?.topLevelComment?.snippet?.publishedAt)}}</small>
                          </div>                          
                        </div>                                         
                    </div>
                    <div class="col-md-2"></div>

                    <div class="d-flex justify-content-center">
                      <div><br>
                        <button v-if="loading" class="btn btn-primary" type="button">Processing</button>
                        <button v-else class="btn btn-primary" type="button" @click="fetchComments(next_page)">Load More Comments</button>
                      </div>
                    </div>
                    
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import Footer from '../../components/dashboard-resusesable/WebFooter.vue';
import Nav from '../../components/dashboard-resusesable/WebNav.vue';
import axios from 'axios';
import { format } from 'date-fns';
import moment from 'moment';

// Define refs
const details = ref(null);
const comments = ref([]);
const loading = ref(false);
const youtube_id = ref(null);
const next_page = ref(null);

// Define functions
const fetchVideo = async () => {
  loading.value = true;
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/youtube/video/${youtube_id.value}`);
    const res = await axios.get(`http://localhost:3000/api/v1/youtube/comments/${youtube_id.value}`);
    details.value = response?.data?.data?.items[0];
    comments.value = res?.data?.data?.items;
    next_page.value = res?.data?.data?.nextPageToken;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const fetchComments = async (next_page_url) => {
  loading.value = true;
  try {
    const response = await axios.get(`http://localhost:3000/api/v1/youtube/comments/${youtube_id.value}?pageToken=${next_page_url}`);
    comments.value.push(...response?.data?.data?.items);
    next_page.value = response?.data?.data?.nextPageToken;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const getFormattedDate = (date) => {
  return date ? moment(date).format('MMM Do, YYYY') : 'No date available';
};

const returnHome = () => {
  details.value = [];
  comments.value = [];
  next_page.value = null;
  youtube_id.value = null;
};

// Lifecycle hook
onMounted(async () => {
});
</script>

<style src="../../assets/web.css"></style>
<style>
.land_cont .third_sec {
  background: url('../../assets/man-phone-1.png');
  background-size: cover;
  /* background-attachment: fixed; */
}

body {
    background-color: #f7f6f6
}

.card {
    
    border: none;
    box-shadow: 5px 6px 6px 2px #e9ecef;
    border-radius: 4px;
}


.dots{

    height: 4px;
  width: 4px;
  margin-bottom: 2px;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
}

.badge{

        padding: 7px;
        padding-right: 9px;
    padding-left: 16px;
    box-shadow: 5px 6px 6px 2px #e9ecef;
}

.user-img{

    margin-top: 4px;
}

.check-icon{

    font-size: 17px;
    color: #c3bfbf;
    top: 1px;
    position: relative;
    margin-left: 3px;
}

.form-check-input{
    margin-top: 6px;
    margin-left: -24px !important;
    cursor: pointer;
}


.form-check-input:focus{
    box-shadow: none;
}


.icons i{

    margin-left: 8px;
}
.reply{

    margin-left: 12px;
}

.reply small{

    color: #b7b4b4;

}


.reply small:hover{

    color: green;
    cursor: pointer;

}
</style>
