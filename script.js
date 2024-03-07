let tContainer=document.createElement("div")
tContainer.classList.add("tContainer");

let h1 = document.createElement("h1");
h1.id="heading";
h1.textContent="Pagination Using DOM"
tContainer.append(h1);
console.log(h1);

let dom=document.createElement("div");
dom.classList.add("domEle");

let pagiBtnOne=document.createElement("div");
pagiBtnOne.classList.add("pagi_btn","one");

let first_btn=document.createElement("a");
first_btn.textContent="First";
first_btn.setAttribute("data-set","first");

let prevue_btn=document.createElement("a");
prevue_btn.textContent="Previous";
prevue_btn.setAttribute("data-set","prevue");

pagiBtnOne.append(first_btn,prevue_btn);

let Dompagi = document.createElement("div");
Dompagi.id = "NumOfpagi";

let pagiBtnTwo=document.createElement("div");
pagiBtnTwo.classList.add("pagi_btn","two");

let next_btn=document.createElement("a");
next_btn.textContent="Next"
next_btn.setAttribute("data-set", "next");

let last_btn = document.createElement("a");
last_btn.textContent = "Last";
last_btn.setAttribute("data-set", "last");
pagiBtnTwo.append(next_btn, last_btn);
dom.append(pagiBtnOne, Dompagi, pagiBtnTwo);

let TableHead = document.createElement("div");
TableHead.classList.add("container");

let DomTable = document.createElement("table");
DomTable.id = "list";

TableHead.append(DomTable);

document.body.append(tContainer,dom,TableHead);
let paginationNumbers = document.getElementById("NumOfpagi");

let list = document.getElementById("list");

let Ele = document.querySelector(".domEle");

const req = new XMLHttpRequest();
req.open(
  "GET",
 " https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");
req.send();
req.addEventListener("load", request);
function request() {
    
    let data = JSON.parse(this.responseText);
    let currentPage = 1;
    let rows = 10;
    function List(data, list, rows, currentPage) {
        list.innerHTML = `
          <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
        </tr>`;
        currentPage--;
        let start = rows * currentPage;
        let end = start + rows;
        let pagiItems = data.slice(start, end);
        for (let i = 0; i < pagiItems.length; i++) {
            let item = pagiItems[i];
            console.log(pagiItems[i]);
            let tr = document.createElement("tr");
            tr.classList.add("item");
            let td1 = document.createElement("td");
            let td2 = document.createElement("td");
            let td3 = document.createElement("td");
            td1.textContent = item.id;
            td2.textContent = item.name;
            td3.textContent = item.email;
            tr.append(td1, td2, td3);
            list.appendChild(tr);
        }
    }

    function SetPagi(data, paginationNumbers, rows) {
        paginationNumbers.innerHTML = "";
        let page_count = Math.ceil(data.length / rows);
        for (let i = 1; i < page_count + 1; i++) {
          let btn = PagiButton(i, data);
          paginationNumbers.appendChild(btn);
        }
    }

    function PagiButton(page, data) {
        let button = document.createElement("a");
        button.classList.add("page");
        button.innerText = page;
        if (currentPage == page) button.classList.add("active");
        button.addEventListener("click", function () {
          currentPage = page;
          List(data, list, rows, currentPage);
          let allBtn = document.querySelectorAll(".page");
      allBtn.forEach((ele) => ele.classList.remove("active"));
      button.classList.add("active");
    });
    return button;
    }
    function updateBtn(currentPage) {
        let allBtn = document.querySelectorAll(".page");
        allBtn.forEach((ele) => ele.classList.remove("active"));
        allBtn[currentPage - 1].classList.add("active");
        List(data, list, rows, currentPage);
      }
      dom.addEventListener("click", (e) => {
        if (e.target.dataset.set == "first") {
          if (currentPage != 1) {
            currentPage = 1;
            updateBtn(currentPage);
          }
        } else if (e.target.dataset.set == "last") {
          if (currentPage != 10) {
            currentPage = 10;
            updateBtn(currentPage);
          }
        } else if (e.target.dataset.set == "prevue") {
          if (currentPage != 1) {
            currentPage--;
            updateBtn(currentPage);
          }
        } else if (e.target.dataset.set == "next") {
          if (currentPage != 10) {
            currentPage++;
            updateBtn(currentPage);
          }
        }
    });
    List(data, list, rows, currentPage);
    SetPagi(data, paginationNumbers, rows);
}