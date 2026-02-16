document.getElementById('upload-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Processing...';

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        if (response.ok) {
            resultDiv.innerHTML = `<a href="${result.download_url}" download>Download Converted File</a>`;
        } else {
            resultDiv.textContent = `Error: ${result.error}`;
        }
    } catch (error) {
        console.error('Error:', error);
        resultDiv.textContent = 'An unknown error occurred.';
    }
});