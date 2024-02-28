// selecting elements
const btn = document.getElementById("btn");
const fileInput = document.getElementById("input");
const resLink = document.getElementById("resLink");
const expDays = document.getElementById("exp-days");

// btn event
btn.addEventListener("click", linkGenerate);

// link generate funtion
async function linkGenerate() {
  // Check if the button is disabled
  if (btn.disabled) {
    return;
  }

  const file1 = fileInput.files[0];

  if (file1) {
    try {
      btn.disabled = true;
      btn.textContent = "Uploading...";

      const formData = new FormData();
      formData.append("file", file1);

      const response = await fetch(
        `https://file.io/?expires=${expDays.value}d`,
        {
          method: "POST",
          body: formData,
        }
      );

      const res = await response.json();

      resLink.innerHTML = `<h3>File Ready To Share🔗 &nbsp; </h3><mark><a href="${res.link}" target="_blank">${res.link}</a></mark>`;
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      btn.disabled = false;
      btn.textContent = "Share";
    }
  } else {
    console.error("No file selected.");
    resLink.innerHTML = `<h3 style="color:red;">Please Choose A File!</h3>`;
  }
}
