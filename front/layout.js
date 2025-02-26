// 헤더 연결
fetch("pages/layout/header.html")
.then((response) => {
  return response.text();
})
.then((data) => {
  document.querySelector("#header").innerHTML = data;
});

// 풋터 연결
// fetch("../../pages/layout/footer.html")
// .then((response) => {
//   return response.text();
// })
// .then((data) => {
//   document.querySelector("#footer").innerHTML = data;
// });

// 모바일 풋터 네비 연결
// fetch("../../pages/layout/footer-nav-mobile.html")
// .then((response) => {
//   return response.text();
// })
// .then((data) => {
//   document.querySelector("#footer-nav-mobile").innerHTML = data;
// });
