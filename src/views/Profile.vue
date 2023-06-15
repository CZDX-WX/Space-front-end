<template>
    <i class="fa fa-apple" id="apple"></i>
    <i class="fa fa-twitter" id="twitter"></i>
    <i class="fa fa-github-square github" id="github" @click="openInNewTab('https://github.com/CZDXWX1226566881/Blog')"></i>
    <i class="fa fa-facebook-square" id="facebook"></i>
</template>

<script setup lang="ts">


const openInNewTab = (url) => {
    window.open(url, '_blank');
}
</script>


<style scoped>
@import url(https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css);


#apple,
#twitter,
#github,
#facebook {
    font-size: 8em;
    background-color: #18191f;
    color: #fff;
    box-shadow: 2px 2px 2px #00000080, 10px 1px 12px #00000080,
        2px 2px 10px #00000080, 2px 2px 3px #00000080, inset 2px 2px 10px #00000080,
        inset 2px 2px 10px #00000080, inset 2px 2px 10px #00000080,
        inset 2px 2px 10px #00000080;
    border-radius: 29px;
    padding: 11px 19px;
    margin: 0 40px;
    animation: animate 3s linear infinite;
    text-shadow: 0 0 50px #0072ff, 0 0 100px #0072ff, 0 0 150px #0072ff,
        0 0 200px #0072ff;
}

#twitter {
    animation-delay: 0.3s;
}

#facebook {
    animation-delay: 0.7s;
}

#github {
    animation-delay: 0.1s;
}

@keyframes animate {
    from {
        filter: hue-rotate(0deg);
    }

    to {
        filter: hue-rotate(360deg);
    }
}
</style>