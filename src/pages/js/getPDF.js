function downloadPDF(userId) {
    fetch(`http://localhost:4000/protected/routines/generatePDF/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/pdf',
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error generando PDF');
        }
        return response.blob(); // Convertimos la respuesta a un blob (archivo)
    })
    .then(blob => {
        // Crear un enlace temporal para forzar la descarga del archivo
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `routines_${userId}.pdf`; // Corrección en la concatenación de la cadena
        document.body.appendChild(link); // Añadir el enlace al cuerpo del documento
        link.click(); // Forzar el clic para descargar
        link.remove(); // Eliminar el enlace del DOM

        // Liberar el objeto URL
        window.URL.revokeObjectURL(link.href);
    })
    .catch(error => console.error('Error:', error));
}