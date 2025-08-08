function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
}

document.getElementById('searchButton').addEventListener('click', searchStudent);
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchStudent();
    }
});

function searchStudent() {
    const input = document.getElementById('searchInput').value.trim().toLowerCase();
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = '';

    if (input === '') {
        resultDiv.innerHTML = '<p class="error">Vui lòng nhập tên học sinh.</p>';
        return;
    }

    const searchInput = removeVietnameseTones(input);
    const matches = [];

    // Lặp qua tất cả học sinh để tìm các kết quả khớp
    for (const student of studentData) {
        const fullName = `${student["Họ đệm"]} ${student["Tên"]}`.trim();
        const studentName = removeVietnameseTones(fullName.toLowerCase());

        if (studentName.includes(searchInput)) {
            matches.push(student); // Thêm học sinh khớp vào mảng
        }
    }

    if (matches.length > 0) {
        // Nếu tìm thấy ít nhất một kết quả, lặp qua mảng matches và hiển thị tất cả
        let infoHTML = '';
        for (const student of matches) {
            const fullName = `${student["Họ đệm"]} ${student["Tên"]}`.trim();
            infoHTML += `<div class="student-info">`;
            infoHTML += `<h3>Thông tin của ${fullName}</h3>`;
            
            for (const key in student) {
                if (student[key]) {
                    infoHTML += `<p><strong>${key}:</strong> ${student[key]}</p>`;
                }
            }
            infoHTML += `</div><br>`;
        }
        resultDiv.innerHTML = infoHTML;
    } else {
        resultDiv.innerHTML = '<p class="error">Không tìm thấy thông tin học sinh.</p>';
    }
}