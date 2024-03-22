let Number_Button = document.querySelectorAll('.NB');
let Delete_Button = document.querySelectorAll('.DEL');
let String_Display = document.getElementById('SRC');
let Function_Button = document.querySelectorAll('.FUNC');
let Equal_Button = document.querySelector('.Equal');
let Expression = null;
let Func = "";
let Flag = false;

Number_Button.forEach(function (button) {
    button.addEventListener("click", function () {
        let X = button.textContent;

        if (String_Display.textContent == "0") {
            if (X == 0) return;
            if (X == ".") {
                Func += X;
                String_Display.innerHTML += X;
            }
            else {
                String_Display.innerHTML = X;
                Func += X;
            }
        }
        else if (Flag == true) {
            Flag = false;
            Func = X;
            String_Display.innerHTML = X;
        }
        else {
            Func += X;
            String_Display.innerHTML += X;
        }
    });
});
Delete_Button.forEach(function (button) {
    button.addEventListener("click", function () {

        if (button.textContent == "AC") {
            String_Display.innerHTML = "0";
            Expression = null;
            Func = "";
        }
        else if (button.textContent == "DEL") {
            if (String_Display.innerHTML.length == 1) {
                String_Display.innerHTML = "0";
                Func = "";
            }
            else {
                String_Display.innerHTML = String_Display.innerHTML.slice(0, -1);
                Func = Func.slice(0, -1);
            }
        }
    });
});

Function_Button.forEach(function (button) {
    button.addEventListener("click", function () {
        switch (button.textContent) {
            case String.fromCharCode(10005):
                Expression = 'x';
                Func += '*';
                break;
            case String.fromCharCode(247):
                Expression = '/';
                Func += '/';
                break;
            case String.fromCharCode(43):
                Expression = '+';
                Func += '+';
                break;
            case String.fromCharCode(45):
                Expression = '-';
                Func += '-';
                break;
            default:
                break;
        }
        String_Display.innerHTML = "0";
    })
})

Equal_Button.addEventListener("click", function () {
    try {
        let Result = eval(Func);
        if (isNaN(Result)) {
            throw "Invalid expression";
        }
        Result = Number(Result.toPrecision(12));
        String_Display.innerHTML = Result;
        Flag = true;
    } catch (error) {
        if (error instanceof ReferenceError) {
            console.error("ReferenceError:", error.message);
        } else if (error instanceof TypeError) {
            console.error("TypeError:", error.message);
        } else {
            console.error("Error:", error);
        }
        String_Display.innerHTML = "Error";
        Flag = true;
    }

});
