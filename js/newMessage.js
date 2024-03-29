const formNewMessage = document.getElementById('form-new-message')
const titleInput = document.getElementById('title')
const descriptionInput = document.getElementById('description')

formNewMessage.addEventListener('submit', (event) => {
  event.preventDefault() // impede comportamento padrão submit

  const titleValue = titleInput.value
  const descriptionValue = descriptionInput.value

  const userId = localStorage.getItem('userId')

  if (!userId) {
    alert('Você precisa fazer login para cadastrar um recado.')
  }
  if (titleValue && descriptionValue) {
    const newMessage = {
      title: titleValue,
      description: descriptionValue,
      userId
    }
  
    createNewMessage(newMessage)
  }else{
    alert("Falta titulo ou descrição")
  }


})

async function createNewMessage(message) {
  try {
    const response = await api.post('/notes', message)

    if (response.status === 201) {
      alert('Recado cadastrado com sucesso!')

      titleInput.value = ""
      descriptionInput.value = ""

      location.href = "listar-recados.html"
    }
  } catch (error) {
    console.log('Erro ao cadastrar recado', error)
  }
}



(() => {
  'use strict'


  const forms = document.querySelectorAll('.needs-validation')


  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()