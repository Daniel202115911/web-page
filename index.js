// document.getElementById("proj1").addEventListener("click", function(){
//     alert("button clicked!");
// });

<script>
  // Check if the current page is the homepage (you can adjust the condition as needed)
  const isHomepage = window.location.pathname === "/";

  // Enable the download link if not on the homepage
  if (!isHomepage) {
    const downloadLink = document.getElementById("homepage-download");
    if (downloadLink) {
      downloadLink.removeAttribute("disabled");
    }
  }
</script>

