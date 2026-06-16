function extractCodeforcesData() {
  const problemStatement = document.querySelector('.problem-statement')?.innerText || "Problem statement not found";
  const sourceCodeElements = document.querySelectorAll('pre.prettyprint'); // This is usually where CF shows code in submission page
  const sourceCode = sourceCodeElements.length > 0 ? sourceCodeElements[sourceCodeElements.length - 1].innerText : "Code not found";
  return { problemStatement, sourceCode, platform: "Codeforces" };
}

function extractPbInfoData() {
  const problemStatement = document.querySelector('#enunt_problema')?.innerText || "Enunt nu a fost gasit";
  const sourceCode = document.querySelector('pre.source-code')?.innerText || "Cod nu a fost gasit"; // Adjust selector as per PbInfo
  return { problemStatement, sourceCode, platform: "PbInfo" };
}

function showFeedbackPopup(feedbackText) {
  const popup = document.createElement("div");
  popup.className = "ai-coach-popup ai-coach-glass";
  
  const header = document.createElement("div");
  header.className = "ai-coach-header";
  header.innerHTML = `<span>🧠 AI Coach Feedback</span><button class="ai-coach-close">&times;</button>`;
  
  const body = document.createElement("div");
  body.className = "ai-coach-body";
  body.innerText = feedbackText;

  popup.appendChild(header);
  popup.appendChild(body);
  
  document.body.appendChild(popup);
  
  // Close functionality
  popup.querySelector(".ai-coach-close").addEventListener("click", () => {
    popup.remove();
  });
  
  // Auto-remove after 10 seconds
  setTimeout(() => {
    if (document.body.contains(popup)) {
      popup.remove();
    }
  }, 10000);
}

function checkSubmissionStatus() {
  // Mock logic to detect "Accepted" verdict
  // Real implementation would use MutationObserver on the verdict table cell
  const isAcceptedCodeforces = document.body.innerHTML.includes("Accepted") && window.location.href.includes("status");
  const isAcceptedPbInfo = document.body.innerHTML.includes("100 puncte") || document.body.innerHTML.includes("Scor: 100");
  
  if (isAcceptedCodeforces || isAcceptedPbInfo) {
    const data = window.location.href.includes("codeforces") ? extractCodeforcesData() : extractPbInfoData();
    
    // Send data to background script
    chrome.runtime.sendMessage({
      action: "submitSolution",
      ...data
    }, response => {
      if (response && response.success) {
        showFeedbackPopup(response.feedback || "Ai rezolvat problema cu succes! Soluția ta este optimă.");
      } else {
        showFeedbackPopup("Nu s-a putut obține feedback de la AI Coach. " + (response?.error || ""));
      }
    });
  }
}

// For demonstration: Check on load, and maybe observe DOM changes
window.addEventListener("load", () => {
  setTimeout(() => {
    checkSubmissionStatus();
    injectSyncButton();
  }, 2000); // Wait 2s to ensure dynamic content loads
});

function injectSyncButton() {
  const isPbInfoSolutii = window.location.href.includes("pbinfo.ro/solutii");
  const isCodeforcesSubmissions = window.location.href.includes("codeforces.com/submissions/") || window.location.href.includes("/status");
  
  if (!isPbInfoSolutii && !isCodeforcesSubmissions) return;

  if (document.getElementById("ai-coach-sync-btn")) return;

  const btn = document.createElement("button");
  btn.id = "ai-coach-sync-btn";
  btn.className = "ai-coach-glass ai-coach-sync-btn";
  btn.innerHTML = "🧠 Sync AI Coach (Ultimele 3 de 100p)";
  
  btn.addEventListener("click", () => {
    btn.disabled = true;
    btn.innerHTML = "Sincronizare...";
    if (isPbInfoSolutii) {
      syncPbInfoSubmissions(btn);
    } else {
      syncCodeforcesSubmissions(btn);
    }
  });

  document.body.appendChild(btn);
}

async function syncPbInfoSubmissions(btn) {
  const links = [];
  const rows = document.querySelectorAll('tr');
  for (const row of rows) {
    if ((row.innerText.includes('100') || row.innerText.includes('Accepted')) && row.querySelector('a[href*="/solutii/"]')) {
      const a = row.querySelector('a[href*="/solutii/"]');
      if (a && !links.includes(a.href)) {
        links.push(a.href);
      }
    }
  }
  const toFetch = links.slice(0, 3);
  await fetchAndSubmitSubmissions(toFetch, "PbInfo", btn);
}

async function syncCodeforcesSubmissions(btn) {
  const links = [];
  const rows = document.querySelectorAll('tr[data-submission-id]');
  for (const row of rows) {
    if (row.innerText.includes('Accepted')) {
      const a = row.querySelector('a.view-source') || row.querySelector('a[href*="/submission/"]');
      if (a && !links.includes(a.href)) {
        links.push(a.href);
      }
    }
  }
  const toFetch = links.slice(0, 3);
  await fetchAndSubmitSubmissions(toFetch, "Codeforces", btn);
}

async function fetchAndSubmitSubmissions(links, platform, btn) {
  if (links.length === 0) {
    btn.innerHTML = "Nicio solutie gasita";
    setTimeout(() => { btn.innerHTML = "🧠 Sync AI Coach (Ultimele 3 de 100p)"; btn.disabled = false; }, 3000);
    return;
  }

  let count = 0;
  for (const link of links) {
    try {
      btn.innerHTML = `Sincronizare ${count + 1}/${links.length}...`;
      const res = await fetch(link);
      const text = await res.text();
      
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, 'text/html');
      
      let sourceCode = "Code not found";
      let problemId = link.split('/').pop().split('?')[0];

      if (platform === "Codeforces") {
        sourceCode = doc.querySelector('pre.prettyprint, pre#program-source-text')?.innerText || "Code not found";
      } else {
        sourceCode = doc.querySelector('pre.source-code, pre')?.innerText || "Code not found";
      }

      await new Promise(resolve => {
        chrome.runtime.sendMessage({
          action: "submitSolution",
          problemStatement: "Sincronizat automat",
          sourceCode: sourceCode,
          platform: platform,
          problemId: problemId
        }, resolve);
      });

      count++;
      // Wait 1.5s to avoid spam
      await new Promise(r => setTimeout(r, 1500));
    } catch (e) {
      console.error("Error fetching", link, e);
    }
  }

  btn.innerHTML = "✅ Sincronizat!";
  setTimeout(() => { btn.innerHTML = "🧠 Sync AI Coach (Ultimele 3 de 100p)"; btn.disabled = false; }, 3000);
}
