let url = "https://official-joke-api.appspot.com/random_joke";

let getJokeBtnEl = document.getElementById("getJokeBtn");
let showJokeSetupEl = document.getElementById("showJokeSetup");
let showJokePunchLineEl = document.getElementById("showJokePunchLine");
let loaderContainerEl = document.getElementById("loaderContainer");
let loaderEl = document.getElementsByClassName("loader")[0];

async function getRandomJoke(url) {
  try {
    let response = await fetch(url);
    let jokeObj = await response.json();
    return jokeObj;
  } catch (error) {
    return error;
  }
}

getJokeBtnEl.addEventListener("click", async () => {
  showJokeSetupEl.textContent = "";
  showJokePunchLineEl.textContent = "";
  loaderEl.style.display = "block";
  try {
    let jokeObj = await getRandomJoke(url);

    let objKeys = Object.keys(jokeObj);

    if (objKeys.includes("id")) {
      let { id, setup, punchline, type } = jokeObj;

      loaderEl.style.display = "none";
      showJokeSetupEl.textContent = setup;
      showJokeSetupEl.classList.remove("error-message");
      showJokePunchLineEl.textContent = `- ${punchline}`;
    } else {
      throw new Error("Invalid joke format");
    }
  } catch (error) {
    showJokeSetupEl.textContent = "Sorry, Something went wrong!";
    showJokeSetupEl.classList.add("error-message");
  } finally {
    loaderEl.style.display = "none";
  }
});
