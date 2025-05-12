document.querySelector('#aside-content #card-info-btn').addEventListener('click',function(){
    let queryArr = location.href.split('/')
    location.href=queryArr[0]+'//'+queryArr[2]+'/'+queryArr[3]+'/'+queryArr[4]+'/contact'
})