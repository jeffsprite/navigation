const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    { logo: 'A', url: 'https://www.acfun.cn' },
    { logo: 'B', url: 'https://bilibili.com' },
]
const removeX = (url) => {
    return url.replace('https://','')
        .replace('http://','')
        .replace('www.','')
        .replace(/\/.*/,'')
}


const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node,index) => {
        const $li = $(`
        <li>
            <div class="site">
                <div class="logo">${removeX(node.url)[0].toUpperCase()}</div>
                <div class="link">${removeX(node.url)}</div>
                <div class="close">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-close"></use>
                    </svg>
                </div>
            </div>
        </li>
        `).insertBefore($lastLi)
        $li.on('click',()=>{
            window.open(node.url)
        })
        $li.on('click','.close',(e)=>{
            e.stopPropagation()//阻止冒泡
            hashMap.splice(index,1)
            render();
        })
    })
}
render();

const $inputK = $('.searchForm>input')
let inputPlaceholder = $inputK.attr('placeholder')
$inputK.focus(()=>{
    $inputK.removeAttr('placeholder')
}).blur(()=>{
    if(!$inputK.value){
        $inputK.attr('placeholder',inputPlaceholder)
    }
})

//实现鼠标移至输入框自动聚焦，但有个小bug，暂时放弃
// $inputK.mouseover(()=>{
//     $inputK.focus()
// })

$('.addButton')
    .on('click', () => {
        let url = window.prompt('请问要输入什么网站？')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({
            logo: url,
            url: url
        })
        render();
    })

//这段代码可以在关掉页面之前存下
window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}