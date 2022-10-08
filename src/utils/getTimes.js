let date = new Date();

let getDay = () => {
    let valueEn, valueVi;
    var current_day = date.getDay();
    console.log(current_day)
    switch (current_day) {
        case 0:
            valueVi = "Chủ nhật"
            break;
        case 1:
            valueVi = "Thứ 2"
            break;
        case 2:
            valueVi = "Thứ 3"
            break;
        case 3:
            valueVi = "Thứ 4"
            break;
        case 4:
            valueVi = "Thứ 5"
            break;
        case 5:
            valueVi = "Thứ 6"
            break;
        case 6:
            valueVi = "Thứ 7"
            break;
        default:
            // code block

            return valueVi
    }
}

export { getDay }