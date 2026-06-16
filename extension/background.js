chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "submitSolution") {
    // Trimite către backend-ul de inteligență artificială
    const backendUrl = "http://localhost:3000/submit_solution";
    
    fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        problemStatement: request.problemStatement,
        code: request.sourceCode,
        problemId: request.problemId,
        platform: request.platform
      })
    })
    .then(response => response.json())
    .then(data => {
      sendResponse({ success: true, feedback: data.feedback });
    })
    .catch(error => {
      console.error("Error connecting to Brain Agent API:", error);
      sendResponse({ success: false, error: error.message });
    });

    return true; // Asynchronous response
  }
});
