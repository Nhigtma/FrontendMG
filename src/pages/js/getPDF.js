// src/pages/js/getPDF.js
export function downloadPDF(userId, token) {
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
        return response.blob();
    })
    .then(blob => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `routines_${userId}.pdf`;
        document.body.appendChild(link);
        link.click();
        link.remove();

        window.URL.revokeObjectURL(link.href);
    })
    .catch(error => console.error('Error:', error));
}
