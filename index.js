function getRepositories() {
  let username = document.getElementById("username").value
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayRepositories);
  req.open("GET", `https://api.github.com/users/${username}/repos`)
  req.send()
}

function displayRepositories() {
  let repos = JSON.parse(this.responseText)
  const repoList = `<ul>${
    repos.map(r => `<li><a href="https://github.com/${r.full_name}">${r.name}</a>` +
      ' - <a href="#" data-username="' + r.owner.login + '" data-repo="' + r.name + '" onclick="getCommits(this)">Get Commits</a> - ' +
      '<a href="#" data-username="' + r.owner.login + '" data-repo="' + r.name + '" onclick="getBranches(this)">Get Branches</a></li>'
    ).join('')
  }</ul>`;
  document.getElementById("repositories").innerHTML = repoList
}

function getCommits(el) {
  let username = document.getElementById("username").value
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayCommits)
  req.open("GET", `https://api.github.com/repos/${username}/${name}/commits`)
  req.send()
}

function displayCommits() {
  const commits = JSON.parse(this.responseText)
  const commitsList = `<ul>${commits.map(commit => '<li><strong>' + commit.author.login + '</strong> - ' + commit.commit.author.name + ' - ' + commit.commit.message +  '</li>').join('')}</ul>`
  document.getElementById("details").innerHTML = commitsList
}

function getBranches(el) {
  let username = document.getElementById("username").value
  const name = el.dataset.repo
  const req = new XMLHttpRequest()
  req.addEventListener("load", displayBranches)
  req.open("GET", `https://api.github.com/repos/${username}/${name}/branches`)
  req.send()
}

function displayBranches() {
  const branches = JSON.parse(this.responseText)
  const branchesList = `<ul>${branches.map(branch => '<li><strong>' + branch.name + '</strong></li>').join('')}</ul>`
  document.getElementById("details").innerHTML = branchesList
}
