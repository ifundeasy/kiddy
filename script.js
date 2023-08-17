const resourceURL = "https://raw.githubusercontent.com/ifundeasy/kiddy/main/sites.json";

async function init() {
  let sites = await fetch(resourceURL);
  sites = await sites.json();

  let match = false;
  for (let s in sites) {
    const site = sites[s];
    const pattern = new RegExp(`https://(.+.)?${site}`);
    const isMatchVisitedSite = window.location.href.match(pattern)

    console.debug(`Visit "${window.location.href}" is ${ isMatchVisitedSite ? 'match' : 'not match' } with "${site}"`)
    if (isMatchVisitedSite) {
      match = true;
      break;
    }
  }

  if (match) {
    console.debug('Disable contextmenu browser.')
    window.addEventListener("contextmenu", (e) => e.preventDefault());
  } else {
    const moveTo = `https://${sites[0]}`;
    console.debug(`Blocked URL! will redirect to ${moveTo}`)
    window.location.href = moveTo;
  }
}

init();
