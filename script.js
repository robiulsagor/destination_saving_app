const form = document.getElementById("form")
const card_container = document.querySelector(".card_container")
let showTitle = false

let getLc = JSON.parse(localStorage.getItem("data"))
if (getLc === null) {
    getLc = ""
}

const topText = () => {
    // make the title of the card_container top
    const title = document.createElement("h2")
    const titleText = document.createTextNode("Destination Details")
    title.setAttribute("class", "title")
    title.appendChild(titleText)

    card_container.appendChild(title)
}


form.addEventListener("submit", function (e) {
    e.preventDefault()

    const name = form.elements['name'].value
    const location = form.elements['location'].value
    const photo = form.elements['photo'].value
    const description = form.elements['description'].value

    const cardId = new Date().getTime()

    let formData = { id: cardId, name, location, photo, description }

    showTitle !== true && topText()
    showTitle = true

    const getLocal = localStorage.getItem("data")

    const t = Array(formData)

    if (!getLocal) {
        localStorage.setItem("data", JSON.stringify(t))
    } else {
        let arr = JSON.parse(localStorage.getItem("data"))
        arr = JSON.stringify([...arr, formData])
        // console.log(arr);
        localStorage.setItem("data", arr)
    }
    showDest(formData)

    formData = {}
    form.elements['name'].value = ''
    for (var i = 0; i < form.length; i++) {
        form.elements[i].value = ''
    }

})

const showDest = (data) => {
    console.log(data);
    // make the div of card
    const card = document.createElement("div")
    const cardId = new Date().getTime()
    card.setAttribute("class", "card")
    card.setAttribute("id", cardId)

    // make the img obj
    const pic = document.createElement("img")

    pic.src = data.photo ? data.photo : "https://media.istockphoto.com/id/1210768445/photo/skyscraper-in-dhaka-metropolitan-area.jpg?s=612x612&w=is&k=20&c=oXfsrw8JcElvsYtsve8HVEa97W1n0j1AQ7AxFcMMKFY="


    // make the destination name
    const card_text_1 = document.createElement("h4")
    const card_text_1_text = document.createTextNode(data.name)
    card_text_1.appendChild(card_text_1_text)
    card_text_1.setAttribute("class", "card-text")

    // make the destination location
    const card_text_2 = document.createElement("p")
    const card_text_2_text = document.createTextNode(data.location)
    card_text_2.appendChild(card_text_2_text)
    card_text_2.setAttribute("class", "card-text")

    // make the destination 
    const card_text_3 = document.createElement("p")
    const card_text_3_text = document.createTextNode(data.description)
    card_text_3.appendChild(card_text_3_text)
    card_text_3.setAttribute("class", "card-text")

    // make the remove button 
    const remove_btn = document.createElement("button")
    const remove_btn_text = document.createTextNode("Remove")
    remove_btn.appendChild(remove_btn_text)
    remove_btn.setAttribute("class", "btn btn-danger")


    card.appendChild(pic)
    card.appendChild(card_text_1)
    card.appendChild(card_text_2)
    data.description.length !== 0 && card.appendChild(card_text_3)
    card.appendChild(remove_btn)

    card_container.appendChild(card)

    remove_btn.addEventListener("click", function (e) {
        var deleteCard = e.target.parentElement
        const allItmes = JSON.parse(localStorage.getItem("data"))
        const removeItem = allItmes.filter(a => a.id !== data.id)
        console.log(removeItem);
        localStorage.setItem("data", JSON.stringify(removeItem))

        deleteCard.remove()
        if (card_container.children.length <= 1) {
            showTitle = false
            card_container.children[0].remove()
        }
    })
}


if (getLc.length > 0) {
    getLc.map(d => {
        showDest(d)
    })
}