const keepServerAlive = (url, statusElementId) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        document.getElementById(
          statusElementId
        ).innerText = `${url} is alive. Last check: ${new Date().toLocaleTimeString()}`;
      } else {
        document.getElementById(
          statusElementId
        ).innerText = `Failed to contact ${url}. Last attempt: ${new Date().toLocaleTimeString()}`;
      }
    })
    .catch((error) => {
      document.getElementById(
        statusElementId
      ).innerText = `Error: ${error} at ${url}. Last attempt: ${new Date().toLocaleTimeString()}`;
    });
};

const startPingingServers = () => {
  const urls = [
    {
      url: "https://switcher-9g98.onrender.com/",
      statusElementId: "status-switcher",
    },
    {
      url: "https://gpa-calculator-v2wm.onrender.com/",
      statusElementId: "status-gpa",
    },
    {
      url: "https://pinger-b.onrender.com/",
      statusElementId: "status-pinger-b",
    }, // Replace with the actual URL of Pinger B
  ];

  urls.forEach(({ url, statusElementId }) => {
    keepServerAlive(url, statusElementId);
    setInterval(() => keepServerAlive(url, statusElementId), 720000); // Send a request every 12 minutes (720,000 milliseconds)
  });
};

// Initial call to start the process immediately
startPingingServers();
