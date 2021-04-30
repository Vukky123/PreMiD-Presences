const presence = new Presence({
    clientId: "837684094422745158",
    mediaKeys: false,
});
const browsingStamp = Math.floor(Date.now() / 1000);
let versionAvailable;
let logged = {
    initial: false
};

presence.on("UpdateData", async () => {
    if(document.title === "ArchiveTeam Warrior") {
        const hideLeaderboard = await presence.getSetting("hideLeaderboard");
        let leaderboard = null;
        if(!logged.initial) {
            console.log("ArchiveTeam Presence loaded!");
            logged.initial = true;
        }
        const presenceData = {
            largeImageKey: "warriorwhite",
            startTimestamp: browsingStamp,
        };
        presenceData.state = document.querySelector("#bandwidth > table > tbody").childNodes[1].innerText.split("\t").join(" / ");
        if(document.querySelector("#project-header").innerHTML != "") {
            leaderboard = Array.from(document.querySelectorAll("#project-header .links a")).filter(link => link.textContent == "Leaderboard")[0].href;
            presenceData.details = document.querySelector("#project-header > h2").childNodes[0].textContent.trim().split(" ·")[0];
        } else {
            presenceData.details = "Unknown project";
        }
        if(leaderboard != null && hideLeaderboard != true) {
            presenceData.buttons = [
                {
                    label: "Leaderboard",
                    url: leaderboard
                }
            ]
        }
        presence.setActivity(presenceData);
    }
});