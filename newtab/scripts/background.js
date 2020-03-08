(function() {
    // CHANGE IMAGE COUNT HERE
    // !! The image name provided in the images folder must be in correct order [1.jpg - n.jpg] !!s
    const IMAGE_COUNT = 43
    
    initBackgroundImage(IMAGE_COUNT)
})()

function initBackgroundImage(IMAGE_COUNT) {
    const image_paths = []

    for (let i = 1; i <= IMAGE_COUNT; i++) {
        image_paths.push(`../images/background-images/${i}.jpg`)
    }
    
    const background = document.getElementsByClassName('background-image')[0]
    let index = parseInt(Math.random() * IMAGE_COUNT)
    const INTERVAL = 10000
    
    background.style.backgroundImage = `url(${image_paths[index]})`

    setInterval(() => {
        let newIndex = 0
        do {
            newIndex = parseInt(Math.random() * IMAGE_COUNT)
        } while(index == newIndex)

        index = newIndex
        background.style.backgroundImage = `url(${image_paths[index]})`
    }, INTERVAL)
}

