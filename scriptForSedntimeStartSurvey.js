function inputCheck() {
    inputCompany = document.getElementById("company").value;
    inputName = document.getElementById("name").value;
    inputEmail = document.getElementById("email").value;
    inputPhone = document.getElementById("phone").value;
    inputDocu = document.getElementById("docu").value;
    inputBusinessTheme = document.getElementById("business-theme").value;
    inputNetworkingTheme = document.getElementById("networking-theme").value;

    if (
        inputCompany == "" ||
        inputName == "" ||
        inputEmail == "" ||
        inputPhone == "" ||
        ((inputPurpose == "business" || inputPurpose == "fund") &&
            inputDocu == "") ||
        ((inputPurpose == "business" || inputPurpose == "fund") &&
            inputBusinessTheme == "") ||
        ((inputPurpose == "business" || inputPurpose == "fund") &&
            inputBusinessTheme == "") ||
        (inputPurpose == "networking" && inputNetworkingTheme == "")
    ) {
        document.getElementById("submit-disabled").style.display = "";
        document.getElementById("submit-abled").style.display = "none";
    } else {
        document.getElementById("submit-disabled").style.display = "none";
        document.getElementById("submit-abled").style.display = "";
    }
}

function submit() {
    document.getElementsByClassName("loadingPopup")[0].style.display = "block";
    date = new Date();

    inputCompany = document.getElementById("company").value;
    inputName = document.getElementById("name").value;
    inputEmail = document.getElementById("email").value;
    inputPhone = document.getElementById("phone").value;
    inputDocu = document.getElementById("docu").value;
    inputBusinessTheme = document.getElementById("business-theme").value;
    inputNetworkingTheme = document.getElementById("networking-theme").value;
    inputTime = date.toLocaleString("ko-kr");

    console.log(reservationPageURL);
    console.log(inputCompany);
    console.log(inputName);
    console.log(inputEmail);
    console.log(inputPhone);
    console.log(inputPurpose);
    console.log(inputDocu);
    console.log(inputBusinessTheme);
    console.log(inputNetworkingTheme);
    console.log(inputPrivate);
    console.log(inputTime);

    $.ajax({
        type: "POST",
        url: "https://hooks.slack.com/services/" + a + "/" + b + "/" + c,
        data: JSON.stringify({
            attachments: [
                {
                    color: "#6056db",
                    pretext: "새로운 마루커넥트가 신청되었습니다.",
                    title: reservationPageName + " 멘토님",
                    text:
                        "회사명 : " +
                        inputCompany +
                        "\n대표님 성함 : " +
                        inputName +
                        "\n이메일 : " +
                        inputEmail +
                        "\n연락처 : " +
                        inputPhone +
                        "\n목적 : " +
                        inputPurpose +
                        "\n회사 소개 자료 : " +
                        inputDocu +
                        "\n희망 주제(비즈니스) : " +
                        inputBusinessTheme +
                        "\n희망 주제(네트워킹) : " +
                        inputNetworkingTheme +
                        "\n개인정보 동의 : " +
                        inputPrivate +
                        "\n신청한 시간 : " +
                        inputTime,
                },
            ],
        }),
        dataType: "json",
        success: function (response) {
            console.log("전송완료");
            console.log(response);
        },
    });

    $.ajax({
        type: "GET",
        url: "https://script.google.com/macros/s/AKfycbyq8FvIn-c1H-XmPiL5c3gKGSkSz2JLD6Ypp9tLmp1WiNHLU4g_YdxjEIiweqPnAxsMmg/exec",
        data: {
            신청_시간: inputTime,
            신청_멘토: reservationPageName,
            회사명: inputCompany,
            대표님_성함: inputName,
            이메일: inputEmail,
            연락처: String(inputPhone),
            목적: inputPurpose,
            회사_소개_자료: inputDocu,
            희망_주제_비즈니스: inputBusinessTheme,
            희망_주제_네트워킹: inputNetworkingTheme,
            개인정보_동의: inputPrivate,
        },
        success: function (response) {
            console.log("전송완료");
            console.log(response);
            window.location.href = reservationPageURL;
        },
    });
}

function getRadioItem(event) {
    purpose = event.target.value;
    console.log(purpose);
    inputPurpose = purpose;
    if (purpose == "business" || purpose == "fund") {
        document.getElementById("docu-item").style.display = "";
        document.getElementById("business-theme-item").style.display = "";
        document.getElementById("networking-theme-item").style.display = "none";
    } else if (purpose == "networking") {
        document.getElementById("docu-item").style.display = "none";
        document.getElementById("business-theme-item").style.display = "none";
        document.getElementById("networking-theme-item").style.display = "";
    }
}

function getPrivateItem(event) {
    private = event.target.value;
    console.log(private);
    inputPrivate = private;
}

let inputCompany;
let inputName;
let inputEmail;
let inputPhone;
let inputPurpose = "business";
let inputDocu;
let inputBusinessTheme;
let inputNetworkingTheme;
let inputPrivate = "yes";
let inputTime;
let a = "T02FY8DGNBS";
let b = "B04MNGVHAP3";
let c = "9Rv9YDi0W9qOAMk6F9KRPi6m";

const submitButton = document.getElementById("submit-button-abled");
submitButton.addEventListener("click", submit);

let urlSearch = new URLSearchParams(location.search);
let reservationPageID = urlSearch.get("id");
let reservationPageName = urlSearch.get("name");

console.log(reservationPageName);

document.getElementById("mentor-name").innerHTML = reservationPageName;

document.getElementById("networking-theme-item").style.display = "none";
document.getElementById("docu-item").style.display = "";
document.getElementById("business-theme-item").style.display = "";

document.getElementById("submit-disabled").style.display = "";
document.getElementById("submit-abled").style.display = "none";

reservationPageURL =
    "https://www.sendtime.io/reservation?i=" + reservationPageID;

console.log(reservationPageURL);
console.log(inputCompany);
console.log(inputName);
console.log(inputEmail);
console.log(inputPhone);
console.log(inputPurpose);
console.log(inputDocu);
console.log(inputBusinessTheme);
console.log(inputNetworkingTheme);
console.log(inputPrivate);
console.log(inputTime);
