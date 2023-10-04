const port = 3000;
const baseUrl = `http://localhost:${port}`;
const inputDescription = document.querySelector("#description");
const inputFileToUpload = document.querySelector("#brandLogo");
const submitButton = document.querySelector("#submit");

submitButton.addEventListener("click", uploadFile)

async function uploadFile() {
    let endpoint = baseUrl + "/upload";
    const file = inputFileToUpload.files[0];
    const formData = new FormData();
    formData.append('file', file);
    fetch(endpoint, {
        method: 'POST',
        
        //body: JSON.stringify(data)
        body: formData
    })
    .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('File upload failed');
        }
      })
      .then(data => {
        console.log('Server response:', data);
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
}
