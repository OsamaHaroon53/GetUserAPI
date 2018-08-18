if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js')
        .then(function (res) {
            console.log('sw registered - ', res.scope);
        })
        .catch(function (error) {
            console.log("serviceWorker not supported", error);
        })
}

function getUsers() {
    fetch('https://api.github.com/users')
        .then(function (res) {
            return res.json();
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function (git_User) {
            console.log(git_User);
            var t = document.getElementById("myTable");
            for (var i = 0;i<git_User.length;i++) {
                var row = t.insertRow(i);
                var c1 = row.insertCell(0);
                var c2 = row.insertCell(1);
                var c3 = row.insertCell(2);
                var c4 = row.insertCell(3);
                var c5 = row.insertCell(4);
                var c6 = row.insertCell(5);
                var c7 = row.insertCell(6);

                c1.innerHTML = git_User[i].id;
                c2.innerHTML = git_User[i].login;
                c3.innerHTML = git_User[i].node_id;
                c4.innerHTML = git_User[i].url;
                c5.innerHTML = git_User[i].followers_url;
                c6.innerHTML = git_User[i].type;
                c7.innerHTML = git_User[i].site_admin;
            }
        })
        .catch(function (error) {
            console.log(error);
        })
}