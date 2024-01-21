function calculateLove() {
    const maleSign = document.getElementById('maleSign').value;
    const femaleSign = document.getElementById('femaleSign').value;

 
    let result = localStorage.getItem(`${maleSign}_${femaleSign}`);

    if (!result) {
        result = Math.floor(Math.random() * 101); 
        localStorage.setItem(`${maleSign}_${femaleSign}`, result); 
    }


    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = `Zgodność: ${result}%`;

    return false;
}
