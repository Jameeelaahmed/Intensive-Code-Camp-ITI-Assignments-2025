document.getElementById('submitBtn').addEventListener('click', function () {
    // Get input values
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.querySelector('input[name="gender"]:checked')?.id;
    const color = document.getElementById('colors').value;

    // Set cookies with expiration date (1 day)
    const d = new Date();
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();

    document.cookie = "name=" + name;
    document.cookie = "age=" + age;
    document.cookie = "gender=" + gender;
    document.cookie = "color=" + color;

    // Redirect to display page
    window.location.href = 'display.html';
});