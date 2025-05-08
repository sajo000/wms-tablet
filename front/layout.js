// 사이드바 연결
fetch("pages/layout/sidebar.html")
.then((response) => {
  return response.text();
})
.then((data) => {
  document.querySelector("#sidebar").innerHTML = data;
});
