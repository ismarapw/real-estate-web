// Event Hover and Click for Location Selector
const loc = document.getElementsByClassName('place')
const formSection = document.getElementById("form-section")
const formTitle = document.getElementsByClassName("loc-predict")[0]
let selectedIdx = 0
let isSelected = false


for(let i = 0 ; i < loc.length; i++){
    loc[i].addEventListener("click",() => {

        // check whether the location is clicked or not
        if (selectedIdx !== i){
            loc[selectedIdx].getElementsByTagName('img')[0].classList.remove("active")
            loc[selectedIdx].getElementsByClassName('select')[0].classList.remove("active")
        }

        // Add overlay
        loc[i].getElementsByTagName('img')[0].classList.add("active")
        loc[i].getElementsByClassName('select')[0].classList.add("active")
        selectedIdx = i
        isSelected = true
        
        // Change Title of the form according to the selected location
        const selectedLoc = loc[selectedIdx].getElementsByClassName("place-name")[0].innerHTML
        formTitle.innerHTML = ' At "'+ selectedLoc + '"'

        // Scroll to FormSection
        window.scrollTo({top: formSection.offsetTop - 30,left: 0,behavior: "smooth"})
    })
}

// Event for Handling The Form
const form = document.getElementsByClassName('form-wrapper')[0]
const warn = document.getElementsByClassName('warn')[0]
const resView = document.getElementsByClassName('result')[0]
const loadView = document.getElementsByClassName("loading")[0]
let isWarn = false

// Fetching Function
async function uploadForm(formData){
    try {
        loadView.style.display = 'flex'
        const url = "/predict"
        const response = await fetch(url, {
            method : 'POST',
            body : formData
        })
        const result = await response.json()

        return result

    }catch(error) {
        return error
    }
}

form.addEventListener('submit', (e)=>{

    // Check whether the location is Selected or Not
    if (isSelected){

        // remove warn if exist
        if (isWarn){
            warn.classList.remove('active')
        }

        // Send formData and get the reponse
        let formData = new FormData(form)
        uploadForm(formData)
            .then(result => {
                // Server is to fast :3, lets make a timer
                setTimeout(() => {
                    const formatter = new Intl.NumberFormat("en-Us", { style: "currency", currency: "INR" })
                    const res_val = parseFloat(result['pred_res']).toFixed(2)
                    resView.innerHTML = formatter.format(res_val)
                    loadView.style.display = 'none'
                }, 1000);
            })
            .catch(error => {console.log(error)})

    }else {
        // Add warning
        isWarn = true
        warn.classList.add('active')
    }
    
    e.preventDefault()
})

